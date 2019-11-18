const {getProduct, getFeatures, getList, getRelated, getStyles, getSkus, getPhotos} = require('../db/index.js')




module.exports = {
    handleList: async (req, res) => {
        try {
            let list = await getList(req)
            res.status(200).send(list)
        } catch(error){
            console.log('error in handleList: ', error)
            res.sendStatus(404)
        }
    },

    handleProduct: async (req, res) => {
       try {
        let product = await getProduct(req)
        let features = await getFeatures(req)
        let obj = Object.assign({},product[0]._doc)
        obj.features = features
        res.status(201).send(obj)
        } catch (error) {
            console.log('error in handleProduct: ', error)
            res.sendStatus(404)
        }
    },

    handleStyles: async (req, res) => {
      try{
        let styles = await getStyles(req)
        var results = []
        for(var style of styles){
            var sizes = {}
            for(var size of style.skus){
                sizes[size.size] = size.quantity
            }
            let styleObj = {
                style_id: style.style_id,
                name: style.name,
                original_price: style.original_price,
                sale_price: style.sale_price || 0,
                default: style.default,
                photos: style.photos,
                skus: sizes
            }
            results.push(styleObj)
        }
        var returned = {
            product_id: styles[0].productId,
            results: results
        }
        res.status(203).send(returned)
        }catch(error){
            console.log('error in handleStyles', error)
            res.sendStatus(500)
        }
    },

    handleRelated: async (req, res) => {
        try {
            let related = await getRelated(req)
            let returnObj = [];
            for(var obj of related){
                returnObj.push(obj.related_product_id)
            }
            res.status(204).send(returnObj)
         } catch(error) {
            console.log('error in handleRelated: ', error)
            res.send(500)
         }
    }
}