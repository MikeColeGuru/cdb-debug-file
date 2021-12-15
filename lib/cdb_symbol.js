"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeRecord = exports.CDBSymbol = void 0;
const cdb_module_1 = require("./cdb_module");
const line_regex = RegExp(
// (0) Entire Symbol String
"([SF]):" + // (1) Symbol Type
    "([GFLS])" + // (2) Scope Type
    "([^\\$]+)?" + // (3) Module Name or Function Name
    "\\$([^\\$]+)" + // (4) Symbol Name
    "\\$([\\d_]+)" + // (5) Scope level
    "\\$(\\d+)" + // (6) Scope block
    "\\(([^\\)]+)\\)" + // (7) Type Chain
    ",([A-Z])" + // (8) Address space code
    ",(\\d+)" + // (9) Is this symbol on the stack?
    ",([\\d-]+)" + // (10) The stack offset relative to the 'bp' variable
    "(" + // if address space code is 'R'
    ",\\[" +
    "([^\\]]+)" + // (12) Registers
    "\\]" +
    ")?" +
    "(" + // if symbol type is 'F'
    ",(\\d+)" + // (14) Is Interrupt?
    ",(\\d+)" + // (15) Interrupt Number
    ",(\\d+)" + // (16) Interrupt Register Bank
    ")?" +
    "(.*)");
