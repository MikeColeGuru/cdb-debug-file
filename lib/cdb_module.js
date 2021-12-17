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
exports.CDBModule = exports.SRCLine = void 0;
const path_1 = require("path");
const promises_1 = require("fs/promises");
const readline_1 = __importDefault(require("readline"));
const fs_1 = __importDefault(require("fs"));
class SRCLine {
    constructor() {
        this.address = -1;
        this.level = -1;
        this.block = -1;
        this.line = "";
    }
}
exports.SRCLine = SRCLine;
class CDBModule {
    constructor(cdb) {
        /**
         * Module Name
         */
        this.name = "";
        this.c_filename = "";
        this.asm_filename = "";
        /**
         * C Filename with Path
         */
        this.c_path = "";
        /**
         * ASM Filename with Path
         */
        this.asm_path = "";
        this.c_lines = [];
        this.asm_lines = [];
        this.cfpoints = new Set();
        this.cdb = cdb;
    }
    parseLine(line, lineno) {
        return __awaiter(this, void 0, void 0, function* () {
            const reg = RegExp("([A-Z]):([a-zA-Z_0-9]+)");
            const parts = reg.exec(line);
            if (parts === null) {
                throw Error(`Could not parse module line on line ${lineno}`);
            }
            const line_type = parts[1];
            if (line_type != "M") {
                throw Error(`Trying to parse as a module a non-module line type (${line_type})`);
            }
            this.name = parts[2];
            yield this._readASMFile(this.name);
            yield this._readCFile(this.name);
            return true;
        });
    }
    _findFile(filename, path, convert_to_module_name = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const dirents = yield (0, promises_1.readdir)(path, { withFileTypes: true });
            if (typeof filename == "string") {
                for (const dirent of dirents) {
                    if (dirent.isFile()) {
                        let name;
                        if (convert_to_module_name) {
                            name = CDBModule.filenameToModuleNameWithExtension(dirent.name);
                        }
                        else
                            name = dirent.name;
                        if (name == filename)
                            return (0, path_1.resolve)(path, dirent.name);
                    }
                }
            }
            else {
                for (const dirent of dirents) {
                    if (dirent.isFile()) {
                        let name;
                        if (convert_to_module_name)
                            name = CDBModule.filenameToModuleNameWithExtension(dirent.name);
                        else
                            name = dirent.name;
                        const p = filename.exec(name);
                        if (p !== null)
                            return (0, path_1.resolve)(path, dirent.name);
                    }
                }
            }
            for (const dirent of dirents) {
                if (dirent.isDirectory() &&
                    dirent.name != "." &&
                    dirent.name != "..") {
                    //console.error("Path: " + resolve(path, dirent.name))
                    const ret = yield this._findFile(filename, (0, path_1.resolve)(path, dirent.name), convert_to_module_name);
                    //console.error("ret = "+ret)
                    if (ret !== undefined)
                        return ret;
                }
            }
            return undefined;
        });
    }
    _getASMPath(module_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const regex = RegExp(module_name + "(\\.app)?\\.asm$");
            return yield this._findFile(regex, this.cdb.build_path, true);
        });
    }
    _readASMFile(module_name) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const filename = yield this._getASMPath(module_name);
            if (filename === undefined) {
                throw Error(`Could not find ASM file for module name '${module_name}'`);
            }
            const read_line = readline_1.default.createInterface({
                input: fs_1.default.createReadStream(filename),
                terminal: false
            });
            let lineno = 0;
            try {
                for (var read_line_1 = __asyncValues(read_line), read_line_1_1; read_line_1_1 = yield read_line_1.next(), !read_line_1_1.done;) {
                    const line = read_line_1_1.value;
                    lineno++;
                    const src_line = new SRCLine();
                    src_line.line = line;
                    this.asm_lines[lineno] = src_line;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (read_line_1_1 && !read_line_1_1.done && (_a = read_line_1.return)) yield _a.call(read_line_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.asm_path = filename;
            this.asm_filename = (0, path_1.basename)(filename);
        });
    }
    _getCPath(module_name) {
        return __awaiter(this, void 0, void 0, function* () {
            let c_path;
            const regex = RegExp(module_name + "\\.c$");
            if (this.cdb.source_path != "") {
                c_path = yield this._findFile(regex, this.cdb.source_path, true);
            }
            if (c_path === undefined) {
                // look in ASM file for C Path
                const regex = RegExp("\\s*;\\s*([^:]+):\\d+:\\s+.*");
                for (const line of this.asm_lines) {
                    if (line === undefined)
                        continue;
                    const p = regex.exec(line.line);
                    if (p !== null) {
                        c_path = (0, path_1.resolve)(this.cdb.build_path, p[1]);
                        break;
                    }
                }
            }
            if (c_path === undefined) {
                c_path = yield this._findFile(regex, this.cdb.build_path, true);
            }
            if (c_path !== undefined) {
                c_path = fs_1.default.realpathSync(c_path);
            }
            return c_path;
        });
    }
    _readCFile(module_name) {
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const filename = yield this._getCPath(module_name);
            if (filename === undefined) {
                throw Error("Could not find C file");
            }
            const read_line = readline_1.default.createInterface({
                input: fs_1.default.createReadStream(filename),
                terminal: false
            });
            let lineno = 0;
            try {
                for (var read_line_2 = __asyncValues(read_line), read_line_2_1; read_line_2_1 = yield read_line_2.next(), !read_line_2_1.done;) {
                    const line = read_line_2_1.value;
                    lineno++;
                    const src_line = new SRCLine();
                    src_line.line = line;
                    this.c_lines[lineno] = src_line;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (read_line_2_1 && !read_line_2_1.done && (_a = read_line_2.return)) yield _a.call(read_line_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            this.c_path = filename;
            this.c_filename = (0, path_1.basename)(filename);
        });
    }
    static filenameWithoutExtension(filename) {
        const pos = filename.lastIndexOf(".");
        if (pos >= 0)
            filename = filename.substring(0, pos);
        return filename;
    }
    static underscoreUnicode(str) {
        return str.split("").map(value => {
            const cp = value.codePointAt(0);
            if (cp === undefined)
                return value;
            if (cp > 0xFFFF)
                return "____";
            if (cp > 0x07FF)
                return "___";
            if (cp > 0x007F)
                return "__";
            return value;
        }).join("");
    }
    static filenameToModuleNameWithExtension(filename) {
        return CDBModule.underscoreUnicode(filename).replace(/[^A-Za-z0-9.]/, "_");
    }
    static filenameToModuleName(filename) {
        return CDBModule.filenameWithoutExtension(CDBModule.underscoreUnicode(filename)).replace(/[^A-Za-z0-9]/, "_");
    }
}
exports.CDBModule = CDBModule;
