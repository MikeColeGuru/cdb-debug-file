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
