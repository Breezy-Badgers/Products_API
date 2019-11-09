const {getProduct} = require('../db/index.js')




module.exports = {
    handleList: (req, res) => {

    },

    handleProduct: (req, res) => {
        getProduct(req)
        .then((product) => {
            console.log('product: ',product)
            res.send(product)
        })
        .catch((error) => {
            console.log('error: ', error)
            res.send(400)
        })

    },

    handleStyles: (req, res) => {

    },

    handleRelated: (req, res) => {
        
    }
}