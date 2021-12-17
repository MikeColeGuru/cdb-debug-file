import { CDBModule } from "./cdb_module";
import { CDBSymbol } from "./cdb_symbol";
import { CDBFunction } from "./cdb_function";
import { CDBComplex } from "./cdb_complex";
export declare class EXEPoint {
    address: number;
    line: number;
    block: number;
    level: number;
}
export declare class CDB {
    /**
     * Modules
     */
    modules_by_name: Map<string, CDBModule>;
    /**
     * Modules
     */
    modules_by_c_filename: Map<string, CDBModule>;
    /**
     *
     */
    symbols: Map<string, CDBSymbol>;
    /**
     *
     */
    functions_by_mangled_name: Map<string, CDBFunction>;
    /**
     *
     */
    functions_by_name: Map<string, CDBFunction>;
    /**
     *
     */
    complexes: Map<string, CDBComplex>;
    build_path: string;
    private _build_path_set;
    source_path: string;
    private _source_path_set;
    constructor();
    clear(): void;
    addModule(mod: CDBModule): void;
    addSymbol(sym: CDBSymbol): void;
    addFunction(func: CDBFunction): void;
    addComplex(complex: CDBComplex): void;
    findModuleByName(name: string): CDBModule | undefined;
    findModuleByCFilename(filename: string): CDBModule | undefined;
    findSymbolByMangledName(mangled_name: string): CDBSymbol | undefined;
    findFunctionByMangledName(mangled_name: string): CDBFunction | undefined;
    findFunctionByName(name: string): CDBFunction | undefined;
    setBuildPath(build_path: string): void;
    setSourcePath(source_path: string): void;
    parseLine(line: string, lineno: number): Promise<void>;
    loadString(cdb_string: string): Promise<void>;
    loadFile(filename: string): Promise<void>;
    needExtraMainFunction(): CDBFunction | undefined;
    private _functionPoints;
}
