import { CDB } from "./cdb";
import { CDBModule } from "./cdb_module";
export declare enum CLASS_TYPE {
    declarator = "D",
    specifier = "S"
}
export declare enum DCLType {
    undefined = "",
    function = "F",
    genericptr = "G",
    codeptr = "C",
    extramptr = "X",
    intramptr = "D",
    pagedptr = "P",
    upperptr = "I",
    eepromptr = "E",
    array = "A"
}
export declare enum SPCType {
    undefined = "",
    v_long = "L",
    v_int = "I",
    v_short = "S",
    v_char = "C",
    v_void = "V",
    v_float = "F",
    v_fixed16x16 = "Q",
    v_struct = "T",
    v_sbit = "X",
    v_bitfield = "B"
}
export declare enum ScopeType {
    global = "G",
    module = "F",
    local = "L",
    structure = "S"
}
export declare enum AddressSpace {
    extstack = "A",
    intstack = "B",
    code = "C",
    codestack = "D",
    intram128 = "E",
    extram = "F",
    intram = "G",
    bit = "H",
    sfr = "I",
    sbit = "J",
    register = "R",
    undefined = "Z"
}
export declare class CDBSymbol {
    /**
     *
     */
    line: string;
    /**
     *
     */
    lineno: number;
    /**
     *
     */
    cdb: CDB;
    /**
     * Symbol Name
     */
    name: string;
    /**
     *
     */
    mangled_name: string;
    /**
     * Associated Module
     */
    module: CDBModule | undefined;
    /**
     * Variable name
     */
    variable_name: string;
    /**
     * Scope level
     */
    level: number;
    /**
     * Block number
     */
    block: number;
    /**
     * If Symbol is on the Stack
     */
    is_on_stack: boolean;
    /**
     *
     */
    scope_type: ScopeType;
    /**
     *
     */
    address_space: AddressSpace;
    /**
     *
     */
    is_function: boolean;
    /**
     *
     */
    registers: string[];
    /**
     *
     */
    stack_offset: number;
    /**
     *
     */
    is_interrupt: boolean;
    /**
     *
     */
    interrupt_number: number;
    /**
     *
     */
    interrupt_bank: number;
    /**
     *
     */
    size: number;
    /**
     *
     */
    is_signed: boolean;
    /**
     *
     */
    type_chain: TypeRecord[];
    /**
     *
     */
    address: number;
    /**
     *
     */
    exit_address: number;
    /**
     *
     */
    conplex_offset: number;
    extra_debug: string;
    constructor(cdb: CDB);
    static parseLevel(level: string): number;
    parseLine(line: string, lineno: number): number;
    parseTypeChain(str: string): void;
    toString(): string;
}
export declare class TypeRecord {
    static readonly CLASS_TYPE: typeof CLASS_TYPE;
    readonly CLASS_TYPE: typeof CLASS_TYPE;
    static readonly DCLType: typeof DCLType;
    readonly DCLType: typeof DCLType;
    static readonly SPCType: typeof SPCType;
    readonly SPCType: typeof SPCType;
    /**
     *
     */
    class_type: CLASS_TYPE;
    /**
     *
     */
    declarator: DCLType;
    /**
     *
     */
    specifier: SPCType;
    /**
     *
     */
    array_size: number;
    /**
     *
     */
    struct_name: string;
    /**
     *
     */
    start_bit: number;
    /**
     *
     */
    num_bits: number;
    constructor(type_code: string, extra: string);
}
