// app-js
const express = require('express')
const ProductManager = require("./productManager.js");
const manager = new ProductManager();
const app = express();
// Cargar los productos desde el archivo JSON
manager.loadProductsFromFile("./src/products.json");



app.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit, 10); // Obtener el límite de la query, si está presente

    const Products = await manager.getProducts();
    
    if (limit && !isNaN(limit)) {
        res.json(Products.slice(0, limit)); // Devolver solo los primeros 'limit' productos
    } else {
        res.json(Products);
    }
});

app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = manager.findProductById(productId);

    if (!product) {
        res.status(404).json({ error: "Producto no encontrado" });
    } else {
        res.json(product);
    }
});


// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal en el servidor');
  });
  
  const sv = app.listen(8080, () => console.log("server activo"));
  sv.on('error', error => console.log(error));