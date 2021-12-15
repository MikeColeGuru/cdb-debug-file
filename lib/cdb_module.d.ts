import { CDB } from "./cdb";
export declare class CDBModule {
    /**
     *
     */
    cdb: CDB;
    /**
     * Module Name
     */
    name: string;
    /**
     * C Filename with Path
     */
    c_filename: string;
    /**
     * ASM Filename with Path
     */
    asm_filename: string;
    constructor(cdb: CDB);
    parseLine(line: string, lineno: number): boolean;
}
