const express = require('express')
const Contenedor = require('./app.js');

const app = express()

const port = process.env.port || 8080

const server = app.listen(port, ()=> {
    console.log(`servidor express escuchando en el puerto ${port}`)})
    .on('error', err => { console.log(err); } );

const productos = new Contenedor('productos.txt');


app.get('/', async (req, res) => {
    await res.send('Cambia la ruta por /productos o /productoRandom');
});

app.get('/productos', async (req, res) => {
    const array = await productos.getAll();
    if(array.length > 0){
        res.send(array);
    }else{
        res.status(500).send('No hay productos');
    }
});

app.get('/productoRandom', async (req, res) => {
    const rp = await productos.getAll();
    const random = Math.floor(Math.random() * rp.length);
    if(rp.length > 0){
        res.send(rp[random]);
    }else {
        res.status(500).send('No se encontraron productos');
    }
});