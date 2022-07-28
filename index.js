import Contenedor from './Contenedor.js';
import express from 'express'

const negocio  = new Contenedor('./productos.txt');

const app = express()
const port = 8080

app.get('/productos', async (req, res) => {
    const productosTotales = await negocio.getAll() ;
    res.send(productosTotales)
})
app.get('/productosRandom', async (req, res) => {
    const cantidad = await negocio.getLenght();
    const random =  Math.floor(Math.random() * cantidad ) + 1 ;
    const productoRamdom = await negocio.getById(random);
    res.send(productoRamdom);
  })

app.listen(port, () => {
  console.log(`Se esta escuchando en el port: ${port}`)
})