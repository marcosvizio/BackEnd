import fs from 'fs';

class Contenedor {
    constructor (archivo) {
        this.archivo = archivo;
    }
    async #readFile () {
        let productos = [];
        let productosJson;
        try {
            productos = await fs.promises.readFile(this.archivo, 'utf-8');
        } catch (error) {
            console.error('No se encontro el archivo')
        }
        if(productos === '') productos = '[]';
        productosJson = JSON.parse(productos);
        return productosJson;
    }
    async getLenght(){
        const productosJson = await this.#readFile();
        return productosJson.length;
    }
    async save(obj){
        const productosJson = await this.#readFile();
        const ids = productosJson.map(obj => obj.id);
        let id = Math.max(...ids) + 1 ;
        try {
            if(productosJson.length > 0) {
                await fs.promises.writeFile(this.archivo, JSON.stringify([{...obj, id}, ...productosJson], null, 2),'utf8')    
                return id;
            }else {
                await fs.promises.writeFile(this.archivo, JSON.stringify([{...obj, "id": 1}], null, 2) ,'utf8')   
                return 1;
            }
        } catch (error) {
            console.error('El archivo no se pudo grabar')
        }
        

    }
    async getById(id){
        const productosJson = await this.#readFile();
        const productoId = productosJson.find(producto => producto.id === id);
        if(productoId) {
            console.log(productoId)
            return productoId;
        }else {
            console.warn("No hay producto con ese ID")
            return null;
        }
    }
    async getAll(){
        const productosJson = await this.#readFile();
        if(productosJson !== []) {
            console.log(productosJson)
            return productosJson;
        }else {
            console.warn("No hay productos")
            return null;
        }
    }
    async deleteById(id){
        const productosJson = await this.#readFile();
        const productoNuevo = productosJson.filter(producto => producto.id !== id);
        if(productoNuevo) {
            try {
                await fs.promises.writeFile(this.archivo, JSON.stringify([...productoNuevo], null, 2) ,'utf8')                 
                console.log(productoNuevo)
            } catch (error) {
                console.error("Fallo al grabar ", error)                
            }
        }else {
            console.warn("No existe ese Id para borrar")
        }
    }
    async deleteAll(){
        try {
            await fs.promises.writeFile(this.archivo, '[]' ,'utf8')   
        } catch (error) {
            console.error('El archivo no se pudo grabar ', error)

        }
    }
}

export default Contenedor;
