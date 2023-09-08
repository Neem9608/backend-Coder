//view.Router
import { Router } from 'express';
const viewsRouter = Router();
import ProductManager from '../productManager.js';
const manager = new ProductManager('./src/products.json');

viewsRouter.get('/', async (req, res) => {
  const products = await manager.getProducts();
  res.render('home', { products });
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
  res.render('realTimeProducts', {});
});

export default viewsRouter;
