/*
    CDB Debug File - Symbol class tests
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

import { CDB } from "../cdb"
import { AddressSpace, CDBSymbol, ScopeType } from "../cdb_symbol"

let cdb: CDB

beforeEach(() => {
    cdb = new CDB()
})

describe("CDBSymbol", () => {
    it("should return correct Length", () => {
        let sym = new CDBSymbol(cdb)
        let len = sym.parseLine(
            "S:Lsome_module.some_var$some_name$2_1$123({2}SI:S),R,0,0,[r2,r3]S:Lsome_module.some_var$j$2_1$123",
            23
        )

        expect(len).toEqual(64)

        sym = new CDBSymbol(cdb)
        len = sym.parseLine(
            "S:Lsome_module.some_var$some_name$2_1$123({2}DF,SV:S),C,0,6s,1,2,3",
            23
        )

        expect(len).toEqual(59)
    })

    it("should return correct Mangled Name", () => {
        let sym = new CDBSymbol(cdb)
        sym.parseLine(
            "S:Lsome_module.some_var$some_name$2_1$123({2}SI:S),R,0,0,[r2,r3]S:Lsome_module.some_var$j$2_1$123",
            23
        )

        expect(sym.mangled_name).toEqual(
            "Lsome_module.some_var$some_name$2_1$123"
        )

        sym = new CDBSymbol(cdb)
        sym.parseLine(
            "S:Lsomething$some_name$2_1$123({2}SI:S),R,0,0,[r2,r3]S:Lsome_module.some_var$j$2_1$123",
            23
        )

        expect(sym.mangled_name).toEqual("Lsomething$some_name$2_1$123")

        sym = new CDBSymbol(cdb)
        sym.parseLine(
            "S:G$some_name$2_1$123({2}SI:S),R,0,0,[r2,r3]S:Lsome_module.some_var$j$2_1$123",
            23
        )

        expect(sym.mangled_name).toEqual("G$some_name$2_1$123")
    })

    it("should return correct Symbol Name", () => {
        const sym = new CDBSymbol(cdb)
        sym.parseLine(
            "S:Lsome_module.some_var$some_name$2_1$123({2}SI:S),R,0,0,[r2,r3]S:Lsome_module.some_var$j$2_1$123",
            23
        )

        expect(sym.name).toEqual("some_name")
    })

    it("should return Registers array", () => {
        let sym = new CDBSymbol(cdb)
        sym.parseLine(
            "S:Lsome_module.some_var$some_name$2_1$123({2}SI:S),R,0,0,[r2,r3]S:Lsome_module.some_var$j$2_1$123",
            23
        )

        expect(sym.address_space).toEqual(AddressSpace.register)
        expect(sym.registers).toEqual(["R2", "R3"])

        sym = new CDBSymbol(cdb)
        sym.parseLine(
            "S:Lsome_module.some_var$some_name$2_1$123({2}SI:S),R,0,0,[r1]S:Lsome_module.some_var$j$2_1$123",
            23
        )

        expect(sym.registers).toEqual(["R1"])

        expect(() => {
            sym = new CDBSymbol(cdb)
            sym.parseLine(
                "S:Lsome_module.some_var$some_name$2_1$123({2}SI:S),R,0,0,[r1,]S:Lsome_module.some_var$j$2_1$123",
                23
            )
        }).toThrowError()
    })

    it("should return correct Scope Type", () => {
        const sym = new CDBSymbol(cdb)
        sym.parseLine(
            "S:Lsome_module.some_var$some_name$2_1$123({2}SI:S),R,0,0,[r2,r3]S:Lsome_module.some_var$j$2_1$123",
            23
        )
        expect(sym.scope_type).toEqual(ScopeType.local)
    })

    it("should return correct Address Space", () => {
        let sym = new CDBSymbol(cdb)
        sym.parseLine(
            "S:Lsome_module.some_var$some_name$2_1$123({2}SI:S),R,0,0,[r2,r3]S:Lsome_module.some_var$j$2_1$123",
            23
        )
        expect(sym.address_space).toEqual(AddressSpace.register)

        expect(() => {
            sym = new CDBSymbol(cdb)
            sym.parseLine(
                "S:Lsome_module.some_var$some_name$2_1$123({2}SI:S),P,0,0,[r2,r3]S:Lsome_module.some_var$j$2_1$123",
                23
            )
        }).toThrowError()
    })

    it("should identify if it is a Function", () => {
        let sym = new CDBSymbol(cdb)
        sym.parseLine(
            "S:Lsome_module.some_var$some_name$2_1$123({2}SI:S),R,0,0,[r2,r3]S:Lsome_module.some_var$j$2_1$123",
            23
        )
        expect(sym.is_function).toEqual(false)

        sym = new CDBSymbol(cdb)
        sym.parseLine(
            "F:Lsome_module$some_name$0_0$0({3}DF,SC:U),Z,0,0,0,0,0",
            99
        )
        expect(sym.is_function).toEqual(true)
    })

    it("should identify if it is on the Stack", () => {
        let sym = new CDBSymbol(cdb)
        sym.parseLine(
            "S:Lsome_module.some_var$some_name$2_1$123({2}SI:S),R,0,0,[r2,r3]S:Lsome_module.some_var$j$2_1$123",
            23
        )
        expect(sym.is_on_stack).toEqual(false)

        sym = new CDBSymbol(cdb)
        sym.parseLine("S:Lsome_module.some_vname$l$1_0$520({2}SI:S),B,1,1", 22)
        expect(sym.is_on_stack).toEqual(true)
    })

    it("should identify if it is Signed or Unsigned", () => {
        let sym = new CDBSymbol(cdb)
        sym.parseLine(
            "S:Lsome_module.some_var$some_name$2_1$123({2}SI:S),R,0,0,[r2,r3]S:Lsome_module.some_var$j$2_1$123",
            23
        )
        expect(sym.is_signed).toEqual(true)

        sym = new CDBSymbol(cdb)
        sym.parseLine("S:Lsome_module.some_vname$l$1_0$520({2}SI:U),B,1,1", 22)
        expect(sym.is_signed).toEqual(false)
    })

    it("should identify the Level", () => {
        const sym = new CDBSymbol(cdb)
        sym.parseLine(
            "S:Lsome_module.some_var$some_name$2_1$123({2}SI:S),R,0,0,[r2,r3]S:Lsome_module.some_var$j$2_1$123",
            23
        )
        expect(sym.level).toEqual(0x20001)
    })

    it("should identify the Block", () => {
        const sym = new CDBSymbol(cdb)
        sym.parseLine(
            "S:Lsome_module.some_var$some_name$2_1$123({2}SI:S),R,0,0,[r2,r3]S:Lsome_module.some_var$j$2_1$123",
            23
        )
        expect(sym.block).toEqual(123)
    })

    it("should identify the if a function is an Interrupt", () => {
        let sym = new CDBSymbol(cdb)
        sym.parseLine(
            "S:Lsome_module.some_var$some_name$2_1$123({2}SI:S),R,0,0,[r2,r3]S:Lsome_module.some_var$j$2_1$123",
            23
        )
        expect(sym.is_function).toEqual(false)
        expect(sym.is_interrupt).toEqual(false)

        sym = new CDBSymbol(cdb)
        sym.parseLine(
            "F:Lsome_module$some_name$0_0$0({3}DF,SC:U),Z,0,0,0,0,0S:Lsome_module.some_var$j$2_1$123",
            23
        )
        expect(sym.is_function).toEqual(true)
        expect(sym.is_interrupt).toEqual(false)

        sym = new CDBSymbol(cdb)
        sym.parseLine(
            "F:Lsome_module$some_name$0_0$0({3}DF,SC:U),Z,0,0,1,0,0S:Lsome_module.some_var$j$2_1$123",
            23
        )
        expect(sym.is_function).toEqual(true)
        expect(sym.is_interrupt).toEqual(true)

        expect(() => {
            sym = new CDBSymbol(cdb)
            sym.parseLine(
                "S:Lsome_module$some_name$0_0$0({3}DF,SC:U),Z,0,0,1,0,0S:Lsome_module.some_var$j$2_1$123",
                23
            )
        }).toThrowError()

        sym = new CDBSymbol(cdb)
        sym.parseLine(
            "F:Lsome_module$some_name$0_0$0({3}DF,SC:U),Z,0,0,1,55,33S:Lsome_module.some_var$j$2_1$123",
            23
        )
        expect(sym.is_function).toEqual(true)
        expect(sym.is_interrupt).toEqual(true)
        expect(sym.interrupt_number).toEqual(55)
        expect(sym.interrupt_bank).toEqual(33)
    })

    it("should idenity the currect Size", () => {
        const sym = new CDBSymbol(cdb)
        sym.parseLine(
            "S:Lsome_module.some_var$some_name$2_1$123({2}SI:S),R,0,0,[r2,r3]S:Lsome_module.some_var$j$2_1$123",
            23
        )
        expect(sym.size).toEqual(2)
    })
})
