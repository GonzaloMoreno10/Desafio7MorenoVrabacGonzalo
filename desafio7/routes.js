const express = require("express");
const route = express.Router();
const fs = require("fs/promises");
let visitas = 0;

//Lee los productos del archivo ./productos.txt y retorna un array de objetos
leerProductos = async () => {
    let array
    try {
        let data = await fs.readFile("./productos.txt", "utf-8");
        if (data) {
            array = data.split("\n")
            for (let i in array) {
                array[i] = JSON.parse(array[i]);
            }
            return array;
        }
    }
    catch (err) {
        console.log(`Error: ${err}`);
    }

};



//Retorna un numero aleatorio menores a el parametro max
numeroAleatorio = (max) => {
    return Math.floor(Math.random() * max);
};


//Retorna un producto aleatorio de productos.txt
productoAleatorio = async () => {
    try {
        let array = await leerProductos();
        if (array) {
            return array[numeroAleatorio(array.length)];
        }
    }
    catch (err) {
        console.log(err)
    }
};


//Ruta /items que devuelve los productos del productos.txt
route.get("/items", async (req, res) => {
    try {
        let productos = await leerProductos();
        if (productos) {
            let obj = {
                items: productos,
                cantidad: productos.length
            }
            res.json(obj);
        }
        else {
            res.send("Ocurrio un problema");
        }
    }
    catch (err) {
        console.log(err)
    }

});


//Ruta /visitas retorna la cantidad de veces que se visita la ruta
route.get("/visitas", (req, res) => {
    visitas += 1;
    res.json(`Visitas: ${visitas}`)
});


//Ruta /item-random retorna un producto aleatorio
route.get("/item-random", async (req, res) => {
    try {
        let producto = await productoAleatorio()
        if (producto) {
            res.json(producto);
        }
        else {
            res.send("Ocurrio un problema");
        }
    }
    catch (err) {
        console.log(`Eror: ${err}`)
    }

});


module.exports = route;