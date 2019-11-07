const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/products', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, "connection error: \n"))
db.once('open', console.log.bind(console, 'db connected'))


let product = mongoose.Schema({
    id: Number,
    name: String,
    slogan: String,
    description: String,
    category: String,
    default_price: Number,
})

let photo = mongoose.Schema({
    style_id: Number, 
    thumbnail_url: String,
    url: String
})

let style = mongoose.Schema({
    product_id: Number,
    style_id: Number,
    name: String,
    orginal_price: Number,
    sale_price: Number,
    default: Number,
    skus:{
        XS: Number,
        S: Number,
        M: Number,
        L: Number,
        XL: Number,
        XXL: Number
    }
})


let products = mongoose.model('products', product)

let photos = mongoose.model('photos', photo)

let styles = mongoose.model('styles', style)


// const saveProducts = ()














