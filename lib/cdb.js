"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CDB = void 0;
const cdb_module_1 = require("./cdb_module");
const cdb_symbol_1 = require("./cdb_symbol");
const cdb_function_1 = require("./cdb_function");
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const events_1 = __importDefault(require("events"));
const cdb_complex_1 = require("./cdb_complex");
class CDB {
    constructor() {
        /**
         * Modules
         */
        this.modules = new Map();
        /**
         *
         */
        this.symbols = new Map();
        /**
         *
         */
        this.functions = new Map();
        /**
         *
         */
        this.complexes = new Map();
    }
    clear() {
        this.modules = new Map();
        this.symbols = new Map();
        this.functions = new Map();
        this.complexes = new Map();
    }
    // async test() {
    //     let test = new CDBModule(this)
    //     test.parseLine("M:contiki_main")
    // }
    findModuleByName(name) {
        if (this.modules.has(name))
            return this.modules.get(name);
        return undefined;
    }
    parseLine(line, lineno) {
        const parts = line.split(":", 2);
        switch (parts[0]) {
            case "M": {
                const module = new cdb_module_1.CDBModule(this);
                if (module.parseLine(line, lineno)) {
                    this.modules.set(module.name, module);
                }
                break;
            }
            case "F": {
                const func = new cdb_function_1.CDBFunction(this);
                const len = func.parseLine(line, lineno);
                if (len > 0) {
                    this.symbols.set(func.mangled_name, func);
                    this.functions.set(func.mangled_name, func);
                }
                break;
            }
            case "S": {
                const symbol = new cdb_symbol_1.CDBSymbol(this);
                const len = symbol.parseLine(line, lineno);
                if (len > 0)
                    this.symbols.set(symbol.mangled_name, symbol);
                break;
            }
            case "T": {
                const complex = new cdb_complex_1.CDBComplex(this);
                const len = complex.parseLine(line, lineno);
                if (len > 0)
                    this.complexes.set(complex.name, complex);
                break;
            }
            case "L":
                break;
            default: {
                throw Error(`Unknown record type (${parts[0]})`);
            }
        }
    }
    loadString(cdb_string) {
        this.clear();
        const lines = cdb_string.split(/\r?\n/);
        let lineno = 0;
        for (const line in lines) {
            lineno++;
            this.parseLine(line, lineno);
        }
    }
    loadFile(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            this.clear();
            const read_line = readline_1.default.createInterface({
                input: fs_1.default.createReadStream(filename),
                terminal: false
            });
            let lineno = 0;
            read_line.on("line", line => {
                lineno++;
                this.parseLine(line, lineno);
            });
            yield events_1.default.once(read_line, "close");
        });
    }
}
exports.CDB = CDB;
