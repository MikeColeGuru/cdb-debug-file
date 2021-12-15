import { CDB } from "./cdb";
import { CDBModule } from "./cdb_module";
import { CDBSymbol } from "./cdb_symbol";
export declare class CDBComplex {
    cdb: CDB;
    name: string;
    module: CDBModule | undefined;
    size: number;
    fields: CDBSymbol[];
    line: string;
    lineno: number;
    constructor(cdb: CDB);
    parseLine(line: string, lineno: number): number;
}
