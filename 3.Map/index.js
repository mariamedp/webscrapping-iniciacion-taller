const json = require('./test.json');
const util = require('util');
features = json.features;
var mod = features
 .filter(feature => feature.properties.hasOwnProperty("descripcion"))
 .map(feature => {
  let precio = parseInt(feature.properties.precio.replace(/€\/mes/g , "").replace(/\./g , "")) ;
  let id = parseInt(feature.properties.id);
  feature.properties.precio = precio ;
  feature.properties.precio_medio = 1000;
  feature.properties.OBJECTID = id;
  return feature;
});


console.log(JSON.stringify({
  type: "FeatureCollection",
  features : mod
}));
