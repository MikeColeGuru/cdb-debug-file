import { CDB } from ".";
export declare class CDBLink {
    cdb: CDB;
    constructor(cdb: CDB);
    parseLine(line: string, lineno: number): Promise<void>;
}
