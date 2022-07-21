const fs = require('fs');

class Contenedor {
    constructor(archive) {
        this.archive = archive;
    }
    async #readFile(){
        let productos = [];
        let productosJSON;
        try {
            productos = await fs.promises.readFile(this.archive, 'utf-8');
        } catch (error) {
            console.error('No se encontro el archivo')
        }
        if(productos === '') productos = '[]';
        productosJSON = JSON.parse(productos);
        return productosJSON;
    }
    async save(prod) {
        const productosJSON = await this.#readFile();
        const ids = productosJSON.map(prod => prod.id);
        const id = Math.max(...ids) + 1;
        try {
            if (productosJSON.length > 0) {
                await fs.promises.writeFile(this.archive, JSON.stringify({ ...prod, id },...productosJSON,null,2), 'utf8');
                return id;
            } else {
                await fs.promises.writeFile(this.archive, JSON.stringify([{ ...prod, "id": 1}],null,2), 'utf8');
                return 1;
            }
        } catch (error) {
            console.error("No se pudo guardar el archivo");
        }
    }
    async getById(id) {
        const productosJSON = await this.#readFile();
        const productoId = productosJSON.find(prod => prod.id === id);
        if (productoId) {
            console.log(productoId);
            return productoId;
        } else {
            console.log("No se encontro el producto");
            return null;
        }
    }
    async getAll() {
        const productosJSON = await this.#readFile();
        if (productosJSON.length !== []) {
            console.log(productosJSON);
            return productosJSON;
        } else {
            console.log("No hay productos");
            return null;
        }
    }
    async deleteById(id) {
        const productosJSON = await this.#readFile();
        const productoNew = productosJSON.find(prod => prod.id !== id);
        if (productoNew) {
            try {
                await fs.promises.writeFile(this.archive, JSON.stringify([...productosJSON],null,2), "utf-8");
                console.log("Producto eliminado");
            } catch (error) {
                console.error("No se pudo eliminar el producto");
            }
        } else {
            console.log("No se encontro el producto");
        }
    }
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.archive, "[]", "utf-8");
            console.log("Se elimino el archivo");
        } catch (error) {
            console.error("No se pudo eliminar el archivo");
        }
    }
}

module.exports = Contenedor;
