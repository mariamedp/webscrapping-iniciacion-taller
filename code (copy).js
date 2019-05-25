let container = document.querySelector("#main-content > section");
let resultados = [...container.querySelectorAll('article')].map(el => [...el.querySelectorAll('div.price-row, span.item-detail')]);
let analisis = [...resultados.map(el => el.map(subel => subel.innerText))];
let seleccion = [...analisis.map(el => el.map(subel => parseInt(subel.replace(".", ""))))];
let seleccionSinPublic = seleccion.filter(el => el.length > 0);
let seleccionPorHabitacion = seleccionSinPublic.filter(el => el[1] === 2);
let seleccionPreciosAlquiler = seleccionPorHabitacion.map(el => el[0]);
let promedioAlquiler = (seleccionPreciosAlquiler.reduce((previous, current) => current += previous)) / seleccionPreciosAlquiler.length;
let test = analisis
    .filter(el => el.length > 0)
    .map(el => Object.assign({}, el));
let testProp = test.map(el => {
    return {
        Precio: el[0],
        Habitaciones: el[1],
        Metros: el[2],
        Planta: el[3],
    }
});
console.log(testProp);


let test = analisis
    .filter(el => el.length > 0)
    .map(el => {
            Object.assign({}, el);
            return {
                Precio: el[0],
                Habitaciones: el[1],
                Metros: el[2],
                Planta: el[3],
            });
        let testProp = test.map(el => {
            return {
                Precio: el[0],
                Habitaciones: el[1],
                Metros: el[2],
                Planta: el[3],
            }
        });