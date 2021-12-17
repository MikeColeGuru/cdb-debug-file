/*
    CDB Debug File - Complex Types / Structs
    Copyright (C) 2021 Mike Cole <MikeColeGuru@gmail.com>

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; version 2 of the License

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA
*/

import { CDBModule } from "./cdb_module"
import { CDBSymbol } from "./cdb_symbol"
import { CDBFunction } from "./cdb_function"
import fs from "fs"
import readline from "readline"
import { CDBComplex } from "./cdb_complex"
import path from "path"
import { CDBLink } from "./cdb_link"

export class EXEPoint {
    address = -1
    line = -1
    block = -1
    level = -1
}

export class CDB {
    /**
     * Modules
     */
    modules_by_name: Map<string, CDBModule> = new Map()

    /**
     * Modules
     */
    modules_by_c_filename: Map<string, CDBModule> = new Map()

    /**
     *
     */
    symbols: Map<string, CDBSymbol> = new Map()

    /**
     *
     */
    functions_by_mangled_name: Map<string, CDBFunction> = new Map()

    /**
     *
     */
    functions_by_name: Map<string, CDBFunction> = new Map()

    /**
     *
     */
    complexes: Map<string, CDBComplex> = new Map()

    build_path = ""
    private _build_path_set = false

    source_path = ""
    private _source_path_set = false

    constructor() {
        this.build_path = fs.realpathSync(process.cwd())
    }

    clear() {
        this.modules_by_name = new Map()
        this.modules_by_c_filename = new Map()
        this.symbols = new Map()
        this.functions_by_mangled_name = new Map()
        this.functions_by_name = new Map()
        this.complexes = new Map()
    }

    addModule(mod: CDBModule) {
        this.modules_by_name.set(mod.name, mod)
        this.modules_by_c_filename.set(mod.c_filename, mod)
    }

    addSymbol(sym: CDBSymbol) {
        this.symbols.set(sym.mangled_name, sym)
    }

    addFunction(func: CDBFunction) {
        this.functions_by_mangled_name.set(func.mangled_name, func)
        this.functions_by_name.set(func.name, func)
        this.symbols.set(func.mangled_name, func)
    }

    addComplex(complex: CDBComplex) {
        this.complexes.set(complex.name, complex)
    }

    findModuleByName(name: string): CDBModule | undefined {
        return this.modules_by_name.get(name)
    }

    findModuleByCFilename(filename: string): CDBModule | undefined {
        return this.modules_by_c_filename.get(filename)
    }

    findSymbolByMangledName(mangled_name: string): CDBSymbol | undefined {
        return this.symbols.get(mangled_name)
    }

    findFunctionByMangledName(mangled_name: string): CDBFunction | undefined {
        return this.functions_by_mangled_name.get(mangled_name)
    }

    findFunctionByName(name: string): CDBFunction | undefined {
        return this.functions_by_name.get(name)
    }

    setBuildPath(build_path: string) {
        this.build_path = fs.realpathSync(build_path)
        this._build_path_set = true
    }

    setSourcePath(source_path: string) {
        this.source_path = fs.realpathSync(source_path)
        this._source_path_set = true
    }

    async parseLine(line: string, lineno: number) {
        const parts = line.split(":", 2)

        switch (parts[0]) {
            case "M": {
                const module = new CDBModule(this)
                await module.parseLine(line, lineno)
                this.addModule(module)
                break
            }
            case "F": {
                const func = new CDBFunction(this)
                const len = func.parseLine(line, lineno)
                if (len > 0) {
                    this.addFunction(func)
                }
                break
            }
            case "S": {
                const symbol = new CDBSymbol(this)
                const len = symbol.parseLine(line, lineno)
                if (len > 0) this.addSymbol(symbol)
                break
            }
            case "T": {
                const complex = new CDBComplex(this)
                const len = complex.parseLine(line, lineno)
                if (len > 0) this.addComplex(complex)
                break
            }
            case "L": {
                const link = new CDBLink(this)
                await link.parseLine(line, lineno)
                break
            }
        }
    }

