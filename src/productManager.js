// productManager.js
const fs = require('fs');

class ProductManager {
    products;

    constructor() {
        this.products = [];
    }

    loadProductsFromFile(filename) {
        try {
            const data = fs.readFileSync(filename, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
    }

    saveProductsToFile(filename) {
        fs.writeFileSync(filename, JSON.stringify(this.products), 'utf8');
    }

    getProducts() {
        return this.products;
    }

    getId() {
        let data = this.products;
        return data.length + 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const newProduct = new Product(title, description, price, thumbnail, code, stock);

        const repeatCode = this.products.some(e => e.code === newProduct.code);

        if (repeatCode) {
            console.log("El código está repetido");
        } else {
            this.products.push({ ...newProduct, id: this.getId() });
        }
    }

    getProductById(id) {
        let productFind = this.products.find(e => e.id === id);

        if (productFind === undefined) {
            throw new Error("Producto no encontrado");
        } else {
            return productFind;
        }
    }

    updateProduct(id, fields) {
        const productToUpdate = this.getProductById(id);
        if (productToUpdate) {
            for (let field in fields) {
                if (field !== 'id') {
                    productToUpdate[field] = fields[field];
                }
            }
        }
    }

    deleteProduct(id) {
        let i = this.products.findIndex(e => e.id === id);

        if (i !== -1) {
            this.products.splice(i, 1);
        } else {
            throw new Error("Producto no encontrado");
        }
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

module.exports = ProductManager;
