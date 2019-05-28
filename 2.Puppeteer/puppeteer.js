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

const getData = async() => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const context = await browser.createIncognitoBrowserContext();
        const page = await context.newPage();

        await page.setRequestInterception(true);

        page.on('request', request => {
            // Aquí localizamos el script que cargan anti-bot
            // mirad el contenido del script : https://www.idealista.com/px/client/main.min.js
            if (/main\.min.\js/.test(request.url())) {
                console.log(`Skipping : [${request.url()}]`);
                // Impedimos que se cargue
                request.abort();
            } else {
                request.continue();
            }
        });

        await page.goto(url);
        let numViviendas = await page.evaluate(() => {
            return parseInt(document.querySelector('#main > div > div.listing-top > nav > ul > li.current-level > span.breadcrumb-info').innerText);
        });
        let pisos = await page.evaluate(() => {
            let articles = [...document.querySelectorAll('#main-content > section > article')];
            return articles.length;
        });
        let numPag = Math.ceil(numViviendas / pisos);
        let pisosData;
        let data;


        for (let i = 2; i <= numPag; i++) {
            (pisosData === undefined) ? pisosData = []: pisosData = [...data];
            console.log(pisosData);
            data = await page.evaluate((pisosData) => {
                let pisos = [...document.querySelectorAll('#main-content > section > article')];
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
                        console.log(exception);
                    }
                    pisosData.push(pisoJson);
                });
                return pisosData;
            }, pisosData);
            await page.waitFor(2 * 1000);
            let pageUrl = url + `pagina-${i}.htm`;
            await page.goto(pageUrl);
            console.log(data);
        }
        return data;
        fs.writeFile('viviendas.json', JSON.stringify(data), (err) => {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });
    } catch (error) {
        console.log(error);
    };
}

getData();