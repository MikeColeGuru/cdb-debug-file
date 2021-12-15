import { CDB } from "./cdb"
import { CDBModule } from "./cdb_module"
import { CDBSymbol } from "./cdb_symbol"

const line_regex = RegExp("T:F([^\\$]+)\\$([^\\[]+)\\[(.*)\\].*")

export class CDBComplex {
    cdb: CDB
    name = ""
    module: CDBModule | undefined
    size = -1
    fields: CDBSymbol[] = []
    line = ""
    lineno = -1

    constructor(cdb: CDB) {
        this.cdb = cdb
    }

    parseLine(line: string, lineno: number): number {
        this.line = line
        this.lineno = lineno

        const matches = line_regex.exec(line)

        if (matches === null) {
            throw Error(`Could not parse symbol at line ${lineno}`)
        }

        const module_name = matches[1]
        this.name = matches[2]
        const strs = matches[3]

        // try and find module
        if (module_name.length > 0) {
            this.module = this.cdb.findModuleByName(module_name)
        }

        const epos = strs.length
        let pos = 0
        let offset_start

        this.size = 0

        while (pos < epos) {
            // get offset
            while (pos < epos && strs.at(pos) != "{") pos++
            offset_start = pos + 1
            while (pos < epos && strs.at(pos) != "}") pos++
            if (pos >= epos) break
            const offset = parseInt(
                strs.substr(offset_start, pos - offset_start)
            )
            pos++

            // parse symbol
            const sym = new CDBSymbol(this.cdb)
            pos += sym.parseLine(strs.substr(pos), this.lineno)
            sym.conplex_offset = offset

            // sum size
            this.size += sym.size

            // save it
            this.fields.push(sym)
        }

        return pos
    }
}
