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
  //Inicializar el navegador Chrome
  const browser = await puppeteer.launch(); 
  //Crear una nueva página en el contexto del navegador inicializado
  const page = await browser.newPage();
  //Navegar a una página determinada.
  await page.goto('https://example.com');
  //Genera el screenshot y lo salva el la ruta que le indiquemos
  await page.screenshot({path: 'example.png'});
  //Genera el archivo pdf y lo guarda en la ruta que le indiquemos
  await page.pdf({ path: 'example.pdf'});
  //Cierra el navegador
  await browser.close();
})();
```



**¡Ahora si que empieza el Rock and roll!**

Vamos a hacer un script con el que podamos 


1. nomenclatura descriptiva (funciones de la ram de los pros);
2. template literal con los selctores
3. rama checkout para los sobraos
4. cats and dogs







