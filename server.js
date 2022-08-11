import express from "express";

import Contenedor from './Contenedor.js';
const productos = new Contenedor('./productos.json')

const app = express()
const port = 4000 || process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.static('public'))




app.get('/', (req, res) => {  
  res.render('pages/creador.ejs', {
    titulo: "Subir productos Risk Store",
    nav:"creador"})
})

app.post('/creador', async (req, res) => {
    const producto = await productos.save(req.body);
    const creado =  producto != -1
    console.log(producto)
    res.render('pages/creadorConfirmar.ejs', {     
      hayProducto: creado,
      titulo: 'Creacion de producto'
    })
 })

app.get('/productos', async (req, res) => {
    const producto = await productos.getAll();
    const hayLista = producto.length > 0;
    res.render('pages/productos.ejs', {
        titulo: "Risk Store", 
        listaProductos: producto,
        hayLista,
        nav:"productos"
      })
})
 
app.listen(4000, err => {
    if(err) throw new Error(`Erron on server: ${err}`)
    console.log(`Server is running on port ${port}`)
})




