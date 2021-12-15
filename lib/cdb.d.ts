import { CDBModule } from "./cdb_module";
import { CDBSymbol } from "./cdb_symbol";
import { CDBFunction } from "./cdb_function";
import { CDBComplex } from "./cdb_complex";
export declare class CDB {
    /**
     * Modules
     */
    modules: Map<string, CDBModule>;
    /**
     *
     */
    symbols: Map<string, CDBSymbol>;
    /**
     *
     */
    functions: Map<string, CDBFunction>;
    /**
     *
     */
    complexes: Map<string, CDBComplex>;
    clear(): void;
    findModuleByName(name: string): CDBModule | undefined;
    parseLine(line: string, lineno: number): void;
    loadString(cdb_string: string): void;
    loadFile(filename: string): Promise<void>;
}
