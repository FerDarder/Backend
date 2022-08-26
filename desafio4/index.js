const express = require ('express');
const {Router} = express;
const Contenedor = require('./app.js');


const app = express()
const products = new Router()
products.use(express.json())
products.use(express.urlencoded({extended: true}))

const productList = new Contenedor('productos.txt');



products.get('/', async (req, res) => {
    const array = await productList.getAll()
    if(array.length > 0){
        res.send(array);
    }else{
        res.status(500).send('Error. Producto no existe');
    }
})

products.get('/:id',async(req,res)=>{
    const { id }=req.params;
    const pro= await productList.getById(id)
    if (!pro) {
        res.send("Error. Producto no existe").status(400)
    }else
        res.send(pro)
})

products.post('/',async (req,res)=>{
    const newData= {
        "title": req.body.title,
        "price": req.body.price,
        "thumbnail": req.body.thumbnail
    }
    const newProduct = await productList.save(newData);
    res.status(200).send(`Producto ${newProduct.title} con el precio $${newProduct.price} y el thumbnail ${newProduct.thumbnail} agregado exitosamente con ID: ${newProduct.id}`);
    
})

products.put('/:id',async (req,res)=>{
    const {id}=req.params;
    const newData = req.body
    const product = await productList.updateById(id, newData);
    if (product != undefined)
        res.status(200).send(`El producto con ID: ${id} fue actualizado`);
    else 
        res.status(400).send(`No se encontro el producto`);
})

products.delete('/:id', async(req,res)=>{
    const { id }=req.params;
    const product = await productList.deleteById(id);
    if (product != undefined)
        res.status(200).send(`El producto con ID ${id} fue eliminado`);
    else
        res.status(400).send(`No se encontro el producto`);
})
    
app.use(express.static('public'))
app.use('/api/productos', products)

const port = 8080 
const server = app.listen(port, () => {
    console.log(`Server running on port ${server.address().port}`);
})

