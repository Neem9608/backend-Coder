// app.js
import express from 'express';
import ProductRouter from './routes/products.js'; 
import CartRouter from './routes/cart.js'; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Algo salió mal en el servidor" });
});

const sv = app.listen(8080, () => console.log("Servidor activo en puerto 8080"));
sv.on('error', error => console.log(error));