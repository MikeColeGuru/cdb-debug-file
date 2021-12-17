import { CDB, EXEPoint } from "./cdb";
export declare class SRCLine {
    address: number;
    level: number;
    block: number;
    line: string;
}
export declare class CDBModule {
    /**
     *
     */
    cdb: CDB;
    /**
     * Module Name
     */
    name: string;
    c_filename: string;
    asm_filename: string;
    /**
     * C Filename with Path
     */
    c_path: string;
    /**
     * ASM Filename with Path
     */
    asm_path: string;
    c_lines: SRCLine[];
    asm_lines: SRCLine[];
    cfpoints: Set<EXEPoint>;
    constructor(cdb: CDB);
    parseLine(line: string, lineno: number): Promise<boolean>;
    private _findFile;
    private _getASMPath;
    private _readASMFile;
    private _getCPath;
    private _readCFile;
    static filenameWithoutExtension(filename: string): string;
    static underscoreUnicode(str: string): string;
    static filenameToModuleNameWithExtension(filename: string): string;
    static filenameToModuleName(filename: string): string;
}
