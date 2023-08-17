// main.js
const ProductManager = require('./productManager');

const funcionAsync = async () => {
    const productManager = new ProductManager();

    productManager.loadProductsFromFile('products.json');
    console.log('Productos cargados:', productManager.getProducts());

    productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
    productManager.saveProductsToFile('products.json');
    console.log('Productos después de agregar:', productManager.getProducts());

    const productToUpdate = productManager.getProductById(1);
    productManager.updateProduct(1, { title: "Producto modificado" });
    productManager.saveProductsToFile('products.json');
    console.log('Productos después de modificar:', productManager.getProducts());

    productManager.deleteProduct(1);
    productManager.saveProductsToFile('products.json');
    console.log('Productos después de eliminar:', productManager.getProducts());
};

funcionAsync();

