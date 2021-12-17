import { CDB } from ".."

describe("Generally", () => {
    it("should give the correct line for c files", async () => {
        const cdb = new CDB()
        await cdb.loadFile("./src/__tests__/__fixtures__/fixture1/fixture1.cdb")

        //        const func = cdb.findFunctionByCLine(4)
    })
})
