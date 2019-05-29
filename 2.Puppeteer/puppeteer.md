# EJEMPLO DE INICIACION AL WEBSCRAPPING CON PÙPPETEER

El objetivo es obtener o "scrapear" los datos de una búsqueda que hagamos, en este caso, de la paǵina de Idealista.

Para ello utilizaremos *Puppeteer* que es una librearía de 




**¡¡ Al turrón !!**

## Procedimiento:
1. Lo primero que debemos hacer es convertir nuestro proyecto en un proyecto de NodeJS, para ello abrimos la terminal en nuestro proyecto:
```sh
npm init -y
```
Esto nos generará automáticamente el fichero  ```package.json``` donde podremos gestionar todas las dependencias.
El hecho de escribir ```-y``` nos evita tener que contestar o rellenar características del proyecto como el nombre del autor, versión, etc.

2. Instalar ```puppeteer```:
Escribimos en la terminal:
```sh
npm i puppeteer
```
Puppeteer incluye la última versión de **chrome / chromium**, que garantiza que podamos trabajar con Chrome en modo headless. Por lo tanto, que no os extrañe que esta instalación demore un poquito.

3. Creamos el archivo ```puppeteer.js``` donde probaremos escribiremos nuestro código.
```sh
touch puppeteer.js
```

4. Vamos a comprobar que `puppeteer` funciona correctamente haciendo algunos ejemplos sencillos. En este caso, vamos a hacer una captura de pantalla de alguna web que nos guste y, además, generar un archivo .pdf con esto:

```javascript
//Cargamos 'puppeteer'
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();

run();
```

**¡Ahora si que empieza el Rock and roll!**




1. nomenclatura descriptiva (funciones de la ram de los pros);
2. template literal con los selctores
3. rama checkout para los sobraos
4. cats and dogs







