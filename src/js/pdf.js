const jspdf = require("jspdf")

function splitString(str, n){
    let arr = str?.split(' ');
    let result=[]
    let subStr=arr[0]
    for(let i = 1; i < arr.length; i++){
        let word = arr[i]
        if(subStr.length + word.length + 1 <= n){
            subStr = subStr + ' ' + word
        }
        else{
            result.push(subStr);
            subStr = word
        }
    }
    if(subStr.length){result.push(subStr)}
    return result
}


function buildCitationPDF(args){
    const doc = new jspdf.jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
    })

    const banner_height = 40
    const a4 = [297, 210]
    const notice = "This is a preprint. Please cite using:"
    const title = splitString(args.title, 60).join("\n")
    const author = splitString(args.author, 90).join("\n")
    const apa = splitString(args.apa, 120).join("\n")
    const citation_padding = 15
    
    let author_height = 83
    if(splitString(args.title, 60).length > 2){
        author_height = 90
    }
    let notice_height = 107
    if(splitString(args.author, 90).length > 1){
        notice_height = 112
    }

    doc.setDrawColor(0)
    doc.setFillColor(0, 46, 76)
    doc.rect(0, 0, a4[0], banner_height, "F")

    doc.addImage(args.unipi, "PNG", 15, 5, 30, 30)
    doc.addImage(args.mlpi, "PNG", 130, 3, 30, 35)
    doc.addImage(args.dii, "PNG", 220, 13, 60, 13)

    doc.setFontSize(28);
    doc.text(title, 150, 58, {align: "center"})
    
    doc.setFontSize(18);
    doc.text(author, 150, author_height, {align: "center"})

    doc.setFontSize(18);
    doc.text(notice, 150, notice_height, {align: "center"})

    doc.setDrawColor(0)
    doc.setFillColor(32, 36, 40)
    doc.rect(citation_padding, 115, a4[0]-citation_padding*2, 65, "F")
    
    doc.setFontSize(13);
    doc.setTextColor(203, 198, 192);
    doc.text(args.bibtex, 20, 123, {align: "left"})
    

    doc.setDrawColor(0)
    doc.setFillColor(32, 36, 40)
    doc.rect(citation_padding, 185, a4[0]-citation_padding*2, 22, "F")
    
    doc.setFontSize(13);
    doc.setTextColor(203, 198, 192);
    doc.text(apa, 20, 193, {align: "left"})

    doc.setProperties({
        title: args.title,
        author: args.author,
    })

    return doc
}



function buildPreprintPDF(args){
    const doc = new jspdf.jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
    })

    const banner_height = 40
    const a4 = [297, 210]
    const notice = "This is a preprint."
    const link = "Please export an up-to-date reference from: "+args.notice_link
    const title = splitString(args.title, 60).join("\n")
    const author = splitString(args.author, 90).join("\n")
    
    let author_height = 100
    if(splitString(args.title, 60).length > 2){
        author_height += 7
    }
    let notice_height = 175
    if(splitString(args.author, 90).length > 1){
        notice_height += 5
    }

    doc.setDrawColor(0)
    doc.setFillColor(0, 46, 76)
    doc.rect(0, 0, a4[0], banner_height, "F")

    doc.addImage(args.unipi, "PNG", 15, 5, 30, 30)
    doc.addImage(args.mlpi, "PNG", 130, 3, 30, 35)
    doc.addImage(args.dii, "PNG", 220, 13, 60, 13)

    doc.setFontSize(28);
    doc.text(title, 150, 70, {align: "center"})
    
    doc.setFontSize(18);
    doc.text(author, 150, author_height, {align: "center"})

    doc.setFontSize(18);
    doc.text(notice, 150, notice_height, {align: "center"})


    doc.setFontSize(20);
    doc.text(link, 150, 190, {align: "center"})

    doc.setProperties({
        title: args.title,
        author: args.author,
    })

    return doc
}

module.exports = {
    buildCitationPDF: buildCitationPDF,
    buildPreprintPDF: buildPreprintPDF
}