const assert = require("assert")
const replies = require("./replies.json")

const parseDOI = require("../src/js/parsedoi")

describe("parseDOI", () => {
    it("should process 'glass' DOI", () => {
        let data = parseDOI(replies.glass)
        let result = {
            author: 'Federico Galatolo, Mario Cimino, Gigliola Vaglini',
            title: 'Generating Images from Caption and Vice Versa via CLIP-Guided Generative Latent Space Search',
            journal: 'Proceedings of the International Conference on Image Processing and Vision Engineering',
            year: '2021',
            volume: '',
            pages: '',
            publisher: 'SCITEPRESS - Science and Technology Publications',
            doi: '10.5220/0010503701660174',
            issn: ''
          }
        
        assert.deepEqual(data, result)  
    })

    it("should process 'solving' DOI", () => {
        let data = parseDOI(replies.solving)
        let result = {
            author: 'Federico A. Galatolo, Mario G.C.A. Cimino, Gigliola Vaglini',
            title: 'Solving the scalarization issues of Advantage-based Reinforcement Learning algorithms',
            journal: 'Computers & Electrical Engineering',
            year: '2021',
            volume: '92',
            pages: '107117',
            publisher: 'Elsevier BV',
            doi: '10.1016/j.compeleceng.2021.107117',
            issn: '0045-7906'
          }
        
        assert.deepEqual(data, result)  
    })

    it("should process 'formal' DOI", () => {
        let data = parseDOI(replies.formal)
        let result = {
            author: 'Federico A. Galatolo, Mario G. C. A. Cimino, Gigliola Vaglini',
            title: 'Formal Derivation of Mesh Neural Networks with Their Forward-Only Gradient Propagation',
            journal: 'Neural Processing Letters',
            year: '2021',
            volume: '53',
            pages: '1963-1978',
            publisher: 'Springer Science and Business Media LLC',
            doi: '10.1007/s11063-021-10490-1',
            issn: '1370-4621'
          }
        
        assert.deepEqual(data, result)
    })

    it("should process 'using1' DOI", () => {
        let data = parseDOI(replies.using1)
        let result = {
            author: 'Federico A. Galatolo, Mario Giovanni C. A. Cimino, Gigliola Vaglini',
            title: 'Using Stigmergy to Incorporate the Time into Artificial Neural Networks',
            journal: 'Mining Intelligence and Knowledge Exploration',
            year: '2018',
            volume: '',
            pages: '248-258',
            publisher: 'Springer International Publishing',
            doi: '10.1007/978-3-030-05918-7_22',
            issn: '0302-9743'
          }
        
        assert.deepEqual(data, result)
    })

    it("should process 'using2' DOI", () => {
        let data = parseDOI(replies.using2)
        let result = {
            author: 'Federico Galatolo, Mario Cimino, Gigliola Vaglini',
            title: 'Using Stigmergy as a Computational Memory in the Design of Recurrent Neural Networks',
            journal: 'Proceedings of the 8th International Conference on Pattern Recognition Applications and Methods',
            year: '2019',
            volume: '',
            pages: '',
            publisher: 'SCITEPRESS - Science and Technology Publications',
            doi: '10.5220/0007581508300836',
            issn: ''
          }
        
        assert.deepEqual(data, result)
    })
})