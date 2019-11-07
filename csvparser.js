const csv = require('csv-parser')
const fs = require('fs')
const results = [];


fs.createReadStream('./photo_split/xaa')
.pipe(csv())
.on('data', (data) => results.push(data))
.on('end', () => {
    var temp = JSON.stringify(results);
    fs.writeFile('photos.json', temp, () => {
        return true
    })
})