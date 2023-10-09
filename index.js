const { parse } = require('csv-parse');
const fs = require('fs');

const csv_data = []
fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true
    }))
    .on('data', (data) => {
        csv_data.push(data);
    }).on('end', () => {
        console.log('done');
    }).on('error', (err) => {
        console.log(err);
    });


