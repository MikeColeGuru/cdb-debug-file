import { EXEPoint } from "./cdb";
import { CDBSymbol } from "./cdb_symbol";
export declare class CDBFunction extends CDBSymbol {
    c_entry_line: number;
    a_entry_line: number;
    c_exit_line: number;
    a_exit_line: number;
    cfpoints: Set<EXEPoint>;
    afpoints: Set<EXEPoint>;
    laddr: number;
    lline: number;
    stkaddr: number;
}