    async loadString(cdb_string: string) {
        this.clear()
        const lines = cdb_string.split(/\r?\n/)
        let lineno = 0
        for (const line in lines) {
            lineno++
            await this.parseLine(line, lineno)
        }
        this._functionPoints()
    }

    async loadFile(filename: string) {
        if (!this._build_path_set) {
            this.build_path = path.dirname(fs.realpathSync(filename))
        }

        this.clear()
        const read_line = readline.createInterface({
            input: fs.createReadStream(filename),
            terminal: false
        })

        let lineno = 0
        for await (const line of read_line) {
            lineno++
            await this.parseLine(line, lineno)
        }

        this._functionPoints()
    }

    needExtraMainFunction(): CDBFunction | undefined {
        if (this.findFunctionByName("_main") === undefined) {
            return this.findFunctionByName("main")
        }
        return undefined
    }

    private _functionPoints() {
        //let func

        // add _main dummy for runtime env
        // if ((func = this.needExtraMainFunction()) !== undefined) {
        //     const func1 = new CDBFunction(this)

        //     /* alloc new _main function */

        //     func1.name = "_main"
        //     func1.mangled_name = "G$_main$0$"
        //     /* TODO must be set by symbol information */
        //     func1.address = 0
        //     func1.exit_address = 0x2f
        //     this.addFunction(func1)
        // }

        this.functions_by_name.forEach(func => {
            // console.log(
            //     `sdcdb: func '${
            //         func.name
            //     }' has entry '0x${func.address.toString(
            //         16
            //     )}' exit '0x${func.exit_address.toString(16)}'`
            // )

            if (func.address < 0 || func.exit_address < 0) return
            if (func.module === undefined) return

            func.c_entry_line = Number.MAX_SAFE_INTEGER - 2
            func.c_exit_line = 0
            func.a_entry_line = Number.MAX_SAFE_INTEGER - 2
            func.a_exit_line = 0

            /* do it for the C Lines first */
            for (
                let lineno = 0;
                lineno < func.module.c_lines.length;
                lineno++
            ) {
                if (func.module.c_lines[lineno] === undefined) continue
                if (
                    func.module.c_lines[lineno].address > 0 &&
                    func.module.c_lines[lineno].address <
                        Number.MAX_SAFE_INTEGER &&
                    func.module.c_lines[lineno].address >= func.address &&
                    func.module.c_lines[lineno].address <= func.exit_address
                ) {
                    /* add it to the execution point */
                    if (func.c_entry_line > lineno) func.c_entry_line = lineno

                    if (func.c_exit_line < lineno) func.c_exit_line = lineno

                    const ep = new EXEPoint()
                    ep.address = func.module.c_lines[lineno].address
                    ep.line = lineno
                    ep.block = func.module.c_lines[lineno].block
                    ep.level = func.module.c_lines[lineno].level
                    func.cfpoints.add(ep)
                }
            }

            /* check double line execution points of module */
            func.module.cfpoints.forEach(ep => {
                if (
                    ep.address >= func.address &&
                    ep.address <= func.exit_address
                ) {
                    func.cfpoints.add(ep)
                }
            })

            /* do the same for asm execution points */
            for (
                let lineno = 0;
                lineno < func.module.asm_lines.length;
                lineno++
            ) {
                if (func.module.asm_lines[lineno] === undefined) continue
                if (
                    func.module.asm_lines[lineno].address > 0 &&
                    func.module.asm_lines[lineno].address <
                        Number.MAX_SAFE_INTEGER &&
                    func.module.asm_lines[lineno].address >= func.address &&
                    func.module.asm_lines[lineno].address <= func.exit_address
                ) {
                    /* add it to the execution point */
                    if (func.a_entry_line > lineno) func.a_entry_line = lineno

                    if (func.a_exit_line < lineno) func.a_exit_line = lineno

                    /* add it to the execution point */
                    const ep = new EXEPoint()
                    ep.address = func.module.asm_lines[lineno].address
                    ep.line = lineno
                    func.afpoints.add(ep)
                }
            }

            if (func.c_entry_line == Number.MAX_SAFE_INTEGER - 2)
                func.c_entry_line = 0
            if (func.a_entry_line == Number.MAX_SAFE_INTEGER - 2)
                func.a_entry_line = 0
        })
    }
}
