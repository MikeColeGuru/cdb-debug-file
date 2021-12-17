import { CDB, EXEPoint } from "./cdb"
import { resolve, basename } from "path"
import { readdir } from "fs/promises"
import readline from "readline"
import fs from "fs"

export class SRCLine {
    address = -1
    level = -1
    block = -1
    line = ""
}

export class CDBModule {
    /**
     *
     */
    cdb: CDB

    /**
     * Module Name
     */
    name = ""

    c_filename = ""

    asm_filename = ""

    /**
     * C Filename with Path
     */
    c_path = ""

    /**
     * ASM Filename with Path
     */
    asm_path = ""

    c_lines: SRCLine[] = []

    asm_lines: SRCLine[] = []

    cfpoints: Set<EXEPoint> = new Set()

    constructor(cdb: CDB) {
        this.cdb = cdb
    }

    async parseLine(line: string, lineno: number): Promise<boolean> {
        const reg = RegExp("([A-Z]):([a-zA-Z_0-9]+)")
        const parts = reg.exec(line)

        if (parts === null) {
            throw Error(`Could not parse module line on line ${lineno}`)
        }
        const line_type = parts[1]

        if (line_type != "M") {
            throw Error(
                `Trying to parse as a module a non-module line type (${line_type})`
            )
        }

        this.name = parts[2]

        await this._readASMFile(this.name)
        await this._readCFile(this.name)

        return true
    }

    private async _findFile(
        filename: string | RegExp,
        path: string,
        convert_to_module_name = false
    ): Promise<string | undefined> {
        const dirents = await readdir(path, { withFileTypes: true })
        if (typeof filename == "string") {
            for (const dirent of dirents) {
                if (dirent.isFile()) {
                    let name
                    if (convert_to_module_name) {
                        name = CDBModule.filenameToModuleNameWithExtension(dirent.name)
                    }
                    else
                        name = dirent.name
                    
                    if (name == filename)
                        return resolve(path, dirent.name)
                }
            }
        } else {
            for (const dirent of dirents) {
                if (dirent.isFile()) {
                    let name
                    if (convert_to_module_name)
                        name = CDBModule.filenameToModuleNameWithExtension(dirent.name)
                    else
                        name = dirent.name

                    const p = filename.exec(name)
                    if (p !== null) return resolve(path, dirent.name)
                }
            }
        }
        for (const dirent of dirents) {
            if (
                dirent.isDirectory() &&
                dirent.name != "." &&
                dirent.name != ".."
            ) {
                //console.error("Path: " + resolve(path, dirent.name))
                const ret = await this._findFile(
                    filename,
                    resolve(path, dirent.name),
                    convert_to_module_name
                )
                //console.error("ret = "+ret)
                if (ret !== undefined) return ret
            }
        }
        return undefined
    }

    private async _getASMPath(
        module_name: string
    ): Promise<string | undefined> {
        const regex = RegExp(module_name + "(\\.app)?\\.asm$")
        return await this._findFile(regex, this.cdb.build_path, true)
    }

    private async _readASMFile(module_name: string): Promise<void> {
        const filename = await this._getASMPath(module_name)
        if (filename === undefined) {
            throw Error(
                `Could not find ASM file for module name '${module_name}'`
            )
        }

        const read_line = readline.createInterface({
            input: fs.createReadStream(filename),
            terminal: false
        })

        let lineno = 0
        for await (const line of read_line) {
            lineno++
            const src_line = new SRCLine()
            src_line.line = line
            this.asm_lines[lineno] = src_line
        }

        this.asm_path = filename
        this.asm_filename = basename(filename)
    }

    private async _getCPath(module_name: string): Promise<string | undefined> {
        let c_path

        const regex = RegExp(module_name + "\\.c$")

        if (this.cdb.source_path != "") {
            c_path = await this._findFile(regex, this.cdb.source_path, true)
        }

        if (c_path === undefined) {
            // look in ASM file for C Path
            const regex = RegExp("\\s*;\\s*([^:]+):\\d+:\\s+.*")
            for (const line of this.asm_lines) {
                if (line === undefined) continue
                const p = regex.exec(line.line)
                if (p !== null) {
                    c_path = resolve(this.cdb.build_path, p[1])
                    break
                }
            }
        }

        if (c_path === undefined) {
            c_path = await this._findFile(regex, this.cdb.build_path, true)
        }

        if (c_path !== undefined) {
            c_path = fs.realpathSync(c_path)
        }

        return c_path
    }

    private async _readCFile(module_name: string): Promise<void> {
        const filename = await this._getCPath(module_name)
        if (filename === undefined) {
            throw Error("Could not find C file")
        }

        const read_line = readline.createInterface({
            input: fs.createReadStream(filename),
            terminal: false
        })

        let lineno = 0
        for await (const line of read_line) {
            lineno++
            const src_line = new SRCLine()
            src_line.line = line
            this.c_lines[lineno] = src_line
        }

        this.c_path = filename
        this.c_filename = basename(filename)
    }

    static filenameWithoutExtension(filename: string): string {
        const pos = filename.lastIndexOf(".")
        if (pos >= 0) filename = filename.substring(0, pos)
        return filename
    }

    static underscoreUnicode(str: string) {
        return str.split("").map(value => {
            const cp = value.codePointAt(0)
            if (cp === undefined) return value
            if (cp > 0xFFFF) return "____"
            if (cp > 0x07FF) return "___"
            if (cp > 0x007F) return "__"
            return value
        }).join("")
    }

    static filenameToModuleNameWithExtension(filename: string): string {
        return CDBModule.underscoreUnicode(filename).replace(
            /[^A-Za-z0-9.]/,
            "_"
        )
    }

    static filenameToModuleName(filename: string): string {
        return CDBModule.filenameWithoutExtension(
            CDBModule.underscoreUnicode(filename)
        ).replace(
            /[^A-Za-z0-9]/,
            "_"
        )
    }


}
