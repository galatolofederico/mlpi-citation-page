const { Command, Option } = require("commander")
const program = new Command()
const request = require("request")
const fs = require("fs")

const citation = require("./src/js/citation")
const pdf = require("./src/js/pdf")
const parseDOI = require("./src/js/doi")

async function main(options){
    let data = {
        author: "",
        title: "",
        journal: "",
        year: "",
        volume: "",
        pages: "",
        publisher: "",
        doi: "",
        issn: "",
    }

    if (options.doi !== undefined){
        doi = options.doi.replace("https://doi.org/", "")
        data = await (new Promise((res, rej) => {
            request(`https://api.crossref.org/works/${doi}`, (err, resp, body) => {
                if (!err && resp.statusCode == 200) {
                    body = JSON.parse(body)
                    data = parseDOI(body)
                    res(data)
                } else {
                    console.log(`Error parsing DOI ${doi}`)
                    rej(err)
                }
            })
        }))
    }

    for ([key, value] of Object.entries(options)) data[key] = value

    doc = undefined;

    if(options.type == "citation"){
        bibtex = citation.buildBibtex(data)
        apa = citation.buildAPA(data)

        doc = pdf.buildCitationPDF({
            unipi: fs.readFileSync("./assets/unipi-logo.png").toString("base64"),
            dii: fs.readFileSync("./assets/dii-logo.png").toString("base64"),
            mlpi: fs.readFileSync("./assets/mlpi-logo.png").toString("base64"),
            title: data.title,
            author: data.author,
            bibtex: bibtex,
            apa: apa
        })
    }
    if(options.type == "preprint"){
        doc = pdf.buildPreprintPDF({
            unipi: fs.readFileSync("./assets/unipi-logo.png").toString("base64"),
            dii: fs.readFileSync("./assets/dii-logo.png").toString("base64"),
            mlpi: fs.readFileSync("./assets/mlpi-logo.png").toString("base64"),
            title: data.title,
            author: data.author,
            notice_link: options.preprint_link
        })
    }

    doc.save(options.output)
}

program
.option("--doi <doi>", "paper DOI to fetch")
.option("--title <title>", "override paper title")
.option("--author <author>", "override paper author")
.option("--journal <journal>", "override paper journal")
.option("--year <year>", "override paper year")
.option("--volume <volume>", "override paper volume")
.option("--pages <pages>", "override paper pages")
.option("--publisher <publisher>", "override paper publisher")
.option("--issn <issn>", "override paper issn")
.addOption(
    new Option("--type <type>", "Page to generate")
    .choices(["citation", "preprint"])
    .default("citation")
)
.option("--output <output>", "output file", "citation.pdf")
.option("--preprint_link <link>", "Preprint link", "http://mlpi.ing.unipi.it/")



program.parse(process.argv);
options = program.opts();

main(options)