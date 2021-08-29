
function buildBibtex(data){
    let entry = data.title.split(" ")[0].toLowerCase()+data.year
    let author = data.author.split(",").join(". and ")

    return `@article{${entry},
    author={${author}},
    title={${data.title}},
    journal={${data.journal}},
    year={${data.year}},
    volume={${data.volume}},
    pages={${data.pages}},
    publisher={${data.publisher}},
    doi={${data.doi}},
    issn={${data.issn}},
}
`
}


function buildAPA(data){
    return `${data.author}. "${data.title}" ${data.journal} ${data.volume} (${data.year}): ${data.pages}.`
}

module.exports = {
    buildBibtex: buildBibtex,
    buildAPA: buildAPA
}
