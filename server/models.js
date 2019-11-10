const {getProduct, getFeatures, getList, getRelated, getStyles, getSkus, getPhotos} = require('../db/index.js')




module.exports = {
    handleList: async (req, res) => {
        try {
            let list = await getList(req)
            res.send(list)
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
        res.send(obj)
        } catch (error) {
            console.log('error in handleProduct: ', error)
            res.sendStatus(404)
        }
    },

    handleStyles: async (req, res) => {
      try{ let styles = await getStyles(req)
        for(var style of styles){
            console.log('styles: ', style)
            let photos = await getPhotos(style.id)
            let skus = await getSkus(style.id)
            let sizes = {}
            for(var size of skus){
                sizes[size.size] = size.quantity
            }
            style._doc.photos = photos
            style._doc.skus = sizes
        }
        res.send(styles)
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
            res.send(returnObj)
         } catch(error) {
            console.log('error in handleRelated: ', error)
            res.send(500)
         }
    }
}