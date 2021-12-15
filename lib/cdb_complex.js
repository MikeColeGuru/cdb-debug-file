"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CDBComplex = void 0;
const cdb_symbol_1 = require("./cdb_symbol");
const line_regex = RegExp("T:F([^\\$]+)\\$([^\\[]+)\\[(.*)\\].*");
class CDBComplex {
    constructor(cdb) {
        this.name = "";
        this.size = -1;
        this.fields = [];
        this.line = "";
        this.lineno = -1;
        this.cdb = cdb;
    }
    parseLine(line, lineno) {
        this.line = line;
        this.lineno = lineno;
        const matches = line_regex.exec(line);
        if (matches === null) {
            throw Error(`Could not parse symbol at line ${lineno}`);
        }
        const module_name = matches[1];
        this.name = matches[2];
        const strs = matches[3];
        // try and find module
        if (module_name.length > 0) {
            this.module = this.cdb.findModuleByName(module_name);
        }
        const epos = strs.length;
        let pos = 0;
        let offset_start;
        this.size = 0;
        while (pos < epos) {
            // get offset
            while (pos < epos && strs.at(pos) != "{")
                pos++;
            offset_start = pos + 1;
            while (pos < epos && strs.at(pos) != "}")
                pos++;
            if (pos >= epos)
                break;
            const offset = parseInt(strs.substr(offset_start, pos - offset_start));
            pos++;
            // parse symbol
            const sym = new cdb_symbol_1.CDBSymbol(this.cdb);
            pos += sym.parseLine(strs.substr(pos), this.lineno);
            sym.conplex_offset = offset;
            // sum size
            this.size += sym.size;
            // save it
            this.fields.push(sym);
        }
        return pos;
    }
}
exports.CDBComplex = CDBComplex;
