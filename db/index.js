const mongoose = require('mongoose')
const config = require('../config.js')



mongoose.connect(`mongodb:${config.key}`, { useNewUrlParser: true, useUnifiedTopology: true })
.catch((error) => {
    console.log(error)
})


const db = mongoose.connection

db.on('error', console.error.bind(console, "connection error: \n"))
db.once('open', console.log.bind(console, 'db connected'))


const photo = mongoose.Schema({
    id: Number,
    styleId: Number,
    thumbnail_url: String,
    url: String
},
{collection: 'photos'})

const list = mongoose.Schema({
    id: Number,
    name:String,
    slogan:String,
    description:String,
    category:String,
    default_price:Number
},
{collection: 'list'})

const feature = mongoose.Schema({
    feature_id:Number,
    product_id:Number,
    feature:String,
    value:String
},
{collection: 'features'})

const relatedId = mongoose.Schema({
    id: Number,
    current_product_id: Number,
    related_product_id: Number
},
{collection: 'related'})

const skuss = mongoose.Schema({
    id: Number,
    styleId: Number,
    size: String,
    quantity: Number
},
{collection: 'skus'})

const style = mongoose.Schema({
    original_price: Number,
    name: String,
    default_style: Number,
    sale_price: Number,
    id: Number,
    productId: Number
},
{collectino: 'styles'})



const photos = mongoose.model('photos', photo)
const features = mongoose.model('features', feature)
const products = mongoose.model('list', list)
const related = mongoose.model('related', relatedId)
const skus = mongoose.model('skus', skuss)
const styles = mongoose.model('styles', style)

module.exports = {

    getProduct : (req) => {
        return products.find({id: req.params.product_id}).exec()
    },

    getFeatures: (req) => {
        return features.find({product_id: req.params.product_id}).exec()
    },

    getList: (req) => {
        var page = req.query.page || 1
        var count = req.query.count || 5
        var startingId = (page * count) - count + 1 || 1
        var endingId = page * count || 5
        return products.find({id: {$gte: startingId, $lte: endingId}}).exec()
    },

    getStyles: (req) => {
        return styles.find({productId: req.params.product_id}).exec()
    },

    getRelated: (req) => {
        return related.find({current_product_id: req.params.product_id}).exec()
    },

    getPhotos: (id) => {
        return photos.find({styleId: id}).exec()
    },

    getSkus: (id) => {
        return skus.find({styleId: id}).exec()
    }

}













