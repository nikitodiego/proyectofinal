import {Router} from 'express';
import Factory from '../daos/factory.js';
import {} from 'dotenv/config'

const producto  = Factory.getInstance().createPersistance();

const productosApiRouter = new Router();

productosApiRouter.get('/',(req,res) =>{
        producto.listAll(res);
})

productosApiRouter.get('/:id',(req,res) =>{
    const { id } = req.params;
    producto.listById(res,id);
})

productosApiRouter.post('/', (req, res) => {
    producto.create(req,res);
});

productosApiRouter.put('/:id',(req,res) =>{
    const { id } = req.params;
    producto.updateById(req,res,id);
})

productosApiRouter.delete('/:id',(req,res) =>{
    const { id } = req.params;
    producto.deleteById(req,res,id);
})

export default productosApiRouter;