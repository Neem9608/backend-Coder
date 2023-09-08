// // app.js
import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import path from 'path';
import ProductManager from './productManager.js';
import ProductRouter from './routes/products.js';
import CartRouter from './routes/cart.js';
import ViewsRouter from './routes/views.Router.js';

const app = express();
const port = 8080;

// Configuración del motor de plantillas Handlebars
app.engine(
  'handlebars',
  handlebars({
    extname: '.handlebars',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Configuración para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Inicialización del servidor HTTP
const server = app.listen(port, () => {
  console.log(`Servidor activo en el puerto ${port}`);
});

// Inicialización del servidor de WebSocket
const io = new Server(server);

// Middleware para adjuntar el objeto 'socketSv' a la solicitud
app.use((req, res, next) => {
  req.context = { socketSv: io };
  next();
});

// Rutas
app.use('/api/products', ProductRouter);
app.use('/api/carts', CartRouter);
app.use('/views', ViewsRouter);

// WebSocket: Manejo de conexiones de clientes
io.on('connection', async (socket) => {
  console.log(`Cliente conectado con el ID ${socket.id}`);
  const productManager = new ProductManager('src/products.json');
  const products = await productManager.getProducts();
  socket.emit('clientConect', products);
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal en el servidor');
});

export default app;
