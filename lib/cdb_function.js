"use strict";
/*
    CDB Debug File - Functions
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
