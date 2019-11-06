const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost')
.on('error' => console.error.bind(console, error))
.once('open', console.log('db connected') )


let product = mongoose.schema({
    id: Number,
    name: String,
    slogan: String,
    description: String,
    category: String,
    default_price: Number,
    info: [{
        product_id: Number,
        feature: String,
        value: String
    }]
})

let photo = mongoose.schema({
    style_id: Number, 
    thumbnail_url: String,
    url: String
})

let style = mongoose.schema({
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














