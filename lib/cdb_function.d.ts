import { CDBSymbol } from "./cdb_symbol";
export declare class EXEPoint {
    addr: number;
    line: number;
    block: number;
    level: number;
}
export declare class CDBFunction extends CDBSymbol {
    c_entry_line: number;
    a_entry_line: number;
    c_exit_line: number;
    a_exit_line: number;
    cfpoints: EXEPoint[];
    afpoints: EXEPoint[];
    laddr: number;
    lline: number;
    stkaddr: number;
}
