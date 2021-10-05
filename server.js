const express = require('express');

const productosRouter = require('./routers/productos');

const server = express();

const PORT = 8080;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/static', express.static('public'));

server.use(function (req, res, next) {
    console.log('Hora:', Date.now());
    next();
});

const middleware1 = (req, res, next) => {
    console.log('middleware1');
    next();
}

server.get('/', middleware1, (req, res) => {
    console.log('ok');
    res.send({ message: new Date().toLocaleString()});
})

server.use('/api/productos', productosRouter);

server.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Algo salio mal!');
});

server.listen(PORT, () => console.log(`Servidor corriendo en : ${PORT}`));

server.on('error', (error) => console.log('Error: ', error));

console.log(__dirname);