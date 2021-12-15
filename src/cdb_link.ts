import { CDB, CDBModule, CDBSymbol } from "."
import { EXEPoint } from "./cdb"
import { ScopeType } from "./cdb_symbol"

export class CDBLink {
    cdb: CDB

    constructor(cdb: CDB) {
        this.cdb = cdb
    }

    parseLine(line: string, lineno: number) {
        const [line_type, str, addr] = line.split(":", 3)

        if (line_type != "L") {
            throw Error(
                `Trying to parse as a linker line a non-linker line type (${line_type}), line ${lineno}`
            )
        }

        const address = parseInt(addr, 16)

        const p = str.split("$")

        if (p.length > 1) {
            const type = p[0][0]

            switch (type) {
                case "G":
                case "F":
                case "L": {
                    const mangled_name = str
                    let sym = this.cdb.findSymbolByMangledName(mangled_name)
                    if (sym === undefined) {
                        // throw Error(`Could not find symbol for mangled name '${mangled_name}' on line ${lineno}`)
                        sym = new CDBSymbol(this.cdb)
                        sym.mangled_name = mangled_name
                        sym.scope_type = mangled_name.at(0) as ScopeType
                        sym.name = mangled_name
                        this.cdb.addSymbol(sym)
                    }
                    sym.address = address
                    break
                }
                case "X": {
                    const mangled_name = str.substr(1)
                    const func =
                        this.cdb.findFunctionByMangledName(mangled_name)
                    if (func === undefined) {
                        //throw Error(`Could not find symbol for mangled name '${mangled_name}' on line ${lineno}`)
                        return
                    }
                    func.exit_address = address
                    break
                }
                case "A": {
                    const filename = p[1]
                    const asm_lineno = parseInt(p[2])
                    const module_name = CDBModule.filenameToModuleName(filename)
                    let mod = this.cdb.findModuleByName(module_name)
                    if (mod === undefined) {
                        mod = new CDBModule(this.cdb)
                        mod.parseLine("M:" + module_name, lineno)
                        this.cdb.addModule(mod)
                    }
                    if (mod.asm_lines.length > asm_lineno) {
                        if (mod.asm_lines[asm_lineno] !== undefined) {
                            mod.asm_lines[asm_lineno].address = address
                        }
                    }
                    break
                }
                case "C": {
                    const filename = p[1]
                    const c_lineno = parseInt(p[2])
                    const level = CDBSymbol.parseLevel(p[3])
                    const block = parseInt(p[4])
                    let mod = this.cdb.findModuleByCFilename(filename)
                    if (mod === undefined) {
                        mod = new CDBModule(this.cdb)
                        mod.parseLine(
                            "M:" + CDBModule.filenameToModuleName(filename),
                            lineno
                        )
                        this.cdb.addModule(mod)
                    }
                    if (mod.c_lines.length > c_lineno) {
                        if (mod.c_lines[c_lineno] !== undefined) {
                            if (mod.c_lines[c_lineno].address > 0) {
                                const ep = new EXEPoint()
                                ep.address = address
                                ep.level = level
                                ep.block = block
                                ep.line = c_lineno
                                mod.cfpoints.add(ep)
                            }
                            mod.c_lines[c_lineno].address = address
                            mod.c_lines[c_lineno].level = level
                            mod.c_lines[c_lineno].block = block
                        }
                    }
                    break
                }
                default: {
                    throw Error(`Unknown linker type line ${lineno}, '${type}'`)
                }
            }
        } else {
            throw Error(`Error parsing linker line ${lineno}`)
        }
    }
}
