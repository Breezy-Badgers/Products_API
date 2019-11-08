const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/products', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, "connection error: \n"))
db.once('open', console.log.bind(console, 'db connected'))


let photo = mongoose.Schema({
    id: String,
    styleId: String,
    thumbnail_url: String,
    url: String
})





let photos = mongoose.model('photos', photo)


const savePhotos = (csvArray) => {
    var photosObj = {
        id: csvArray[0],
        styleId: csvArray[1],
        thumbnail_url: csvArray[2],
        url: csvArray[3]
    }
    photos.create(photosObj)
    .then(() => {
        console.log(photosObj.id)
    })
    .catch((error) => {
        console.log('error in savePhotos at ', photosObj.id)
    })
}

module.exports = savePhotos














