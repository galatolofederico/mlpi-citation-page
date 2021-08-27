const fs = require("fs")
const jspdf = require("jspdf")

const buildpdf = require("../src/js/buildpdf.js")

buildpdf(jspdf, {
    unipi: fs.readFileSync("./assets/unipi-logo.png", null),
    dii: fs.readFileSync("./assets/dii-logo.png", null),
    mlpi: fs.readFileSync("./assets/mlpi-logo.png", null),
    title: "Generating images from caption and vice versa via CLIP-Guided Generative Latent Space Search",
    authors: "Federico A. Galatolo, Mario G. C. A. Cimino, Gigliola Vaglini",
    bibtex: `@article{improve21,
    author={Federico Galatolo. and Mario Cimino. and Gigliola Vaglini.},
    title={Generating Images from Caption and Vice Versa via CLIP-Guided Generative Latent Space Search},
    booktitle={Proceedings of the International Conference on Image Processing and Vision Engineering - IMPROVE,},
    year={2021},
    pages={166-174},
    publisher={SciTePress},
    organization={INSTICC},
    doi={10.5220/0010503701660174},
    isbn={978-989-758-511-1},
}`
})