const express = require("express");
const fs = require("fs").promises;
const ProductManager = require("./ProductManager"); // Ajusta la ruta según sea necesario

const app = express();
const PORT = 8080;
const filePath = "productos.json"; // Ruta al archivo productos.json

const productManager = new ProductManager(filePath);

// Middleware para manejar el cuerpo de las solicitudes JSON
app.use(express.json());

// Ruta para obtener un producto por su ID
app.get("/products/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const products = await productManager.getProducts();
    const product = products.find((product) => product.id === productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Ruta para obtener los productos con opción de limitar la cantidad
app.get("/products", async (req, res) => {
  try {
    let products = await productManager.getProducts();

    // Verificar si se proporcionó un parámetro de consulta 'limit'
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
      products = products.slice(0, limit);
    }

    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
