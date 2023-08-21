// productManager.js
const fs = require("fs");

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

class ProductManager {
  constructor() {
    this.products = [];
  }

  loadProductsFromFile(filename) {
    const data = fs.readFileSync(filename, "utf8");
    this.products = JSON.parse(data);
  }

  saveProductsToFile(filename) {
    fs.writeFileSync(
      filename,
      JSON.stringify(this.products, null, "\t"),
      "utf8"
    );
  }

  getProducts() {
    return this.products;
  }

  findProductById(id) {
    if (typeof id !== "number") {
      throw new Error("Invalid id");
    }

    return this.products.find((p) => p.id === id);
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !price) {
      throw new Error("Title and price are required");
    }

    const product = new Product(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );
    product.id = this.products.length + 1;
    this.products.push(product);

    return product;
  }
}

module.exports = ProductManager;
