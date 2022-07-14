console.log("Desafio N° 1 - Clases");
//Creo el 'class' Usuario
class User {
    constructor(name,subname,books, pets){
        this.name = name;
        this.subname = subname;
        this.books = books;
        this.pets = pets;
    }
    getFullName() {
        return `El nombre del usuario es ${this.name} ${this.subname}.`
    }
    addMascota(pet) {
        this.pets.push(pet)
    }
    countMascotas() {
        return this.pets.length
    }
    addBook(name,author) {
        this.books.push({name:name,author:author})
    }
    getBooksNames() {
        return this.books.map(book => book.name)
    }
}
//Creamos un usuario con 'new'
const user1 = new User('Marcos','Vizio',[{name:'El principito', author:'Antoine de Saint-Exupéry'}],['Milo','Floppy','Tyrion']);
//Usamos lo metodos creados en el 'class'
user1.addMascota('Cacho');
console.log(user1.getFullName());
console.log(`Tienes un total de ${user1.countMascotas()} mascotas.`);
user1.addBook('Harry Potter', 'J. K. Rowling')
console.log(`Tienes estos libros: ${user1.getBooksNames()}.`);