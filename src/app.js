const express = require("express");
const bodyParser = require("body-parser");
const productsRoutes = require("./routes/products.routes");
const cartsRoutes = require("./routes/carts.routes");

const app = express();
const PORT = 8080;

// Middleware para manejar solicitudes JSON
app.use(bodyParser.json());

// Middleware para manejar formularios codificados en URL
app.use(bodyParser.urlencoded({ extended: true }));

// Montar rutas de productos y carritos
app.use("/products", productsRoutes);
app.use("/carts", cartsRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
