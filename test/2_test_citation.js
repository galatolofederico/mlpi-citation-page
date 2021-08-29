const assert = require("assert")
const replies = require("./replies.json")

const citation = require("../src/js/citation")
const parseDOI = require("../src/js/doi")

describe("buildBibtex", () => {
    it("should process 'glass' Bibtex", () => {
        let data = parseDOI(replies.glass)
        let bibtex = citation.buildBibtex(data)
        let result = `@article{generating2021,
    author={Federico Galatolo. and  Mario Cimino. and  Gigliola Vaglini},
    title={Generating Images from Caption and Vice Versa via CLIP-Guided Generative Latent Space Search},
    journal={Proceedings of the International Conference on Image Processing and Vision Engineering},
    year={2021},
    volume={},
    pages={},
    publisher={SCITEPRESS - Science and Technology Publications},
    doi={10.5220/0010503701660174},
    issn={},
}
`
        assert.equal(bibtex == result, true)        
    })

    it("should process 'glass' APA", () => {
        let data = parseDOI(replies.glass)
        let apa = citation.buildAPA(data)
        let result = `Federico Galatolo, Mario Cimino, Gigliola Vaglini. "Generating Images from Caption and Vice Versa via CLIP-Guided Generative Latent Space Search" Proceedings of the International Conference on Image Processing and Vision Engineering  (2021): .`

        assert.equal(apa == result, true)        
    })
})