// cart.js
import { Router } from "express";
const cartRouter = Router();
import CartManager from "../cartManager.js";
import ProductManager from "../productManager.js";

const manager = new CartManager("./src/carts.json");
const products = new ProductManager("./src/products.json");

cartRouter.post("/", async (req, res) => {
  await manager.addCart({ id: 0, products: [] });
  res.send("Cart added successfully");
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  const totalProducts = await products.getProducts();
  const productId = totalProducts.find((e) => e.id == pid);
  const newProduct = { id: productId.id, quantity: 1 };
  await manager.addProductsToCart(cid, pid, newProduct);

  res.send("Product added to cart");
});

export default cartRouter;
