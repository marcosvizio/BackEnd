import express from 'express';
import Contenedor from './Contenedor.js';

const router = express.Router();
const productos = new Contenedor('./tp4/productos.json')


router.get('/api/productos', async (req, res) =>{
    const todosProductos = await productos.getAll();
    res.json(todosProductos)
});

router.get('/api/productos/:id', async (req, res)=> {
    const idReq = req.params.id
    console.log('idReq', idReq)
    const produtoId = await productos.getById(+idReq);
    res.json(produtoId);
})

router.post('/api/productos', async (req, res) => {
    console.log('el req', req.body)
    const productoCreado = await productos.save(req.body);
    if (productoCreado > 0){
        res.json({
            ok: true,
            mensaje: 'El Post se agrego correctamente',
            id: productoCreado
        })
    }else {
        res.json({
            ok: false,
            mensaje: 'El post no se agrego por que el objeto esta vacio',
            error: 'No se pudo enviar el post',
            id: productoCreado
        })
    }
})

router.put('/api/productos/:id', async (req, res) => {
    const productoCreado = await productos.saveById(req.body);
    if (productoCreado > 0){
        res.json({
            ok: true,
            mensaje: 'El Post se edito correctamente',
            id: productoCreado
        })
    }else {
        res.json({
            ok: false,
            mensaje: 'El post no se pudo editar ',
            error: 'producto no encontrado',
            id: productoCreado
        })
    }
})

router.post('/api/productos/:id', async (req, res) => {
    console.log('el req', req.body)
    const productoCreado = await productos.saveById(req.body);
    if (productoCreado > 0){
        res.json({
            ok: true,
            mensaje: 'El Post se edito correctamente',
            id: productoCreado
        })
    }else {
        res.json({
            ok: false,
            mensaje: 'El post no se pudo editar ',
            error: 'producto no encontrado',
            id: productoCreado
        })
    }
})

router.delete('/api/productos/:id', async (req, res) => {
    const productoCreado = await productos.deleteById(req.params.id);
    if (productoCreado > 0){
        res.json({
            ok: true,
            mensaje: 'El Post se agrego correctamente',
            id: productoCreado
        })
    }else {
        res.json({
            ok: false,
            mensaje: 'No se ejecuto el proceso',
            error: 'producto no encontrado',
            id: productoCreado
        })
    }
})

export {router as produtosRouter}