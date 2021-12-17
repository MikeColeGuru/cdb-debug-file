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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CDB = exports.EXEPoint = void 0;
const cdb_module_1 = require("./cdb_module");
const cdb_symbol_1 = require("./cdb_symbol");
const cdb_function_1 = require("./cdb_function");
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const cdb_complex_1 = require("./cdb_complex");
const path_1 = __importDefault(require("path"));
const cdb_link_1 = require("./cdb_link");
class EXEPoint {
    constructor() {
        this.address = -1;
        this.line = -1;
        this.block = -1;
        this.level = -1;
    }
}
exports.EXEPoint = EXEPoint;
class CDB {
    constructor() {
        /**
         * Modules
         */
        this.modules_by_name = new Map();
        /**
         * Modules
         */
        this.modules_by_c_filename = new Map();
        /**
         *
         */
        this.symbols = new Map();
        /**
         *
         */
        this.functions_by_mangled_name = new Map();
        /**
         *
         */
        this.functions_by_name = new Map();
        /**
         *
         */
        this.complexes = new Map();
        this.build_path = "";
        this._build_path_set = false;
        this.source_path = "";
        this._source_path_set = false;
        this.build_path = fs_1.default.realpathSync(process.cwd());
    }
    clear() {
        this.modules_by_name = new Map();
        this.modules_by_c_filename = new Map();
        this.symbols = new Map();
        this.functions_by_mangled_name = new Map();
        this.functions_by_name = new Map();
        this.complexes = new Map();
    }
    addModule(mod) {
        this.modules_by_name.set(mod.name, mod);
        this.modules_by_c_filename.set(mod.c_filename, mod);
    }
    addSymbol(sym) {
        this.symbols.set(sym.mangled_name, sym);
    }
    addFunction(func) {
        this.functions_by_mangled_name.set(func.mangled_name, func);
        this.functions_by_name.set(func.name, func);
        this.symbols.set(func.mangled_name, func);
    }
    addComplex(complex) {
        this.complexes.set(complex.name, complex);
    }
    findModuleByName(name) {
        return this.modules_by_name.get(name);
    }
    findModuleByCFilename(filename) {
        return this.modules_by_c_filename.get(filename);
    }
    findSymbolByMangledName(mangled_name) {
        return this.symbols.get(mangled_name);
    }
    findFunctionByMangledName(mangled_name) {
        return this.functions_by_mangled_name.get(mangled_name);
    }
    findFunctionByName(name) {
        return this.functions_by_name.get(name);
    }
    setBuildPath(build_path) {
        this.build_path = fs_1.default.realpathSync(build_path);
        this._build_path_set = true;
    }
    setSourcePath(source_path) {
        this.source_path = fs_1.default.realpathSync(source_path);
        this._source_path_set = true;
    }
    parseLine(line, lineno) {
        return __awaiter(this, void 0, void 0, function* () {
            const parts = line.split(":", 2);
            switch (parts[0]) {
                case "M": {
                    const module = new cdb_module_1.CDBModule(this);
                    yield module.parseLine(line, lineno);
                    this.addModule(module);
                    break;
                }
                case "F": {
                    const func = new cdb_function_1.CDBFunction(this);
                    const len = func.parseLine(line, lineno);
                    if (len > 0) {
                        this.addFunction(func);
                    }
                    break;
                }
                case "S": {
                    const symbol = new cdb_symbol_1.CDBSymbol(this);
                    const len = symbol.parseLine(line, lineno);
                    if (len > 0)
                        this.addSymbol(symbol);
                    break;
                }
                case "T": {
                    const complex = new cdb_complex_1.CDBComplex(this);
                    const len = complex.parseLine(line, lineno);
                    if (len > 0)
                        this.addComplex(complex);
                    break;
                }
                case "L": {
                    const link = new cdb_link_1.CDBLink(this);
                    yield link.parseLine(line, lineno);
                    break;
                }
            }
        });
    }
    loadString(cdb_string) {
        return __awaiter(this, void 0, void 0, function* () {
            this.clear();
            const lines = cdb_string.split(/\r?\n/);
            let lineno = 0;
            for (const line in lines) {
                lineno++;
                yield this.parseLine(line, lineno);
            }
            this._functionPoints();
        });
    }
    loadFile(filename) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._build_path_set) {
                this.build_path = path_1.default.dirname(fs_1.default.realpathSync(filename));
            }
            this.clear();
            const read_line = readline_1.default.createInterface({
                input: fs_1.default.createReadStream(filename),
                terminal: false
            });
            let lineno = 0;
            try {
                for (var read_line_1 = __asyncValues(read_line), read_line_1_1; read_line_1_1 = yield read_line_1.next(), !read_line_1_1.done;) {
                    const line = read_line_1_1.value;
                    lineno++;
                    yield this.parseLine(line, lineno);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (read_line_1_1 && !read_line_1_1.done && (_a = read_line_1.return)) yield _a.call(read_line_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this._functionPoints();
        });
    }
    needExtraMainFunction() {
        if (this.findFunctionByName("_main") === undefined) {
            return this.findFunctionByName("main");
        }
        return undefined;
    }
    _functionPoints() {
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
            if (func.address < 0 || func.exit_address < 0)
                return;
            if (func.module === undefined)
                return;
            func.c_entry_line = Number.MAX_SAFE_INTEGER - 2;
            func.c_exit_line = 0;
            func.a_entry_line = Number.MAX_SAFE_INTEGER - 2;
            func.a_exit_line = 0;
            /* do it for the C Lines first */
            for (let lineno = 0; lineno < func.module.c_lines.length; lineno++) {
                if (func.module.c_lines[lineno] === undefined)
                    continue;
                if (func.module.c_lines[lineno].address > 0 &&
                    func.module.c_lines[lineno].address <
                        Number.MAX_SAFE_INTEGER &&
                    func.module.c_lines[lineno].address >= func.address &&
                    func.module.c_lines[lineno].address <= func.exit_address) {
                    /* add it to the execution point */
                    if (func.c_entry_line > lineno)
                        func.c_entry_line = lineno;
                    if (func.c_exit_line < lineno)
                        func.c_exit_line = lineno;
                    const ep = new EXEPoint();
                    ep.address = func.module.c_lines[lineno].address;
                    ep.line = lineno;
                    ep.block = func.module.c_lines[lineno].block;
                    ep.level = func.module.c_lines[lineno].level;
                    func.cfpoints.add(ep);
                }
            }
            /* check double line execution points of module */
            func.module.cfpoints.forEach(ep => {
                if (ep.address >= func.address &&
                    ep.address <= func.exit_address) {
                    func.cfpoints.add(ep);
                }
            });
            /* do the same for asm execution points */
            for (let lineno = 0; lineno < func.module.asm_lines.length; lineno++) {
                if (func.module.asm_lines[lineno] === undefined)
                    continue;
                if (func.module.asm_lines[lineno].address > 0 &&
                    func.module.asm_lines[lineno].address <
                        Number.MAX_SAFE_INTEGER &&
                    func.module.asm_lines[lineno].address >= func.address &&
                    func.module.asm_lines[lineno].address <= func.exit_address) {
                    /* add it to the execution point */
                    if (func.a_entry_line > lineno)
                        func.a_entry_line = lineno;
                    if (func.a_exit_line < lineno)
                        func.a_exit_line = lineno;
                    /* add it to the execution point */
                    const ep = new EXEPoint();
                    ep.address = func.module.asm_lines[lineno].address;
                    ep.line = lineno;
                    func.afpoints.add(ep);
                }
            }
            if (func.c_entry_line == Number.MAX_SAFE_INTEGER - 2)
                func.c_entry_line = 0;
            if (func.a_entry_line == Number.MAX_SAFE_INTEGER - 2)
                func.a_entry_line = 0;
        });
    }
}
exports.CDB = CDB;
