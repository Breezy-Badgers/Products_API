const express = require('express')
const db = require('../db/index.js')
const app = express()
const bodyParser = require('body-parser')
const {handleProduct, handleStyles, handleList, handleRelated} = require('./models.js')



const port = 3000;

app.use(bodyParser.json());

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

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})