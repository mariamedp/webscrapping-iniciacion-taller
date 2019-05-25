//Generacion de capturas de pantalla y archivos .pdf
// const puppeteer = require('puppeteer');

// (async() => {
//     try {
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         await page.goto('http://dotgalicia.com/agenda/');
//         await page.screenshot({ path: 'dotgalicia-agenda.png', fullPage: true });
//         await page.pdf({ path: 'dotgalicia-agenda.pdf', printBackground: true });
//         await browser.close();
//     } catch (error) {
//         console.log(error);
//     }
// })();

// Recogemos los datos de Idelista
const puppeteer = require('puppeteer');
const fs = require('fs');

let url = 'https://www.idealista.com/alquiler-viviendas/madrid/retiro/pacifico/';

(async() => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        let data = await page.evaluate(() => {
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

        });
        //     await console.log(data);
        //     await fs.writeFile('viviendas.json', JSON.stringfy(data), (err) => {
        //         if (err) console.log(err);
        //         console.log("Successfully Written to File.");
        //     });
    } catch (error) {

    }
})();