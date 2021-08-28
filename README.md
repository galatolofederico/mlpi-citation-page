# mlpi-citation-page

WebApp for generating an [MLPI](http://mlpi.ing.unipi.it/)-branded **citation page** like this:

![example](./README.md.d/example.png)

It **just** requires the paper **DOI** and it **automatically** fetches the paper **metadata**.



**The WebApp is available [here](https://galatolofederico.github.io/mlpi-citation-page/)**


## Local Deploy

To deploy it locally you have to clone this repository

```
git clone https://github.com/galatolofederico/mlpi-citation-page.git
cd mlpi-citation-page
```

And install the dependencies

```
npm install
```

To start a local development server run

```
npm start
```

To build the production version run

```
npm run build
```

The builded webapp will be available in `./dist`