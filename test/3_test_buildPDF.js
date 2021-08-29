const assert = require("assert")
const fs = require("fs")

const replies = require("./replies.json")

const citation = require("../src/js/citation")
const parseDOI = require("../src/js/doi")
const buildPDF = require("../src/js/pdf")

describe("buildPDF", () => {
    it("should build 'glass' PDF", () => {
        let data = parseDOI(replies.solving)
        let bibtex = citation.buildBibtex(data)
        let apa = citation.buildAPA(data)
        let doc = buildPDF({
            unipi: fs.readFileSync("./assets/unipi-logo.png", null),
            dii: fs.readFileSync("./assets/dii-logo.png", null),
            mlpi: fs.readFileSync("./assets/mlpi-logo.png", null),
            title: data.title,
            author: data.author,
            bibtex: bibtex,
            apa: apa
        })
        if(process.env.SAVE_PDF){
            doc.save("output.pdf")
        }
    })
})