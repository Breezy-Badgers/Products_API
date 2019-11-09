const csv = require('csv-parser')
const fs = require('fs')
const db = require('./db/index.js')
const results = [];


var letter = 'a'
var headers = ['id', 'styleId', 'url', 'thumbnail_url']
var entry = []

fs.createReadStream(`./photo_split/photos.csv`)
.pipe(csv({mapValues: ({headers,index,value}) => handleValues(value) },['id','styleId','url','thumbnail_url']))
.on('data', (data) => {

})
.on('end', () => {
    console.log('success')
})
.on('error', (error) => {
    console.log('error : ', error)
})

function handleValues(values) {
    
}
