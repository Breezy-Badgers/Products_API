const parser = require('csv-parse')
const fs = require('fs')

fs.createReadStream('./photo_split/photos.csv')
.pipe(parser({
    relax_column_count: true,
    from_line:200,
    to_line: 300,
    columns: ['id','styleId','thumbnail_url','url'],
    trim: true,
    relax:true
}))
.on('data', (data) => {
    console.log(data)
})
.on('error', (error) => {
    console.log('error: ', error)
})
