const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filePath, "utf8");
      return JSON.parse(data);
    } catch (err) {
      // Si no se puede leer el archivo o está vacío, devuelve un arreglo vacío
      return [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2));
  }

  addProduct(product) {
    const newId =
      this.products.length > 0
        ? this.products[this.products.length - 1].id + 1
        : 1;
    const newProduct = { id: newId, ...product };
    this.products.push(newProduct);
    this.saveProducts();
  }

  findProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  updateProduct(id, field, value) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index][field] = value;
      this.saveProducts();
      return true;
    }
    return false; // El producto no fue encontrado
  }

  deleteProduct(id) {
    this.products = this.products.filter((product) => product.id !== id);
    this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.findProductById(id);
  }
}

// Ejemplo de uso:
const productManager = new ProductManager("productos.json");

// Agregar un producto
productManager.addProduct({
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 10,
  thumbnail: "url_del_thumbnail_1",
  code: "ABC123",
  stock: 50,
});

// Eliminar un producto por ID
productManager.deleteProduct(1);

// Obtener todos los productos después de la eliminación
const allProducts = productManager.getProducts();
console.log(allProducts);
