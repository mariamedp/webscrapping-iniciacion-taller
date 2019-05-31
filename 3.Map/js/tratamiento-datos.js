// **********  TRATAMIENTO DE DATOS   ***************** //
const fs = require('fs');
const coordinates = require('../assets/coordenadas-distrito-retiro-pacifico.json')
const alquileres = require('../assets/alquiler-distrito-retiro-pacifico.json')



//Relacionar dos arrays en función de una propiedad de cada uno de los objetos que tiene en común:
const COORDS_BY_ID = coordinates.reduce((old, cur, i, arr) => {
    old[cur.id] = cur;
    return old;
}, {});


const getCoords = (id) => {
    return COORDS_BY_ID.hasOwnProperty(id) ?
        COORDS_BY_ID[id] : { latitude: 0, longitude: 0 }
}

let data = alquileres
    .map(a => {
        let { latitude, longitude } = getCoords(a.id);
        let coords = [longitude, latitude];
        return {...a, coords }
    })

console.log(data);

const fromArrayToGeoJSON = (arr) => {
    const geoJSON = {
        "type": "FeatureCollection",
        "features": []
    };
    const geoJsonFeatures = geoJSON.features;
    arr.map((el) => {
        geoJsonFeatures.push({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": el.coords
            },
            "properties": el
        })
    });
    return geoJSON;
}

console.log(fromArrayToGeoJSON(data));
fs.writeFile('housting-data.geojson', JSON.stringify(data), (err) => {
    if (err) console.log(err);
    console.log("Housting-data: Successfully Written to File.");
});