const assert = require("assert")
const fs = require("fs")

const replies = require("./replies.json")

const citation = require("../src/js/citation")
const parseDOI = require("../src/js/doi")
const buildPDF = require("../src/js/pdf")

describe("buildPDF", () => {
    it("should build 'glass' PDF", () => {
        let data = parseDOI(replies.glass)
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
            doc.save("glass-output.pdf")
        }
    })

    it("should build a PDF with long title", () => {
        let data = parseDOI(replies.solving)
        let bibtex = citation.buildBibtex(data)
        let apa = citation.buildAPA(data)
        let doc = buildPDF({
            unipi: fs.readFileSync("./assets/unipi-logo.png", null),
            dii: fs.readFileSync("./assets/dii-logo.png", null),
            mlpi: fs.readFileSync("./assets/mlpi-logo.png", null),
            title: "This is a very very long title, why a paper would have a title so long? I dont know. But I am sure that it is a good idea to be prepared",
            author: data.author,
            bibtex: bibtex,
            apa: apa
        })
        if(process.env.SAVE_PDF){
            doc.save("long-title-output.pdf")
        }
    })

    it("should build a PDF with long author", () => {
        let data = parseDOI(replies.formal)
        let bibtex = citation.buildBibtex(data)
        let apa = citation.buildAPA(data)
        let doc = buildPDF({
            unipi: fs.readFileSync("./assets/unipi-logo.png", null),
            dii: fs.readFileSync("./assets/dii-logo.png", null),
            mlpi: fs.readFileSync("./assets/mlpi-logo.png", null),
            title: data.title,
            author: "Again? Why a paper should have so many authors? Maybe an hugge collab? I dont know but I must be prepared",
            bibtex: bibtex,
            apa: apa
        })
        if(process.env.SAVE_PDF){
            doc.save("long-author-output.pdf")
        }
    })


    it("should build a PDF with long author and title", () => {
        let data = parseDOI(replies.formal)
        let bibtex = citation.buildBibtex(data)
        let apa = citation.buildAPA(data)
        let doc = buildPDF({
            unipi: fs.readFileSync("./assets/unipi-logo.png", null),
            dii: fs.readFileSync("./assets/dii-logo.png", null),
            mlpi: fs.readFileSync("./assets/mlpi-logo.png", null),
            title: "This is a very very long title, why a paper would have a title so long? I dont know. But I am sure that it is a good idea to be prepared",
            author: "Again? Why a paper should have so many authors? Maybe an hugge collab? I dont know but I must be prepared",
            bibtex: bibtex,
            apa: apa
        })
        if(process.env.SAVE_PDF){
            doc.save("long-all-output.pdf")
        }
    })
})