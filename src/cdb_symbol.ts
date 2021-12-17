/*
    CDB Debug File - Symbols
    Copyright (C) 2021 Mike Cole <MikeColeGuru@gmail.com>

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; version 2 of the License

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA
*/

import { CDB } from "./cdb"
import { CDBModule } from "./cdb_module"

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
        "(.*)"
)

const typechain_regex = RegExp("{(\\d+)}([^:]+):([SU])")

export enum CLASS_TYPE {
    declarator = "D",
    specifier = "S"
}

export enum DCLType {
    undefined = "",
    function = "F", // Function
    genericptr = "G", // Generic Ptr
    codeptr = "C", // Code Ptr
    extramptr = "X", // External RAM Ptr
    intramptr = "D", // Internal RAM Ptr
    pagedptr = "P", // Paged Ptr
    upperptr = "I", // Upper RAM 128 bytes ptr
    eepromptr = "E", // EEPROM ptr (represented by 'A' with no size)
    array = "A" // Array; size => TypeRecord::array_size
}

export enum SPCType {
    undefined = "",
    v_long = "L",
    v_int = "I",
    v_short = "S",
    v_char = "C",
    v_void = "V",
    v_float = "F",
    v_fixed16x16 = "Q",
    v_struct = "T", // Structure; name => TypeRecord::name
    v_sbit = "X",
    v_bitfield = "B" // Bit Field; size => TypeRecord::num_bits
}

export enum ScopeType {
    global = "G",
    module = "F",
    local = "L",
    structure = "S"
}

export enum AddressSpace {
    extstack = "A", // External stack
    intstack = "B", // Internal stack
    code = "C", // Code
    codestack = "D", // Code / static segment
    intram128 = "E", // Internal ram (lower 128) bytes
    extram = "F", // External ram
    intram = "G", // Internal ram
    bit = "H", // Bit addressable
    sfr = "I", // SFR space
    sbit = "J", // SBIT space
    register = "R", // Register space
    undefined = "Z" // Used for function records, or any undefined space code
}

export class CDBSymbol {
    // static readonly ScopeType = ScopeType
    // readonly ScopeType = CDBSymbol.ScopeType

    // static readonly AddressSpace = AddressSpace
    // readonly AddressSpace = CDBSymbol.AddressSpace

    /**
     *
     */
    line = ""

    /**
     *
     */
    lineno = -1

    /**
     *
     */
    cdb: CDB

    /**
     * Symbol Name
     */
    name = ""

    /**
     *
     */
    mangled_name = ""

    /**
     * Associated Module
     */
    module: CDBModule | undefined

    /**
     * Variable name
     */
    variable_name = ""

    /**
     * Scope level
     */
    level = -1

    /**
     * Block number
     */
    block = -1

    /**
     * If Symbol is on the Stack
     */
    is_on_stack = false

    /**
     *
     */
    scope_type: ScopeType = ScopeType.global

    /**
     *
     */
    address_space: AddressSpace = AddressSpace.undefined

    /**
     *
     */
    is_function = false

    /**
     *
     */
    registers: string[] = []

    /**
     *
     */
    stack_offset = -1

    /**
     *
     */
    is_interrupt = false

    /**
     *
     */
    interrupt_number = -1

    /**
     *
     */
    interrupt_bank = -1

    /**
     *
     */
    size = -1

    /**
     *
     */
    is_signed = false

    /**
     *
     */
    type_chain: TypeRecord[] = []

    /**
     *
     */
    address = -1

    /**
     *
     */
    exit_address = -1

    /**
     *
     */
    conplex_offset = 0

    extra_debug = ""

    constructor(cdb: CDB) {
        this.cdb = cdb
        this.module = new CDBModule(cdb)
    }

    static parseLevel(level: string): number {
        // level / sub level
        const p = level.split("_", 2)
        if (p.length == 1) {
            // if it doesn't have '_' then treat as simple number
            return parseInt(p[0])
        } else {
            // if it does have '_' then recombine into number
            return (parseInt(p[0]) << 16) | parseInt(p[1])
        }
    }

