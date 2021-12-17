/*
    CDB Debug File - CDB class tests
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
import fs from "fs"

describe("CDB", () => {
    it("should load cdb file with no errors", async () => {
        const cdb = new CDB()
        return expect(
            cdb.loadFile(
                "./src/__tests__/__fixtures__/fixture2/build/fixture2.cdb"
            )
        ).resolves
    })

    it("should default Build Path to cwd", () => {
        const cdb = new CDB()
        expect(cdb.build_path).toEqual(fs.realpathSync(process.cwd()))
    })

    it("should accept setting of Build Path", () => {
        const cdb = new CDB()
        expect(() => {
            cdb.setBuildPath("node_modules")
        }).not.toThrowError()
        expect(cdb.build_path).toEqual(
            fs.realpathSync(process.cwd() + "/" + "node_modules")
        )
    })

    it("should take Build Path from loadFile", async () => {
        const cdb = new CDB()
        await cdb.loadFile("./src/__tests__/__fixtures__/empty.cdb")
        expect(cdb.build_path).toEqual(
            fs.realpathSync(process.cwd() + "/src/__tests__/__fixtures__/")
        )
    })

    it("should not allow overriding of setBuildPath by loadFile", async () => {
        const cdb = new CDB()
        cdb.setBuildPath("node_modules")
        await cdb.loadFile("./src/__tests__/__fixtures__/empty.cdb")
        expect(cdb.build_path).toEqual(
            fs.realpathSync(process.cwd() + "/" + "node_modules")
        )
    })

    it("should allow setting of source path", () => {
        let cdb: CDB

        cdb = new CDB()
        expect(cdb.source_path).toEqual("")

        cdb = new CDB()
        expect(() => {
            cdb.setSourcePath("src")
        }).not.toThrowError()
        expect(cdb.source_path).toEqual(
            fs.realpathSync(process.cwd() + "/" + "src")
        )
    })
})
