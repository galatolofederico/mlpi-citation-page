

function parseDOI(msg){
    if(msg.status != "ok"){
        console.log(msg)
        throw "Error in parsing DOI"
    }
    let data = msg.message;

    let title = ""
    if(data.title !== undefined){
        if(data.title.length > 0) title = data.title[0]
        else title = data.title
    }

    let authors = ""
    if(data.author !== undefined){
        for(let i = 0;i < data.author.length; i++){
            let author = data.author[i]
            let last = i == (data.author.length - 1)
            authors += author.given+" "+author.family+(!last ? ", ":"")
        }
    }


    let publisher = (data.publisher !== undefined) ? data.publisher : ""

    let journal = ""
    if(data["container-title"] !== undefined){
        if(data["container-title"].length > 0) journal = data["container-title"][0]
        else journal = data["container-title"]
    }

    let volume = (data.volume !== undefined) ? data.volume : ""
    
    let pages = (data.page !== undefined) ? data.page : ""
    
    let year = ""
    if(data.deposited !== undefined && data.deposited.timestamp !== undefined)
        year = new Date(data.deposited.timestamp).getFullYear().toString()
    
    let doi = (data.DOI !== undefined) ? data.DOI : ""

    let issn = ""
    if(data.ISSN !== undefined){
        if(data.ISSN.length > 0) issn = data.ISSN[0]
        else issn = data.ISSN
    }

    return {
        author: authors,
        title: title,
        journal: journal,
        year: year,
        volume: volume,
        pages: pages,
        publisher: publisher,
        doi: doi,
        issn: issn
    }
}

module.exports = parseDOI

/*
+ author
+ title
+ journal
+ year,
+ volume,
+ pages
+ publisher
+ doi
+ issn
*/