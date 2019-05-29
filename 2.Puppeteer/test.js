// let housingData = [];
// let housing = document.querySelectorAll('#main-content > section > article');

// housing.forEach((house) => {
//     let houseJson = {};
//     try {
//         houseJson.descripcion = house.querySelector('#main-content > section > article > div > a').innerText;
//         //houseJson.id = house.querySelector('#main-content > section > article > div > a').getAttribute('adid');; SOn uno misnistros y no puedo pillar el id
//         houseJson.id = house.querySelector('#main-content > section > article > div > a').href.slice(35, -1);;
//         houseJson.precio = house.querySelector('#main-content > section > article > div > div.row.price-row.clearfix > span').innerText;
//         houseJson.habitaciones = house.querySelector('#main-content > section > article > div > span:nth-child(4)').innerText;
//         houseJson.metros = house.querySelector('#main-content > section > article > div > span:nth-child(5)').innerText;
//     } catch (exception) {

//     }
//     housingData.push(houseJson);
// });

// console.log(housingData);


const puppeteer = require('puppeteer');
const fs = require('fs');

let url = 'https://www.idealista.com/alquiler-viviendas/madrid/centro/lavapies-embajadores/';

(async() => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    let data = await page.evaluate(() => {
        let housingData = [];
        let housing = document.querySelectorAll('#main-content > section > article');

        housing.forEach((house) => {
            let houseJson = {};
            try {
                houseJson.descripcion = house.querySelector('#main-content > section > article > div > a').innerText;
                houseJson.id = house.querySelector('#main-content > section > article > div > a').href.slice(35, -1);;
                houseJson.precio = house.querySelector('#main-content > section > article > div > div.row.price-row.clearfix > span').innerText;
                houseJson.habitaciones = house.querySelector('#main-content > section > article > div > span:nth-child(4)').innerText;
                houseJson.metros = house.querySelector('#main-content > section > article > div > span:nth-child(5)').innerText;
            } catch (exception) {
                console.log(exception);
            }
            housingData.push(houseJson);
        });
        return housingData;
    });
    console.log(data);
    fs.writeFile('chiqui.json', JSON.stringify(data), (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });
});




const numPages = await getNumPages(page);

let housingData;
let data;

//Extraemos la información: creamos un bucle que itera cada una de las páginas del navegador.
for (let i = 2; i <= numPages; i++) {
    (housingData === undefined) ? housingData = []: housingData = [...data];
    console.log(housingData);
    data = await page.evaluate((housingData) => {
        let housing = [...document.querySelectorAll('#main-content > section > article')];
        housing.forEach((house) => {
            let houseJson = {};
            try {
                houseJson.descripcion = house.querySelector('#main-content > section > article > div > a').innerText;
                //houseJson.id = house.querySelector('#main-content > section > article > div > a').getAttribute('adid');son uno misnistros y no puedo pillar el id
                houseJson.id = house.querySelector('#main-content > section > article > div > a').href.slice(35, -1);;
                houseJson.precio = house.querySelector('#main-content > section > article > div > div.row.price-row.clearfix > span').innerText;
                houseJson.habitaciones = house.querySelector('#main-content > section > article > div > span:nth-child(4)').innerText;
                houseJson.metros = house.querySelector('#main-content > section > article > div > span:nth-child(5)').innerText;
            } catch (exception) {
                console.log(exception);
            }
            housingData.push(houseJson);
        });
        return housingData;
    }, housingData);
    await page.waitFor(randomWait());
    let pageUrl = url + `pagina-${i}.htm`;
    await page.goto(pageUrl);
    console.log(data);
}