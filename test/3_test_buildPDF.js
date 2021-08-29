const assert = require("assert")
const fs = require("fs")

const replies = require("./replies.json")

const buildBibtex = require("../src/js/buildbibtex")
const parseDOI = require("../src/js/doi")
const buildPDF = require("../src/js/pdf")

describe("buildPDF", () => {
    it("should build 'glass' PDF", () => {
        let data = parseDOI(replies.glass)
        let bibtex = buildBibtex(data);
        let doc = buildPDF({
            unipi: fs.readFileSync("./assets/unipi-logo.png", null),
            dii: fs.readFileSync("./assets/dii-logo.png", null),
            mlpi: fs.readFileSync("./assets/mlpi-logo.png", null),
            title: data.title,
            author: data.author,
            bibtex: bibtex
        })
        if(process.env.SAVE_PDF){
            doc.save("output.pdf")
        }
    })
})