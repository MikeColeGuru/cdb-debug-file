"use strict";
/*
    CDB Debug File - Linker Lines
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CDBLink = void 0;
const _1 = require(".");
const cdb_1 = require("./cdb");
class CDBLink {
    constructor(cdb) {
        this.cdb = cdb;
    }
    parseLine(line, lineno) {
        return __awaiter(this, void 0, void 0, function* () {
            const [line_type, str, addr] = line.split(":", 3);
            if (line_type != "L") {
                throw Error(`Trying to parse as a linker line a non-linker line type (${line_type}), line ${lineno}`);
            }
            const address = parseInt(addr, 16);
            const p = str.split("$");
            if (p.length > 1) {
                const type = p[0][0];
                switch (type) {
                    case "G":
                    case "F":
                    case "L": {
                        const mangled_name = str;
                        let sym = this.cdb.findSymbolByMangledName(mangled_name);
                        if (sym === undefined) {
                            // throw Error(`Could not find symbol for mangled name '${mangled_name}' on line ${lineno}`)
                            sym = new _1.CDBSymbol(this.cdb);
                            sym.mangled_name = mangled_name;
                            sym.scope_type = mangled_name.at(0);
                            sym.name = mangled_name;
                            this.cdb.addSymbol(sym);
                        }
                        sym.address = address;
                        break;
                    }
                    case "X": {
                        const mangled_name = str.substr(1);
                        const func = this.cdb.findFunctionByMangledName(mangled_name);
                        if (func === undefined) {
                            //throw Error(`Could not find symbol for mangled name '${mangled_name}' on line ${lineno}`)
                            return;
                        }
                        func.exit_address = address;
                        break;
                    }
                    case "A": {
                        const filename = p[1];
                        const asm_lineno = parseInt(p[2]);
                        const module_name = _1.CDBModule.filenameToModuleName(filename);
                        let mod = this.cdb.findModuleByName(module_name);
                        if (mod === undefined) {
                            mod = new _1.CDBModule(this.cdb);
                            yield mod.parseLine("M:" + module_name, lineno);
                            this.cdb.addModule(mod);
                        }
                        if (mod.asm_lines.length > asm_lineno) {
                            if (mod.asm_lines[asm_lineno] !== undefined) {
                                mod.asm_lines[asm_lineno].address = address;
                            }
                        }
                        break;
                    }
                    case "C": {
                        const filename = p[1];
                        const c_lineno = parseInt(p[2]);
                        const level = _1.CDBSymbol.parseLevel(p[3]);
                        const block = parseInt(p[4]);
                        let mod = this.cdb.findModuleByCFilename(filename);
                        if (mod === undefined) {
                            mod = new _1.CDBModule(this.cdb);
                            yield mod.parseLine("M:" + _1.CDBModule.filenameToModuleName(filename), lineno);
                            this.cdb.addModule(mod);
                        }
                        if (mod.c_lines.length > c_lineno) {
                            if (mod.c_lines[c_lineno] !== undefined) {
                                if (mod.c_lines[c_lineno].address > 0) {
                                    const ep = new cdb_1.EXEPoint();
                                    ep.address = address;
                                    ep.level = level;
                                    ep.block = block;
                                    ep.line = c_lineno;
                                    mod.cfpoints.add(ep);
                                }
                                mod.c_lines[c_lineno].address = address;
                                mod.c_lines[c_lineno].level = level;
                                mod.c_lines[c_lineno].block = block;
                            }
                        }
                        break;
                    }
                    default: {
                        throw Error(`Unknown linker type line ${lineno}, '${type}'`);
                    }
                }
            }
            else {
                throw Error(`Error parsing linker line ${lineno}`);
            }
        });
    }
}
exports.CDBLink = CDBLink;
