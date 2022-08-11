import express from "express";

import Contenedor from './Contenedor.js';
const productos = new Contenedor('./productos.json')

const app = express()
const port = 4000 || process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static('public'))


app.get('/', (req, res) => {  
  res.render('creador.pug', {
    titulo: "Subir productos Risk Store",
    hayLista: true,
    nav:"creador"})
})

app.post('/creador', async (req, res) => {
    const producto = await productos.save(req.body);
    const creado =  producto != -1
    console.log(producto)
    res.render('creadoConfirmacion.pug', {     
      hayProducto: creado
    })
 })

app.get('/productos', async (req, res) => {
    const producto = await productos.getAll();
    const hayLista = producto.length > 0;
    res.render('index', {
        titulo: "Risk Store 2022", 
        listaProductos: producto,
        hayLista,
        nav:"productos"
      })
})
 
app.listen(4000, err => {
    if(err) throw new Error(`Erron on server: ${err}`)
    console.log(`Server is running on port ${port}`)
})




