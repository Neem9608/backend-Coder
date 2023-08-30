// cartManager.js
import fs from "fs";

class CartManager {
    constructor(file) {
        this.cart = file || "./carts.json";
    }

    async getCarts() {
        const data = JSON.parse(await fs.promises.readFile(this.cart, "utf-8"));
        return data;
    }

    async addCart(newCart) {
        newCart.id = await this.getId();
        const data = await this.getCarts();
        data.push(newCart);
        await this.writeToFile(data);
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find((cart) => cart.id == id);
    }

    async addProductsToCart(cid, pid, product) {
        try {
            const carts = await this.getCarts();
            const selectedCart = carts[cid - 1];

            if (selectedCart) {
                const cartProducts = selectedCart.products || [];
                const existingProduct = cartProducts.find((prod) => prod.id === pid);

                if (existingProduct) {
                    existingProduct.quantity++;
                } else {
                    cartProducts.push({ ...product, id: pid, quantity: 1 });
                }

                await this.writeToFile(carts);
            } else {
                console.log("Carrito no encontrado");
            }
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
        }
    }

    async writeToFile(data) {
        await fs.promises.writeFile(this.cart, JSON.stringify(data, null, "\t"));
    }

    async getId() {
        const data = await this.getCarts();
        return data.length + 1;
    }
}

export default CartManager;