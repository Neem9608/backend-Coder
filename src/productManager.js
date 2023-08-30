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

    async addProduct(newProduct) {
        try {
            const data = await this.getProducts();
            const repeatCode = data.some((e) => e.code === newProduct.code);

            if (repeatCode) {
                console.log("El código está repetido");
            } else {
                const id = await this.getId();
                data.push({ ...newProduct, id });
                await this.writeToFile(data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async getProductsById(id) {
        const data = await this.getProducts();
        return data.find((e) => e.id == id);
    }

    async deleteProduct(id) {
        const data = await this.getProducts();
        const updatedData = data.filter((e) => e.id !== id);
        await this.writeToFile(updatedData);
    }

    async updateProducts(id, product) {
        const data = await this.getProducts();
        const index = data.findIndex((e) => e.id === id);

        if (index !== -1) {
            product.id = id;
            data.splice(index, 1, product);
            await this.writeToFile(data);
        }
    }

    async writeToFile(data) {
        await fs.promises.writeFile(this.path, JSON.stringify(data, null, "\t"));
    }

    async getId() {
        const data = await this.getProducts();
        return data.length + 1;
    }
}

export default ProductManager;