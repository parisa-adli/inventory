const categories = [
  {
    id: 1,
    title: "frontend",
    description: "frontend category",
    createdAt: "2024-07-18T10:14:49.812Z",
  },
  {
    id: 2,
    title: "backend",
    description: "backend category",
    createdAt: "2024-08-18T10:14:49.812Z",
  },
];

const products = [
  {
    id: 1,
    title: "React.js",
    category: "frontend",
    createdAt: "2024-06-10T10:14:49.812Z",
  },
  {
    id: 2,
    title: "Node.js",
    category: "backend",
    createdAt: "2024-06-18T11:14:49.812Z",
  },
  {
    id: 3,
    title: "Next.js",
    category: "frontend",
    createdAt: "2024-06-18T12:14:49.812Z",
  },
];

export default class Storage {
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];
    const sortedCategories = savedCategories.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return sortedCategories;
  }
  static saveCategory(categoryToSave) {
    const savedCategories = Storage.getAllCategories();
    const existedItem = savedCategories.find((c) => c.id === categoryToSave.id);

    if (existedItem) {
      existedItem.title = categoryToSave.title;
      existedItem.description = categoryToSave.description;
    } else {
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      savedCategories.push(categoryToSave);
    }

    localStorage.setItem("category", JSON.stringify(savedCategories));
  }
  static getAllProducts(sort = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    return savedProducts.sort((a, b) => {
      if (sort === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      else if (sort === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }
  static saveProducts(productToSave) {
    const savedProducts = Storage.getAllProducts();
    const existedItem = savedProducts.find((p) => p.id === productToSave.id);

    if (productToSave.quantity < 1) return alert("quantity is invalid!");
    if (existedItem) {
      existedItem.title = productToSave.title;
      existedItem.quantity = productToSave.quantity;
      existedItem.category = productToSave.category;
    } else {
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();
      savedProducts.push(productToSave);
    }

    localStorage.setItem("products", JSON.stringify(savedProducts));
  }
  static deleteProduct(id) {
    const savedProducts = Storage.getAllProducts();
    const filteredProducts = savedProducts.filter((p) => p.id !== +id);
    localStorage.setItem("products", JSON.stringify(filteredProducts));
  }
    static editProduct(id) {
    const savedProducts = Storage.getAllProducts();
    const filteredProduct = savedProducts.filter((p) => p.id === +id);
      console.log(filteredProduct);
  }
}
