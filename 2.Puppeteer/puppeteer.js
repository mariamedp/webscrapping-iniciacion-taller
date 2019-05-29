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

// Funcion que crea un número aleatorio 
const MIN_WAIT = 20000;
const MAX_WAIT = 50000;
const randomWait = () => {
    return Math.floor(Math.random() * (MAX_WAIT - MIN_WAIT + 1) + MIN_WAIT);
}

let url = 'https://www.idealista.com/alquiler-viviendas/madrid/centro/lavapies-embajadores/';

(async() => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const context = await browser.createIncognitoBrowserContext();
        const page = await context.newPage();

        // Con la siguiente Linea podemos tomar el control de qué se carga y que no
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

        //Determinados el número de ventas totales de nuestra búsqueda
        let numViviendas = await page.evaluate(() => {
            return parseInt(document.querySelector('#main > div > div.listing-top > nav > ul > li.current-level > span.breadcrumb-info').innerText);
        });
        //Determinados el número de viviendas por pagina del navegador
        let pisos = await page.evaluate(() => {
            let articles = [...document.querySelectorAll('#main-content > section > article')];
            return articles.length;
        });
        //Número de páginas de navegador que debemos iterar:
        let numPag = Math.ceil(numViviendas / pisos);


        let pisosData;
        let data;

        //Extraemos la información: creamos un bucle que itera cada una de las páginas del navegador.
        for (let i = 2; i <= numPag; i++) {
            (pisosData === undefined) ? pisosData = []: pisosData = [...data];
            console.log(pisosData);
            data = await page.evaluate((pisosData) => {
                let pisos = [...document.querySelectorAll('#main-content > section > article')];
                pisos.forEach((piso) => {
                    let pisoJson = {};
                    try {
                        pisoJson.descripcion = piso.querySelector('#main-content > section > article > div > a').innerText;
                        //pisoJson.id = piso.querySelector('#main-content > section > article > div > a').getAttribute('adid');son uno misnistros y no puedo pillar el id
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
            await page.waitFor(randomWait());
            let pageUrl = url + `pagina-${i}.htm`;
            await page.goto(pageUrl);
            console.log(data);
        }
        return data;
        fs.writeFile('alquiler-distrito-centro.json', JSON.stringify(data), (err) => {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });
    } catch (error) {
        console.log(error);
    };
})();