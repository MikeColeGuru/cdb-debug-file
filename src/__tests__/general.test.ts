/*
    CDB Debug File - General Tests
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

import { CDB } from ".."

describe("Generally", () => {
    it("should give the correct line for c files", async () => {
        const cdb = new CDB()
        await cdb.loadFile("./src/__tests__/__fixtures__/fixture1/fixture1.cdb")

        //        const func = cdb.findFunctionByCLine(4)
    })
})