    parseLine(line: string, lineno: number): number {
        let p: string[] = []

        this.line = line
        this.lineno = lineno

        const matches = line_regex.exec(line)

        if (matches === null) {
            throw Error(`Could not parse symbol at line ${lineno}`)
        }

        if (matches[3] === undefined) matches[3] = ""

        // symbol type (F or S)
        this.is_function = matches[1] == "F"

        // scope type
        switch (matches[2]) {
            case "G":
                this.scope_type = ScopeType.global
                break
            case "F":
                this.scope_type = ScopeType.module
                break
            case "L":
                this.scope_type = ScopeType.local
                break
            case "S":
                this.scope_type = ScopeType.structure
                break
            default:
                throw Error(
                    `Could not parse symbol at line ${lineno}, unknown type`
                )
        }

        let module_name = ""

        if (this.scope_type == ScopeType.local) {
            // name
            p = matches[3].split(".", 2)
            if (p.length == 1) {
                // doesn't have '.'
                this.variable_name = p[0]
            } else if (p.length == 2) {
                // does have '.'
                module_name = p[0]
                this.variable_name = p[1]
            }
        } else if (this.scope_type == ScopeType.module) {
            module_name = matches[3]
            this.variable_name = ""
        } else {
            this.variable_name = ""
        }

        // try and find module
        if (module_name.length > 0) {
            this.module = this.cdb.findModuleByName(module_name)
        }

        // symbol name
        this.name = matches[4]

        // level / sub level
        this.level = CDBSymbol.parseLevel(matches[5])

        // block
        this.block = parseInt(matches[6])

        // type chain
        this.parseTypeChain(matches[7])

        // address space name
        if (Object.values(AddressSpace).includes(matches[8] as AddressSpace)) {
            this.address_space = matches[8] as AddressSpace
        } else {
            throw new Error(`Unknown address space type '${matches[8]}'`)
        }

        if (this.address_space == AddressSpace.register) {
            this.is_on_stack = false
            if (matches[12] !== undefined) {
                this.registers = matches[12].toUpperCase().split(",")
                this.registers.forEach(value => {
                    if (value.length == 0)
                        throw new Error("Registers has empty register string")
                })
            }
        } else {
            // on stack?
            this.is_on_stack = parseInt(matches[9]) != 0

            // stack offset
            this.stack_offset = parseInt(matches[10])
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
            matches[6]

        if (this.is_function) {
            this.is_interrupt = parseInt(matches[14]) != 0
            this.interrupt_number = parseInt(matches[15])
            this.interrupt_bank = parseInt(matches[16])
        } else if (matches[13] !== undefined) {
            throw Error("Interrupt specified on non function")
        }

        return line.lastIndexOf(matches[17])
    }

    parseTypeChain(str: string) {
        const matches = typechain_regex.exec(str)

        if (matches !== null) {
            this.size = parseInt(matches[1])

            const p = matches[2].split(",")
            for (const t of p) {
                if (t.length >= 2) {
                    this.type_chain.push(
                        new TypeRecord(t.substr(0, 2), t.substr(2))
                    )
                } else {
                    // Invalid
                    throw Error("TODO: Invalid")
                }
            }

            if (matches[3] == "S") this.is_signed = true
            else if (matches[3] == "U") this.is_signed = false
            else {
                // Invalid
                throw Error("TODO: Invalid")
            }
        } else {
            // Invalid
            throw Error("TODO: Invalid")
        }
    }

    toString(): string {
        let ret = ""
        // if (this.VerboseLevel() <= 1)
        //     ret += "\"" + this.Name() + "\"";
        // else
        // {
        ret += "    "
        ret += "Name: " + this.name + ", "
        ret += "ModuleMame: " + this.module?.name + ", "
        ret += "VariableName: " + this.variable_name + "\n"

        ret += "    "
        ret += "MangledName: " + this.mangled_name + "\n"

        ret += "    "
        ret += "Size: " + this.size + ", "
        ret +=
            "Level: " + (this.level >> 16) + ":" + (this.level & 0xffff) + ", "
        ret += "Block: " + this.block + "\n"

        ret += "    "
        ret += "isOnStack: " + this.is_on_stack + ", "
        ret += "isFunction: " + this.is_function + ", "
        ret += "StackOffset: " + this.stack_offset + "\n"

        ret += "    "
        ret += "Address: " + this.address + ", "
        ret += "ExitAddress: " + this.exit_address + ", "
        ret += "Registers: " + this.registers + "\n"

        ret += "    "
        ret += "ScopeType: " + this.scope_type + ", "
        ret += "AddressSpace: " + this.address_space + "\n"
        //}

        return ret
    }
}

export class TypeRecord {
    static readonly CLASS_TYPE = CLASS_TYPE
    readonly CLASS_TYPE = TypeRecord.CLASS_TYPE

    static readonly DCLType = DCLType
    readonly DCLType = TypeRecord.DCLType

    static readonly SPCType = SPCType
    readonly SPCType = TypeRecord.SPCType

    /**
     *
     */
    class_type: CLASS_TYPE

    /**
     *
     */
    declarator: DCLType = DCLType.undefined

    /**
     *
     */
    specifier: SPCType = SPCType.undefined

    /**
     *
     */
    array_size = -1

    /**
     *
     */
    struct_name = ""

    /**
     *
     */
    start_bit = -1

    /**
     *
     */
    num_bits = -1

    constructor(type_code: string, extra: string) {
        this.class_type = type_code[0] as CLASS_TYPE

        if (this.class_type == CLASS_TYPE.declarator) {
            this.declarator = type_code[1] as DCLType

            if (this.declarator == DCLType.array) {
                if (extra.length == 0) {
                    // really it is an eeprom ptr
                    this.declarator = DCLType.eepromptr
                } else {
                    this.array_size = parseInt(extra)
                }
            }
        } else if (this.class_type == CLASS_TYPE.specifier) {
            this.specifier = type_code[1] as SPCType

            if (this.specifier == SPCType.v_struct) {
                this.struct_name = extra
            } else if (this.specifier == SPCType.v_bitfield) {
                //num_bits =
                // "SB%d$%d", start, len
                const p = extra.split("$", 2)
                this.start_bit = parseInt(p[0])
                this.num_bits = parseInt(p[1])
            }
        }
    }
}
