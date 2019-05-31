// **********  TRATAMIENTO DE DATOS   ***************** //

import { coordinates } from '../assets/coordiantes-distrito-retiro-pacifico.js';
import { alquileres } from '../assets/alquiler-distrito-retiro-pacifico.js/index.js';


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
// var map = L.map('map').setView([40.4034295, -3.688168], 15);
// var geoData = fromArrayToGeoJSON(data);

// copy(console.log(geoData));
// L.esri.basemapLayer('Streets').addTo(map);

// function onEachFeature(feature, layer) {
//     var popupContent = `${feature.properties.descripcion},
//                         Habitaciones: ${feature.properties.habitaciones},
//                         Metros cuadrados: ${feature.properties.metros},
//                         Precio: ${feature.properties.precio},
//                         `
//     layer.bindPopup(popupContent);
// }
// L.geoJSON(geoData, {
//     onEachFeature: onEachFeature
// }).addTo(map);