const typechain_regex = RegExp("{(\\d+)}([^:]+):([SU])");
var CLASS_TYPE;
(function (CLASS_TYPE) {
    CLASS_TYPE["declarator"] = "D";
    CLASS_TYPE["specifier"] = "S";
})(CLASS_TYPE || (CLASS_TYPE = {}));
var DCLType;
(function (DCLType) {
    DCLType["undefined"] = "";
    DCLType["function"] = "F";
    DCLType["genericptr"] = "G";
    DCLType["codeptr"] = "C";
    DCLType["extramptr"] = "X";
    DCLType["intramptr"] = "D";
    DCLType["pagedptr"] = "P";
    DCLType["upperptr"] = "I";
    DCLType["eepromptr"] = "E";
    DCLType["array"] = "A"; // Array; size => TypeRecord::array_size
})(DCLType || (DCLType = {}));
var SPCType;
(function (SPCType) {
    SPCType["undefined"] = "";
    SPCType["v_long"] = "L";
    SPCType["v_int"] = "I";
    SPCType["v_short"] = "S";
    SPCType["v_char"] = "C";
    SPCType["v_void"] = "V";
    SPCType["v_float"] = "F";
    SPCType["v_fixed16x16"] = "Q";
    SPCType["v_struct"] = "T";
    SPCType["v_sbit"] = "X";
    SPCType["v_bitfield"] = "B"; // Bit Field; size => TypeRecord::num_bits
})(SPCType || (SPCType = {}));
var ScopeType;
(function (ScopeType) {
    ScopeType["global"] = "G";
    ScopeType["module"] = "F";
    ScopeType["local"] = "L";
    ScopeType["structure"] = "S";
})(ScopeType || (ScopeType = {}));
var AddressSpace;
(function (AddressSpace) {
    AddressSpace["extstack"] = "A";
    AddressSpace["intstack"] = "B";
    AddressSpace["code"] = "C";
    AddressSpace["codestack"] = "D";
    AddressSpace["intram128"] = "E";
    AddressSpace["extram"] = "F";
    AddressSpace["intram"] = "G";
    AddressSpace["bit"] = "H";
    AddressSpace["sfr"] = "I";
    AddressSpace["sbit"] = "J";
    AddressSpace["register"] = "R";
    AddressSpace["undefined"] = "Z"; // Used for function records, or any undefined space code
})(AddressSpace || (AddressSpace = {}));
class CDBSymbol {
    constructor(cdb) {
        this.ScopeType = CDBSymbol.ScopeType;
        this.AddressSpace = CDBSymbol.AddressSpace;
        /**
         *
         */
        this.line = "";
        /**
         *
         */
        this.lineno = -1;
        /**
         * Symbol Name
         */
        this.name = "";
        /**
         *
         */
        this.mangled_name = "";
        /**
         * Variable name
         */
        this.variable_name = "";
        /**
         * Scope level
         */
        this.level = -1;
        /**
         * Block number
         */
        this.block = -1;
        /**
         * If Symbol is on the Stack
         */
        this.is_on_stack = false;
        /**
         *
         */
        this.scope_type = ScopeType.global;
        /**
         *
         */
        this.address_space = AddressSpace.undefined;
        /**
         *
         */
        this.is_function = false;
        /**
         *
         */
        this.registers = [];
        /**
         *
         */
        this.stack_offset = -1;
        /**
         *
         */
        this.is_interrupt = false;
        /**
         *
         */
        this.interrupt_number = -1;
        /**
         *
         */
        this.interrupt_bank = -1;
        /**
         *
         */
        this.size = -1;
        /**
         *
         */
        this.is_signed = false;
        /**
         *
         */
        this.type_chain = [];
        /**
         *
         */
        this.address = -1;
        /**
         *
         */
        this.exit_address = -1;
        /**
         *
         */
        this.conplex_offset = 0;
        this.extra_debug = "";
        this.cdb = cdb;
        this.module = new cdb_module_1.CDBModule(cdb);
    }
    parseLine(line, lineno) {
        let p = [];
        this.line = line;
        this.lineno = lineno;
        const matches = line_regex.exec(line);
        if (matches === null) {
            throw Error(`Could not parse symbol at line ${lineno}`);
        }
        if (matches[3] === undefined)
            matches[3] = "";
        // symbol type (F or S)
        this.is_function = matches[1] == "F";
        // scope type
        switch (matches[2]) {
            case "G":
                this.scope_type = CDBSymbol.ScopeType.global;
                break;
            case "F":
                this.scope_type = CDBSymbol.ScopeType.module;
                break;
            case "L":
                this.scope_type = CDBSymbol.ScopeType.local;
                break;
            case "S":
                this.scope_type = CDBSymbol.ScopeType.structure;
                break;
            default:
                throw Error(`Could not parse symbol at line ${lineno}, unknown type`);
        }
        let module_name = "";
        if (this.scope_type == CDBSymbol.ScopeType.local) {
            // name
            p = matches[3].split(".", 2);
            if (p.length == 1) {
                // doesn't have '.'
                this.variable_name = p[0];
            }
            else if (p.length == 2) {
                // does have '.'
                module_name = p[0];
                this.variable_name = p[1];
            }
        }
        else if (this.scope_type == CDBSymbol.ScopeType.module) {
            module_name = matches[3];
            this.variable_name = "";
        }
        else {
            this.variable_name = "";
        }
        // try and find module
        if (module_name.length > 0) {
            this.module = this.cdb.findModuleByName(module_name);
        }
        // symbol name
        this.name = matches[4];
        // level / sub level
        p = matches[5].split("_", 2);
        if (p.length == 1) {
            // if it doesn't have '_' then treat as simple number
            this.level = parseInt(p[0]);
        }
        else if (p.length == 2) {
            // if it does have '_' then recombine into number
            this.level = (parseInt(p[0]) << 16) | parseInt(p[1]);
        }
        // block
        this.block = parseInt(matches[6]);
        // type chain
        this.parseTypeChain(matches[7]);
        //cret += "typechain: " + matches[7] + "\n";
        // address space name
        if (Object.values(AddressSpace).includes(matches[8])) {
            this.address_space = matches[8];
        }
        else {
            throw new Error(`Unknown address space type '${matches[8]}'`);
        }
        if (this.address_space == CDBSymbol.AddressSpace.register) {
            this.is_on_stack = false;
            if (matches[12] !== undefined) {
                this.registers = matches[12].toUpperCase().split(",");
                this.registers.forEach(value => {
                    if (value.length == 0)
                        throw new Error("Registers has empty register string");
                });
            }
        }
        else {
            // on stack?
            this.is_on_stack = parseInt(matches[9]) != 0;
            // stack offset
            this.stack_offset = parseInt(matches[10]);
        }
        // Mangled Name
        this.mangled_name =
            matches[2] +
                matches[3] +
                "$" +
                matches[4] +
                "$" +
                matches[5] +
                "$" +
                matches[6];
        if (this.is_function) {
            this.is_interrupt = parseInt(matches[14]) != 0;
            this.interrupt_number = parseInt(matches[15]);
            this.interrupt_bank = parseInt(matches[16]);
        }
        else if (matches[13] !== undefined) {
            throw Error("Interrupt specified on non function");
        }
        return line.lastIndexOf(matches[17]);
    }
    parseTypeChain(str) {
        const matches = typechain_regex.exec(str);
        if (matches !== null) {
            this.size = parseInt(matches[1]);
            const p = matches[2].split(",");
            for (const t of p) {
                if (t.length >= 2) {
                    this.type_chain.push(new TypeRecord(t.substr(0, 2), t.substr(2)));
                }
                else {
                    // Invalid
                    throw Error("TODO: Invalid");
                }
            }
            if (matches[3] == "S")
                this.is_signed = true;
            else if (matches[3] == "U")
                this.is_signed = false;
            else {
                // Invalid
                throw Error("TODO: Invalid");
            }
        }
        else {
            // Invalid
            throw Error("TODO: Invalid");
        }
    }
    toString() {
        var _a;
        let ret = "";
        // if (this.VerboseLevel() <= 1)
        //     ret += "\"" + this.Name() + "\"";
        // else
        // {
        ret += "    ";
        ret += "Name: " + this.name + ", ";
        ret += "ModuleMame: " + ((_a = this.module) === null || _a === void 0 ? void 0 : _a.name) + ", ";
        ret += "VariableName: " + this.variable_name + "\n";
        ret += "    ";
        ret += "MangledName: " + this.mangled_name + "\n";
        ret += "    ";
        ret += "Size: " + this.size + ", ";
        ret +=
            "Level: " + (this.level >> 16) + ":" + (this.level & 0xffff) + ", ";
        ret += "Block: " + this.block + "\n";
        ret += "    ";
        ret += "isOnStack: " + this.is_on_stack + ", ";
        ret += "isFunction: " + this.is_function + ", ";
        ret += "StackOffset: " + this.stack_offset + "\n";
        ret += "    ";
        ret += "Address: " + this.address + ", ";
        ret += "ExitAddress: " + this.exit_address + ", ";
        ret += "Registers: " + this.registers + "\n";
        ret += "    ";
        ret += "ScopeType: " + this.scope_type + ", ";
        ret += "AddressSpace: " + this.address_space + "\n";
        //}
        return ret;
    }
}
exports.CDBSymbol = CDBSymbol;
CDBSymbol.ScopeType = ScopeType;
CDBSymbol.AddressSpace = AddressSpace;
class TypeRecord {
    constructor(type_code, extra) {
        this.CLASS_TYPE = TypeRecord.CLASS_TYPE;
        this.DCLType = TypeRecord.DCLType;
        this.SPCType = TypeRecord.SPCType;
        /**
         *
         */
        this.declarator = DCLType.undefined;
        /**
         *
         */
        this.specifier = SPCType.undefined;
        /**
         *
         */
        this.array_size = -1;
        /**
         *
         */
        this.struct_name = "";
        /**
         *
         */
        this.start_bit = -1;
        /**
         *
         */
        this.num_bits = -1;
        this.class_type = type_code[0];
        if (this.class_type == CLASS_TYPE.declarator) {
            this.declarator = type_code[1];
            if (this.declarator == DCLType.array) {
                if (extra.length == 0) {
                    // really it is an eeprom ptr
                    this.declarator = DCLType.eepromptr;
                }
                else {
                    this.array_size = parseInt(extra);
                }
            }
        }
        else if (this.class_type == CLASS_TYPE.specifier) {
            this.specifier = type_code[1];
            if (this.specifier == SPCType.v_struct) {
                this.struct_name = extra;
            }
            else if (this.specifier == SPCType.v_bitfield) {
                //num_bits =
                // "SB%d$%d", start, len
                const p = extra.split("$", 2);
                this.start_bit = parseInt(p[0]);
                this.num_bits = parseInt(p[1]);
            }
        }
    }
}
exports.TypeRecord = TypeRecord;
TypeRecord.CLASS_TYPE = CLASS_TYPE;
TypeRecord.DCLType = DCLType;
TypeRecord.SPCType = SPCType;
// export namespace TypeRecord {
//     export enum CLASS_TYPE {
//         declarator = 'D',
//         specifier = 'S'
//     }
//     export enum DCLType {
//         undefined = "",
//         function = 'F',       // Function
//         genericptr = 'G',     // Generic Ptr
//         codeptr = 'C',        // Code Ptr
//         extramptr = 'X',      // External RAM Ptr
//         intramptr = 'D',      // Internal RAM Ptr
//         pagedptr = 'P',       // Paged Ptr
//         upperptr = 'I',       // Upper RAM 128 bytes ptr
//         eepromptr = 'E',      // EEPROM ptr (represented by 'A' with no size)
//         array = 'A'           // Array; size => TypeRecord::array_size
//     }
//     export enum SPCType {
//         undefined = "",
//         v_long = 'L',
//         v_int = 'I',
//         v_short = 'S',
//         v_char = 'C',
//         v_void = 'V',
//         v_float = 'F',
//         v_fixed16x16 = 'Q',
//         v_struct = 'T',       // Structure; name => TypeRecord::name
//         v_sbit = 'X',
//         v_bitfield = 'B'      // Bit Field; size => TypeRecord::num_bits
//     }
// }
// export namespace CDBSymbol {
//     export enum ScopeType {
//         global = 'G',
//         module = 'F',
//         local = 'L',
//         structure = 'S'
//     }
//     export enum AddressSpace {
//         extstack = 'A',     // External stack
//         intstack = 'B',     // Internal stack
//         code = 'C',         // Code
//         codestack = 'D',    // Code / static segment
//         intram128 = 'E',    // Internal ram (lower 128) bytes
//         extram = 'F',       // External ram
//         intram = 'G',       // Internal ram
//         bit = 'H',          // Bit addressable
//         sfr = 'I',          // SFR space
//         sbit = 'J',         // SBIT space
//         reg = 'R',          // Register space
//         undefined = 'Z'     // Used for function records, or any undefined space code
//     }
// }
