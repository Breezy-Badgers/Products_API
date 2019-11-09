const mongoose = require('mongoose')




mongoose.connect('mongodb://localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true })



const db = mongoose.connection

db.on('error', console.error.bind(console, "connection error: \n"))
db.once('open', console.log.bind(console, 'db connected'))


const photo = mongoose.Schema({
    id: String,
    styleId: String,
    thumbnail_url: String,
    url: String
})

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
})

const relatedId = mongoose.Schema({
    id: String,
    current_product_id: String,
    related_product_id: String
})

const skuss = mongoose.Schema({
    id: Number,
    styleId: Number,
    size: String,
    quantity: Number
})



const photos = mongoose.model('photos', photo)
const features = mongoose.model('features', feature)
const products = mongoose.model('list', list)
const related = mongoose.model('related', relatedId)
const skus = mongoose.model('skus', skuss)


module.exports = {

    savePhotos : (csvArray) => {
    var photosObj = {
        id: csvArray[0],
        styleId: csvArray[1],
        thumbnail_url: csvArray[2],
        url: csvArray[3]
    }
    photos.create(photosObj)
    .then(() => {
        console.log(photosObj)
    })
    .catch((error) => {
        console.log('error in savePhotos at ', photosObj.id)
    })
},


 getProduct : (req) => {
     console.log(req.params.product_id)
    return products.find({id: req.params.product_id})
}

}













