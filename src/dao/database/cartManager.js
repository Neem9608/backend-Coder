 // cartManager.js
import { cartModel } from "../models/carts.model.js";

export default class cartManager{
    async getAllCarts(){
    const carts = await cartModel.find().lean()
    return carts
   }
   async addCart(cart){
   const newCart  = await cartModel.create(cart)
    return newCart.id 

    
}

async getCartById (id) {
    const cartFind = await cartModel.find({_id:id})
    return cartFind
    
}


async addProductsToCart(cid, pid , product){
    try {
        const carts = await this.getAllCarts();
        const selectedCart = carts[cid]

        if (selectedCart) {
            const cartProducts = selectedCart.products || [];
            const existingProduct = cartProducts.find(prod => prod.id === pid);

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cartProducts.push({ ...product, id: pid, quantity: 1 });
            }
            selectedCart.products = cartProducts;
            await selectedCart.save();

           
        } else {
            console.log("Cart not found");
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
    }
}
}

