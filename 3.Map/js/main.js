// //PARA TRAERNOS LOS DATOS//

// // Primera opcion con funciones de async-await;
// //Definimos url
// const urlData = './data/alquiler-distrito-retiro-pacifico.json';
// const urlCoordinates = './data/dataCoordinates.json';
// //Nos traemos los datos de nuestro .json sobre datos de viviendas.
// const getData = async() => {
//         let responseData = await fetch(urlData);
//         let houstingData = await responseData.json()
//         return houstingData
//     }
//     //Nos traemos los datos de nuestro .json sobre datos de coordenadas.
// const getCoordinates = async() => {
//     let responseCoordinates = await fetch(urlCoordinates);
//     let coordinatesData = await responseCoordinates.json();
//     return coordinatesData;
// }


// Segunda opcion en crear modulos de .js
//Definimos url

import { coordinates } from './dataCoordinates.js';
import { alquileres } from './alquiler-distrito-retiro-pacifico.js';


const COORDS_BY_ID = coordinates.reduce((old, cur, i, arr) => {
    old[cur.id] = cur;
    return old;
}, {});

const getCoords = (id) => {
    COORDS_BY_ID.hasOwnProperty(id) ?
        COORDS_BY_ID[id] : { latitude: 0, longitude: 0 }
}

console.log(alquileres);
// var lista = alquileres
//     .map(a => {
//         let { latitude, longitude } = getCoords(a.id);
//         return {...a, lat: latitude, lon: longitude }
//     })


//console.log(lista);






//Función para eliminar los propiedades del JSON que no nos interesan
const filterData = (coordinatesData) => {
    let filtered = coordinatesData.map((obj) => {
        let newObj = {};
        newObj.id = obj.adId;
        newObj.latitude = obj.latitude;
        newObj.longitude = obj.longitude;
        return newObj
    });
    return filtered;
}

const getInfo = async() => {
    let viviendas = await getData();
    let coordinates = await getCoordinates();
    let coordinatesFiltered = filterData(coordinates);
    let info = viviendas
        .concat(coordinatesFiltered)
        .map((el) => {
            el = Object.assign(el, el);
        })
        // .filter((el, i, self) => el)
        // .filter((el, i, self) => (
        //     self.findIndex($el => $el.id === el.id) === i
        // ));
        //return `${viviendas[0].id} es igual a ${coordinatesFiltered[0].id}`
        //return info;
    console.log(viviendas);
    return coordinatesFiltered;

}
getInfo()
    .then(mensaje => console.log(mensaje))
    .catch(e => console.log(e));









var map = L.map('map').setView([40.4034295, -3.688168], 13);

L.esri.basemapLayer('Streets').addTo(map);