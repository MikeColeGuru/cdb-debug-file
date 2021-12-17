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

import { EXEPoint } from "./cdb"
import { CDBSymbol } from "./cdb_symbol"

export class CDBFunction extends CDBSymbol {
    c_entry_line = -1 /* first line in the function */
    a_entry_line = -1
    c_exit_line = -1 /* last line in the function  */
    a_exit_line = -1
    cfpoints: Set<EXEPoint> =
        new Set() /* set of all C execution points in func   */
    afpoints: Set<EXEPoint> =
        new Set() /* set of all ASM execution points in func */
    laddr = -1 /* last executed address                   */
    lline = -1 /* last executed linenumber                */
    stkaddr = -1
    /* stackpointer at beginning of function
     * (not reentrant ! ) only actual */
}
