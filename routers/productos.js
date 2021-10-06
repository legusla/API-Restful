const express = require('express');

const Contenedor = require('../Contenedor');

const productosContenedor = new Contenedor('./data/productos.json');

const productosRouter = express.Router();

productosRouter.get('/', async (req, res) => {
    const lista = await productosContenedor.getAll();
    res.send({
        message: 'Operación exitosa',
        data: lista
    });
})

productosRouter.get('/:id', async (req, res) => {
    const productoId = req.params.id;
    const producto = req.body;
    const idProducto = await productosContenedor.getById(productoId, producto);

    if (!idProducto) {
        res.send({
            message: 'producto no encontrado',
            data: idProducto
        });
    } else {
        res.send({
            message: 'operación exitosa',
            data: idProducto
        });
    }
});

productosRouter.post('/', async (req, res) => {
    const nuevoProducto = req.body;

    const idProductoGuardado = await productosContenedor.save(nuevoProducto);

    res.send({
        message: 'Operación exitosa',
        data: {
            ...nuevoProducto,
            id: idProductoGuardado
        }
    });
})

productosRouter.put('/:id', async (req, res) => {
    const productoId = req.params.id;
    const producto = req.body;
    const productoActualizado = await productosContenedor.update(productoId, producto);

    if (!productoActualizado) {
        res.send({
            message: 'operación incorrecta',
            data: productoActualizado
        });
    } else {
        res.send({
            message: 'operación exitosa',
            data: productoActualizado
        });
    }
});

productosRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const productos = req.body;
    const deleteID = await productosContenedor.deleteById(id, productos);

    if (!deleteID) {
        res.send({
        message: 'No se pudo borrar',
        data: deleteID  
    });
    } else {
        res.send({
            message: 'Se borro exitosamente',
            data: deleteID      
        });  
    }
    console.log(deleteID);
})

module.exports = productosRouter;

console.log(__dirname);