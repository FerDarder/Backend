const fs = require('fs')

class Contenedor{
    constructor(fileName){
        this.fileName = fileName;
    }
    save(object){
        fs.readFile(this.fileName, 'utf-8', (error,contenido)=>{
            if (error)
                console.log('Ocurrio un error')
            else { 
                let nuevoContenido = JSON.parse(contenido)
                object.id= nuevoContenido.length + 1;
                nuevoContenido.push(object)
                fs.writeFile(this.fileName, JSON.stringify(nuevoContenido), error=>{
                    if (error)
                        console.log('Ocurrio un error')
                    else {
                        return object.id
                    }
                })
            }
        })
    }
    getById(number){
        fs.readFile(this.fileName, 'utf-8', (error,contenido)=>{
            if (error)
                console.log('Ocurrio un error')
            else {
                let nuevoContenido = JSON.parse(contenido)
                let obj = nuevoContenido.find(obj => obj.id == number);
                console.log(obj);
            }
            })
    }
    getAll(){
        fs.readFile(this.fileName, 'utf-8', (error,contenido)=>{
            if (error)
                console.log('Ocurrio un error')
            else 
                console.log(JSON.parse(contenido));
        })
    }
    deleteById(number){
        fs.readFile(this.fileName, 'utf-8', (error,contenido)=>{
            if (error)
                console.log('Ocurrio un error')
            else {
                let nuevoContenido = JSON.parse(contenido)
                const obj = nuevoContenido.find(obj=>obj.id == number)
                const index = nuevoContenido.indexOf(obj)
                nuevoContenido.splice(index, 1)
                fs.writeFile(this.fileName, JSON.stringify(nuevoContenido), error=>{
                    if (error)
                        console.log('Ocurrio un error')
                })
            }
        })
    }
    deleteAll(){
        fs.writeFile(this.fileName, JSON.stringify([]), error=>{
            if (error)
                console.log('Ocurrio un error')
            else 
                console.log('Productos eliminados')
        })
    }
}

const manejador = new Contenedor('./productos.txt');
const productoNuevo = {
    "title": 'Mate',                                                                                                                                 
    "price": 954.74, 
    "thumbnail": "https://cdn0.iconfinder.com/data/icons/drinks-22/512/drink_water_bottle_beverage-34-512.png"
}

// manejador.save(productoNuevo);
// manejador.getById(2)
manejador.getAll()
// manejador.deleteById(4)
// manejador.deleteAll()
