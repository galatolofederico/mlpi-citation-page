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


function buildpdf(jspdf, args){
    const doc = new jspdf.jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
    })

    const rect_padding = 7
    const banner_height = 40
    const a4 = [297, 210]
    const max_title_chars = 10
    const notice = "This is a preprint. Please cite using:"
    const title = splitString(args.title, 50).join("\n")
    const citation_padding = 10

    doc.setDrawColor(0)
    doc.setFillColor(0, 46, 76)
    doc.rect(0, 0, a4[0], banner_height, "F")

    doc.addImage(args.unipi, "PNG", 15, 5, 30, 30)
    doc.addImage(args.mlpi, "PNG", 130, 3, 30, 35)
    doc.addImage(args.dii, "PNG", 220, 13, 60, 13)

    doc.setFontSize(25);
    doc.text(title, 150, 55, {align: "center"})
    
    doc.setFontSize(18);
    doc.text(args.authors, 150, 80, {align: "center"})

    doc.setFontSize(30);
    doc.text(notice, 150, 105, {align: "center"})

    doc.setDrawColor(0)
    doc.setFillColor(32, 36, 40)
    doc.rect(citation_padding, 120, a4[0]-citation_padding*2, 80, "F")
    
    doc.setFontSize(13);
    doc.setTextColor(203, 198, 192);
    doc.text(args.bibtex, 20, 130, {align: "left"})
    
    doc.save("a4.pdf")
}


module.exports = buildpdf