const fs = require('fs')

class Contenedor{
    constructor(fileName){
        this.fileName = fileName;
    }
    async save(object){
        try{
            const array = await fs.readFileSync(this.fileName, 'utf-8')
            const parsedArray = JSON.parse(array)
            let existe = false
            for (let i=0;i<parsedArray.length;i++)
                if (parsedArray[i].title == object.title)
                    existe = true
            if (existe == true)
                return 'Este producto ya existe'
                object.id=parsedArray.length + 1
            parsedArray.push(object)
            await fs.writeFileSync(this.fileName, JSON.stringify(parsedArray))
            return object.id;
        }
        catch (err){
            console.log(err)
        }
    }


    async getAll(id){
        const array = await fs.readFileSync(this.fileName, 'utf-8')
        return JSON.parse(array)
    }

    async getById(id){
        const array = await fs.readFileSync(this.fileName, 'utf-8')
        const parsedArray = JSON.parse(array)
        const obj=parsedArray.find(obj => obj.id == id)
        return obj;
    }

    async deleteById(id){
        const array = await fs.readFileSync(this.fileName, 'utf8');
        const parsedArray = JSON.parse(array);
        const obj = parsedArray.find(obj => obj.id == id);
        const index = parsedArray.indexOf(obj);
        parsedArray.splice(index, 1);
        await fs.writeFileSync(this.fileName, JSON.stringify(parsedArray));
    }

    async deleteAll(){
        await fs.writeFileSync(this.fileName, JSON.stringify([]))
    }
}


const productoNuevo = {
    "title": 'Mate',                                                                                                                                 
    "price": 954.74, 
    "thumbnail": "https://cdn0.iconfinder.com/data/icons/drinks-22/512/drink_water_bottle_beverage-34-512.png"
}

const instance = new Contenedor('productos.txt');

const main = async () => {
    const test = await instance.save(productoNuevo);
    console.log(test);
    
    const productos = await instance.getAll();
    productos.forEach(product => console.log(product.title, product.price, product.thumbnail));
    
    const product = await instance.getById(3);
    console.log(product);

    await instance.deleteById(1);
    const productos2 = await instance.getAll();
    productos2.forEach(product => console.log(product.title, product.price));

    // Una vez ejecutado el próximo método, se eliminan todos los productos del archivo.txt
    // await instance.deleteAll();

}

main();