const Contenedor = require('./Contenedor');

const contenedor = new Contenedor('./data/productos.json');

contenedor.save({
    title: 'casa'
});