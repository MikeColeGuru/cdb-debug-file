import { CDB, EXEPoint } from "./cdb"
import { resolve, basename } from "path"
import { readdir } from "fs/promises"
import readline from "readline"
import events from "events"
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

    parseLine(line: string, lineno: number): boolean {
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

        this._readASMFile(this.name).then(() => {
            this._readCFile(this.name)
        })

        return true
    }

    private async _findFile(
        filename: string | RegExp,
        path: string
    ): Promise<string | undefined> {
        const dirents = await readdir(path, { withFileTypes: true })
        if (typeof filename == "string") {
            for (const dirent of dirents) {
                if (dirent.isFile() && dirent.name == filename)
                    return resolve(path, dirent.name)
            }
        } else {
            for (const dirent of dirents) {
                if (dirent.isFile()) {
                    const p = filename.exec(dirent.name)
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
                    resolve(path, dirent.name)
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
        // create fuzz regex; this is because the module name is sometime different than filename
        const split_underscore = module_name.split("_")
        const regex = RegExp(
            split_underscore.join("[^A-Za-z0-9]") + "(\\.app)?\\.asm$"
        )

        return await this._findFile(regex, this.cdb.build_path)
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
        read_line.on("line", line => {
            lineno++
            const src_line = new SRCLine()
            src_line.line = line
            this.asm_lines[lineno] = src_line
        })

        await events.once(read_line, "close")

        this.asm_path = filename
        this.asm_filename = basename(filename)
    }

    private async _getCPath(module_name: string): Promise<string | undefined> {
        let c_path

        // create fuzz regex; this is because the module name is sometime different than filename
        const split_underscore = module_name.split("_")
        const regex = RegExp(split_underscore.join("[^A-Za-z0-9]") + "\\.c$")

        if (this.cdb.source_path != "") {
            // look in source_path with fuzz
            c_path = await this._findFile(regex, this.cdb.source_path)
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
            // look in build_path with fuzz
            c_path = await this._findFile(regex, this.cdb.build_path)
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
        read_line.on("line", line => {
            lineno++
            const src_line = new SRCLine()
            src_line.line = line
            this.c_lines[lineno] = src_line
        })

        await events.once(read_line, "close")

        this.c_path = filename
        this.c_filename = basename(filename)
    }

    static filenameWithoutExtension(filename: string): string {
        const pos = filename.lastIndexOf(".")
        if (pos >= 0) filename = filename.substring(0, pos)
        return filename
    }

    static filenameToModuleName(filename: string): string {
        return CDBModule.filenameWithoutExtension(filename).replace(
            /[^A-Za-z0-9]/,
            "_"
        )
    }
}
