const citation = require("./citation")
const buildPDF = require("./pdf")
const parseDOI = require("./doi")

const jspdf = require("jspdf")

import "bootstrap"
import "../scss/app.scss"

function getImage(url) {
    return new Promise((res, rej) => {
        let img = new Image()
        img.src = url
        img.onload = () => {
            res(img)
        }
    })
}

function generatePDF(){
    let data = {
        author: document.getElementById("author").value,
        title: document.getElementById("title").value,
        journal: document.getElementById("journal").value,
        year: document.getElementById("year").value,
        volume: document.getElementById("volume").value,
        pages: document.getElementById("pages").value,
        publisher: document.getElementById("publisher").value,
        doi: document.getElementById("doi").value,
        issn: document.getElementById("issn").value 
    }

    let bibtex = citation.buildBibtex(data)
    let apa = citation.buildAPA(data)

    Promise.all([
        getImage("./assets/unipi-logo.png"),
        getImage("./assets/dii-logo.png"),
        getImage("./assets/mlpi-logo.png"),
    ]).then(images => {
        let doc = buildPDF({
            unipi: images[0],
            dii: images[1],
            mlpi: images[2],
            title: data.title,
            author: data.author,
            bibtex: bibtex,
            apa: apa
        })
        doc.save("citation.pdf")
    })
}


function fetchDOI(){
    let doi = document.getElementById("fetch-doi").value
    doi = doi.replace("https://doi.org/", "")

    fetch(`https://api.crossref.org/works/${doi}`)
    .then(response => response.json())
    .then(resp => {
        let data = parseDOI(resp)

        document.getElementById("author").value = data.author
        document.getElementById("title").value = data.title
        document.getElementById("journal").value = data.journal
        document.getElementById("year").value = data.year
        document.getElementById("volume").value = data.volume
        document.getElementById("pages").value = data.pages
        document.getElementById("publisher").value = data.publisher
        document.getElementById("doi").value = data.doi
        document.getElementById("issn").value = data.issn
    })
}

window.generatePDF = generatePDF
window.fetchDOI = fetchDOI