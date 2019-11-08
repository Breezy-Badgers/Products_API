const csv = require('csv-parser')
const fs = require('fs')
const db = require('./db/index.js')
const results = [];


var letter = 'a'
var headers = ['id', 'styleId', 'url', 'thumbnail_url']
var entry = []

fs.createReadStream(`./photo_split/photos.csv`)
.pipe(csv({mapValues: ({headers,index,value}) => handleValues(value) },['id','styleId','url','thumbnail_url']))
.on('end', () => {
    console.log('success')
})
.on('error', (error) => {
    console.log('error : ', error)
})

function handleValues(values) {
    if(entry.length === 4){
        console.log(entry)
        db(entry)
        entry = []
    }
    var arrayValues = values.split('\n')
    if(arrayValues.length > 1){
        entry.push(arrayValues[0])
        if(entry.length === 4){
            console.log(entry)
            db(entry)
        }
        entry = arrayValues[1].split(',')
    } else {
        entry.push(arrayValues[0])
    }
}
