import {Router} from 'express';
import Factory from '../daos/factory.js';
import {} from 'dotenv/config'

const carrito  = Factory.getInstance().createPersistance();

const carritosApiRouter = new Router();

carritosApiRouter.get('/',(req,res) =>{
        carrito.listAllCarrito(res);
        console.log(req.user);
})

carritosApiRouter.get('/:id',(req,res) =>{
    const { id } = req.params;
    carrito.listByIdCarrito(res,id);
})

carritosApiRouter.post('/', (req, res) => {
    carrito.createCarrito(req,res);
});

carritosApiRouter.post('/:id_carrito/producto/:id_producto', (req, res) => {
    const id_carrito = req.params.id_carrito;
    const id_producto = req.params.id_producto;
    carrito.agregarProdCarrito(req, res, id_carrito, id_producto)
});

carritosApiRouter.delete('/:id_carrito/producto/:id_producto', (req, res) => {
    const id_carrito = req.params.id_carrito;
    const id_producto = req.params.id_producto;
    carrito.borraProdCarrito(req, res, id_carrito, id_producto)
});

carritosApiRouter.get('/:id_carrito/producto/:id_producto', (req, res) => {
    const id_carrito = req.params.id_carrito;
    const id_producto = req.params.id_producto;
    carrito.cantidadProdCarrito(req, res, id_carrito, id_producto)
});

carritosApiRouter.delete('/:id',(req,res) =>{
    const { id } = req.params;
    carrito.deleteByIdCarrito(req,res,id);
})


export default carritosApiRouter;