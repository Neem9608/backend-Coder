// productManager.js
import fs from "fs";

class ProductManager {
  constructor(file) {
    this.path = file;
  }

  async getProducts() {
    const data = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    return data;
  }

  async getId() {
    const data = await this.getProducts();
    return data.length + 1;
  }

  async addProduct(newProduct) {
    try {
      if (!fs.existsSync(this.path)) {
        const emptyList = [];
        emptyList.push({ ...newProduct, id: await this.getId() });

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(emptyList, null, "\t")
        );
      } else {
        const data = await this.getProducts();
        const repeatCode = data.some((e) => e.code === newProduct.code);

        if (repeatCode) {
          console.log("El código está repetido");
        } else {
          data.push({ ...newProduct, id: await this.getId() });
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(data, null, "\t")
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getProductsById(id) {
    const data = await this.getProducts();
    const productFind = data.find((e) => e.id == id);
    return productFind || "Not found";
  }

  async deleteProduct(id) {
    const data = await this.getProducts();
    const i = data.findIndex((e) => e.id === id);

    if (i !== -1) {
      data.splice(i, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(data));
    }
  }

  async updateProducts(id, product) {
    const data = await this.getProducts();
    const i = data.findIndex((e) => e.id === id);

    if (i !== -1) {
      product.id = id;
      data.splice(i, 1, product);
      await fs.promises.writeFile(this.path, JSON.stringify(data));
    }
  }
}

export default ProductManager;