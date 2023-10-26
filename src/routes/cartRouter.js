// carts.js
import { Router } from "express";
const cartRouter = Router();
import cartManager from "../dao/database/cartManager.js";
const manager = new cartManager();
import ProductManager from "../dao/filesystem/productManager.js";
const products = new ProductManager("./src/products.json");

cartRouter.get("/", async (req, res) => {
  const AllCarts = await manager.getAllCarts();
  res.send(AllCarts);
});

cartRouter.post("/", async (req, res) => {
  try {
    const cart = new Cart();
    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error al crear carrito" });
  }
});

cartRouter.put('/:cid/products/:pid', async (req, res) => {

  try {

    const cart = await Cart.findById(req.params.cid);
    const product = await Product.findById(req.params.pid);

    const itemIndex = cart.products.findIndex(p => p.product._id.equals(product._id));

    if (itemIndex > -1) {
      // producto existe, actualiza cantidad
      cart.products[itemIndex].quantity += req.body.quantity;
    } else {
      // nuevo producto, agregar al array
      cart.products.push({
        product,
        quantity: req.body.quantity
      });
    }

    // recalcula totales
    cart.totals.quantity += req.body.quantity;
    cart.totals.total += product.price * req.body.quantity;

    await cart.save();

    res.status(200).json(cart);

  } catch (error) {

    res.status(500).json({message: 'Error al agregar al carrito'});
  
  }

});

cartRouter.get("/:cid", async (req, res) => {
  let id = req.params.cid;
  let cartId = await manager.getCartById(id);
  !cartId ? res.send("ID not found") : res.send(cartId.products);
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;
  let totalProducts = await products.getProducts();
  let productId = totalProducts.find((e) => e.id == pid);
  let newProduct = { id: productId.id, quantity: 1 };
  await manager.addProductsToCart(cid, pid, newProduct);

  res.send("Product added to cart");
});
export default cartRouter;
