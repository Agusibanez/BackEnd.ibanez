class Product {
  // representa un producto individual
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
  //gestiona el grupo de los productos
  constructor() {
    this.products = []; // array que almacena los productos agregados
    this.nextId = 1; // asigna ids a los productos nuevos
  }

  addProduct(title, price, description, thumbnail, stock) {
    //agrega y asigna un id autoincrementable a los nuevos productos
    const product = new Product(
      this.nextId++,
      title,
      price,
      description,
      thumbnail,
      stock
    );
    this.products.push(product);
  }

  removeProduct(id) {
    //elimina productos del array segun su id
    this.products = this.products.filter((product) => product.id !== id);
  }

  getProduct(id) {
    //obtiene un producto del array segun su id, sino devuelve el not found
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      return "Not found";
    }
  }

  getAllProducts() {
    //devuelve todos los productos del array products
    return this.products;
  }
}

// Ejemplo de uso:
const manager = new ProductManager();

// Agregar productos
manager.addProduct("Producto 1", 10);
manager.addProduct("Producto 2", 20);
manager.addProduct("Producto 3", 30);

// Obtener todos los productos
console.log(manager.getAllProducts());

// Obtener un producto por su ID
console.log(manager.getProduct(2)); // Debería devolver el producto con ID 2

// Obtener un producto que no existe
console.log(manager.getProduct(10)); // Debería devolver "Not found"

// Eliminar un producto
manager.removeProduct(1);
console.log(manager.getAllProducts()); // Debería mostrar los productos restantes después de eliminar el producto con ID 1
