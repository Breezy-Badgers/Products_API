const express = require('express')
const db = require('../db/index.js')
const app = express()
const bodyParser = require('body-parser')
const {handleProduct, handleStyles, handleList, handleRelated} = require('./models.js')



const port = 3001;

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

app.get('/products/list', (req, res) => {
    handleList(req, res)
})
app.get('/products/:product_id',  (req, res) => {
    handleProduct(req, res)
})
app.get('/products/:product_id/styles',  (req, res) => {
    handleStyles(req, res)
})
app.get('/products/:product_id/related',  (req, res) => {
    handleRelated(req, res)
})

app.get('/loaderio-bb1dbb6bc620d071f6e9547bc8250996', (req, res) => {
    res.send('loaderio-bb1dbb6bc620d071f6e9547bc8250996')
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})