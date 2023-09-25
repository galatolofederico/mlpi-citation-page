
function buildBibtex(data){
    let entry = data.title.split(" ")[0].toLowerCase()+data.year
    let author = data.author
    .split(",")
    .map(name => {
        let parts = name.split(" ")
        .map(e => e.replace(/\s/g, ''))
        .filter(e => e.length > 0)
        console.log(parts)
        return parts[parts.length-1]+", "+parts.slice(0, -1).join(" ")
    })
    .join(" and ")
    .replace("_", " ")

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
