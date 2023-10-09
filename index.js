const { parse } = require('csv-parse');
const fs = require('fs');

function is_planet_herbitable(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

const herbitable_planet = []
fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true
    }))
    .on('data', (data) => {
        if (is_planet_herbitable(data)) {
            herbitable_planet.push(data);
        }
    }).on('end', () => {
        console.log(`number of herbitable planet ${herbitable_planet.length}`);
    }).on('error', (err) => {
        console.log(err);
    });


