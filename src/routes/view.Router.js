// view.Router.js
import { Router } from "express";
import ProductManager from "../dao/fs/managers/product.manager.js";
import exphbs from "express-handlebars"; // Cambia el nombre de la importación

const manager = new ProductManager("./src/products.json");
const viewsRouter = Router();

// Configuración de Handlebars para las vistas
const handlebarsOptions = {
  extname: ".handlebars", // Extensión de los archivos de vista
  defaultLayout: "main", // Plantilla principal en la carpeta "layouts"
  layoutsDir: new URL("../views/layouts", import.meta.url).pathname, // Ruta a la carpeta de plantillas principales
  partialsDir: new URL("../views/partials", import.meta.url).pathname, // Ruta a la carpeta de fragmentos
};

// Configura Handlebars usando exphbs
const hbs = exphbs.create(handlebarsOptions);

viewsRouter.get("/", async (req, res) => {
  const products = await manager.getProducts();
  res.render("home", { products });
});

viewsRouter.get("/realtimeProducts", async (req, res) => {
  res.render("realtimeProducts", {});
});

viewsRouter.get("/product/:id", async (req, res) => {
  const productId = req.params.id;
  const productDetails = await manager.getProductsById(productId);

  if (productDetails) {
    res.render("productDetail", { product: productDetails });
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

export default viewsRouter;
