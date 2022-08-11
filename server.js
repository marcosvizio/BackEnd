import express from 'express';
import path from 'path';
import Handlebars from 'express-handlebars'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import Contenedor from './Contenedor.js';
const productos = new Contenedor('./productos.json')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const port = 4000 || process.env.PORT

app.engine(
    'hbs', 
    Handlebars.engine({
        extname: '.hbs', 
        defaultLayout: 'main.hbs' ,          
        layoutsDir: path.join(__dirname, 'views'),
        partialsDir: path.join( __dirname, 'views', 'partials')
    })
)

app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.static('public'))


app.get('/', async (req, res) => {
  res.render('layout/crear.hbs',{
    titulo: "Subir Producto Risk Store",
    producto: false
  })
})


app.get('/productos', async (req, res) => {
    const producto = await productos.getAll();
    const listExist = producto.length > 0;
    res.render('layout/index.hbs', {
        titulo: "Risk Store 2022", 
        list: producto,
        listExist,
        producto: true 
      })
})
app.post('/creador', async (req, res) => {
    const producto = await productos.save(req.body);
    const creado =  producto != -1
    console.log(producto)
    res.render('layout/creadorConfirmar.hbs', {     
      hayProducto: creado,
      titulo: 'Creacion de producto'
    })
 })




app.listen(4000, err => {
    if(err) throw new Error(`Erron on server: ${err}`)
    console.log(`Server is running on port ${port}`)
})




