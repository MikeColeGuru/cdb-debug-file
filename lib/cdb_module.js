"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CDBModule = void 0;
class CDBModule {
    constructor(cdb) {
        /**
         * Module Name
         */
        this.name = "";
        /**
         * C Filename with Path
         */
        this.c_filename = "";
        /**
         * ASM Filename with Path
         */
        this.asm_filename = "";
        this.cdb = cdb;
    }
    parseLine(line, lineno) {
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
        return true;
    }
}
exports.CDBModule = CDBModule;
