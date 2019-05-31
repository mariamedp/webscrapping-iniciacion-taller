// **********  DATOS   ***************** //

import { coordinates } from './dataCoordinates.js';
import { alquileres } from './alquiler-distrito-retiro-pacifico.js';

//Eliminar de nuestro archivo de coordenadas todo aquello que no nos interesa:
const FILTER_COORDS = coordinates.map((obj) => {
    let newObj = {};
    newObj.id = obj.adId;
    newObj.latitude = obj.latitude;
    newObj.longitude = obj.longitude;
    return newObj
});


//Relacionar dos arrays en función de una propiedad de cada uno de los objetos que tiene en común:
const COORDS_BY_ID = FILTER_COORDS.reduce((old, cur, i, arr) => {
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
        let coords = [latitude, longitude];
        return {...a, coords }
    })


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


// **********  MAPA   ***************** //
//Añadir el mapa base:
var map = L.map('map').setView([40.4034295, -3.688168], 13);
L.esri.basemapLayer('Streets').addTo(map);

//Añadir nuestros datos:
// var markers = data.map((marker) => {
//     L.marker(marker.coords).bindPopup(`Descripción: ${marker.descripcion}, Habitaciones: ${marker.habitaciones} `)
// });

// var houses = L.layerGroup(markers);
// L.control.layers(houses).addTo(map);