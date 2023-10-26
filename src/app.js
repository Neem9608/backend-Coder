// app.js
import express from "express";
import ProductRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import viewsRouter from "./routes/view.Router.js";
import handlebars from "express-handlebars";
import ProductManager from "./dao/filesystem/productManager.js";
import { Server } from "socket.io";
import { __dirname } from "./path.js";
import path from "path";
import { Product } from "./dao/models/products.models.js";
import sessionRouter from "./routes/session.routes.js";
import inicializePassport from "./config/passport.config.js";

mongoose.connect(
  "mongodb+srv://nelsonesman:TZ30HT9JjAnMCLfC@cluster0.gjppwzq.mongodb.net/ecommerce?retryWrites=true&w=majority"
);

const pm = new ProductManager("src/products.json");
const app = express();
const sv = app.listen(8080, () => console.log("Servidor Activo"));
sv.on("error", (error) => console.log(error));
const socketSv = new Server(sv);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializePassport();
app.use(passport.initialize());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://nelsonesman:TZ30HT9JjAnMCLfC@cluster0.gjppwzq.mongodb.net/ecommerce?retryWrites=true&w=majority",
      ttl: 15, 
    }),
    secret: "UnaCadenaSecretaMuySegura1234",
    resave: false,
    saveUninitialized: false,
  })
);

// Configurar Handlebars como motor de plantillas
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
    // allowProtoMethodsByDefault: true,
    // allowProtoPropertiesByDefault: true
  })
);
app.use("/viewsRouter", viewsRouter);
app.use("/api/products", ProductRouter);
app.use("/api/carts", cartRouter);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  req.context = { socketSv };
  next();
});

// Ruta para mostrar la lista de todos los productos
app.get("/products", async (req, res) => {
  try {
    // Realiza una consulta a la base de datos para obtener todos los productos
    const products = await Product.find().select(
      "title description price category availability"
    );

    // Renderiza una vista que muestre la lista de productos
    res.render("all-products", { products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
});

// Ruta para mostrar los detalles de un producto por su ID
app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("productDetails", { product });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los detalles del producto");
  }
});

socketSv.on("connection", async (socket) => {
  console.log(`Cliente conectado con el id ${socket.id}`);
  socket.emit("clientConect", await pm.getProducts());
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal en el servidor");
});
