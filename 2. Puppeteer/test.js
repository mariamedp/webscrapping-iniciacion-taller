let pisosData = [];
let pisos = document.querySelectorAll('#main-content > section > article');

pisos.forEach((piso) => {
    let pisoJson = {};
    try {
        pisoJson.descripcion = piso.querySelector('#main-content > section > article > div > a').innerText;
        //pisoJson.id = piso.querySelector('#main-content > section > article > div > a').getAttribute('adid');; SOn uno misnistros y no puedo pillar el id
        pisoJson.id = piso.querySelector('#main-content > section > article > div > a').href.slice(35, -1);;
        pisoJson.precio = piso.querySelector('#main-content > section > article > div > div.row.price-row.clearfix > span').innerText;
        pisoJson.habitaciones = piso.querySelector('#main-content > section > article > div > span:nth-child(4)').innerText;
        pisoJson.metros = piso.querySelector('#main-content > section > article > div > span:nth-child(5)').innerText;
    } catch (exception) {

    }
    pisosData.push(pisoJson);
});

console.log(pisosData);