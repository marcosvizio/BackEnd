import express from "express";
import { produtosRouter } from "./productos.js";
import { editarRouter } from "./editar.js";

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(produtosRouter)
app.use(editarRouter)
app.all('/', async (req, res) => {
    res.send(`
    <div style="display:flex; justify-content: center; flex-direction: column;">
                 <h1>Enviar producto</h1>
                 <div>
                    <form action="/api/productos" method="post">
                        <label>nombre: <input type="text" id="title" name="title" require /></label>
                        <label>precio: <input type="text" name="price"></label>
                        <input type="submit" value="Submit">
                    </form>
                </div>
    </div>`)
  });

app.all('*', async (req, res) => {
    res.send('<div style="display:flex; justify-content: center;"><h1>Pagina no encontrada</h1></div>')
  });

const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`escuchando el puerto ${PORT}`);
})



