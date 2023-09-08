
// productManager.js
import fs from 'fs';

class ProductManager {
  constructor(file) {
    this.path = file;
  }

  async getProducts() {
    try {
      const data = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
      return data;
    } catch (error) {
      console.error('Error reading products data:', error);
      return [];
    }
  }

  async getId() {
    const data = await this.getProducts();
    return data.length + 1;
  }

  async addProduct(newProduct) {
    try {
      if (!fs.existsSync(this.path)) {
        const emptyList = [{ ...newProduct, id: await this.getId() }];
        await fs.promises.writeFile(this.path, JSON.stringify(emptyList, null, '\t'));
      } else {
        const data = await this.getProducts();
        const repeatCode = data.some((product) => product.code === newProduct.code);
        if (repeatCode) {
          console.log('El código está repetido');
        } else {
          data.push({ ...newProduct, id: await this.getId() });
          await fs.promises.writeFile(this.path, JSON.stringify(data, null, '\t'));
        }
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }

  async getProductsById(id) {
    const data = await this.getProducts();
    const productFind = data.find((product) => product.id == id);
    if (!productFind) {
      console.log('Product not found');
      return null;
    }
    return productFind;
  }

  async deleteProduct(id) {
    const data = await this.getProducts();
    const i = data.findIndex((product) => product.id === id);
    if (i !== -1) {
      data.splice(i, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(data, null, '\t'));
    }
  }

  async updateProducts(id, product) {
    const data = await this.getProducts();
    const i = data.findIndex((p) => p.id === id);
    if (i !== -1) {
      product.id = id;
      data.splice(i, 1, product);
      await fs.promises.writeFile(this.path, JSON.stringify(data, null, '\t'));
    }
  }
}

export default ProductManager;
