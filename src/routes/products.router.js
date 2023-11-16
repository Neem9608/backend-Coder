import { getBodyProduct } from '../middlewares/products.js';
import { thumbnailsUploader } from '../middlewares/multer.js';
import { productController } from '../controllers/index.js';
import { Router } from 'express';

const router = Router();

router.get('/', productController.getProductsPaginate);

router.get('/:pid', productController.getProductById);

router.post('/', getBodyProduct, productController.addProduct);

router.post(
    '/:pid/thumbnails',
    thumbnailsUploader.array('thumbnails'),
    productController.addThumbnail
);

router.put('/:pid', getBodyProduct, productController.updateProductById);

router.delete('/:pid', productController.deleteProductById);

export default router;


















// products.js
// import express from "express";
// import ProductManager from "../dao/filesystem/managers/productManager.js";
// import { Product } from "../dao/mongo/models/products.models.js";

// const router = express.Router();
// const manager = new ProductManager("./src/products.json");

// // Obtener todos los productos
// router.get("/", async (req, res) => {
//   try {
//     // Consulta la base de datos para obtener todos los productos
//     const products = await Product.find()
//       .select("title description price category availability")
//       .lean();

//     // Renderiza una vista con la lista de productos
//     res.render("all-products", { products });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al obtener productos" });
//   }
// });
// // Obtener productos con paginación
// router.get("/paginated", async (req, res) => {
//   // console.log(products);
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;

//     const totalDocs = await Product.countDocuments();

//     const products = await Product.find()
//       .select("title description price category availability")
//       .limit(limit)
//       .skip((page - 1) * limit);

//     // Calcular total de páginas
//     const totalPages = Math.ceil(totalDocs / limit);

//     // Filtrar y ordenar resultados
//     let filteredProducts = [...products];

//     if (req.query.category) {
//       filteredProducts = filteredProducts.filter(
//         (p) => p.category == req.query.category
//       );
//     }

//     if (req.query.sort === "asc") {
//       filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
//     }

//     if (req.query.sort === "desc") {
//       filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
//     }
//     // Comprobar el tipo de solicitud y responder adecuadamente
//     if (req.accepts("html")) {
//       // Respondemos con una vista HTML
//       res.render("home", {
//         products: filteredProducts,
//         totalPages,
//         currentPage: page,
//       });
//     } else {
//       // Respondemos con JSON
//       res.json({
//         status: "success",
//         data: filteredProducts,
//         totalPages,
//         currentPage: page,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al obtener productos" });
//   }
// });

// // Obtener producto por id
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     res.render("productDetails", { product });

//     if (!product) {
//       return res.status(404).json({ message: "Producto no encontrado" });
//     }

//     res.json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al obtener producto" });
//   }
// });

// // Crear nuevo producto
// router.post("/", async (req, res) => {
//   try {
//     const newProduct = new Product(req.body);
//     await newProduct.save();

//     res.status(201).json(newProduct);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al crear producto" });
//   }
// });

// // Actualizar producto
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ message: "Producto no encontrado" });
//     }

//     res.json(updatedProduct);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al actualizar producto" });
//   }
// });

// // Eliminar producto
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);

//     if (!deletedProduct) {
//       return res.status(404).json({ message: "Producto no encontrado" });
//     }

//     res.sendStatus(204);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al eliminar producto" });
//   }
// });

// export default router;
