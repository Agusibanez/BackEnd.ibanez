class Product {
  constructor(id, title, price, description, thumbnail, stock) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.stock = stock;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1; // Inicializamos el contador de ID
  }

  addProduct(title, price, description, thumbnail, stock) {
    const product = new Product(
      this.nextId++,
      title,
      price,
      description,
      thumbnail,
      stock
    ); // Utilizamos this.nextId y luego lo incrementamos
    this.products.push(product);
  }

  removeProduct(id) {
    this.products = this.products.filter((product) => product.id !== id);
  }

  getProduct(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      return "Not found";
    }
  }

  getAllProducts() {
    return this.products;
  }
}

// Ejemplo de uso:
const manager = new ProductManager();

// Agregar productos
manager.addProduct("Producto 1", 10);
manager.addProduct("Producto 2", 20);
manager.addProduct("Producto 3", 30);

// Obtener un producto existente
console.log(manager.getProduct(2));

// Obtener un producto que no existe
console.log(manager.getProduct(10)); // Debería devolver "Not found"
