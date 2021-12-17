"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CDBFunction = void 0;
const cdb_symbol_1 = require("./cdb_symbol");
class CDBFunction extends cdb_symbol_1.CDBSymbol {
    constructor() {
        super(...arguments);
        this.c_entry_line = -1; /* first line in the function */
        this.a_entry_line = -1;
        this.c_exit_line = -1; /* last line in the function  */
        this.a_exit_line = -1;
        this.cfpoints = new Set(); /* set of all C execution points in func   */
        this.afpoints = new Set(); /* set of all ASM execution points in func */
        this.laddr = -1; /* last executed address                   */
        this.lline = -1; /* last executed linenumber                */
        this.stkaddr = -1;
        /* stackpointer at beginning of function
         * (not reentrant ! ) only actual */
    }
}
exports.CDBFunction = CDBFunction;
