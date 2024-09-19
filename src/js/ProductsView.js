import Storage from "./Storage.js";

const productTitle = document.getElementById("product-title");
const productQuantity = document.getElementById("product-quantity");
const productCategory = document.getElementById("product-category");

const addNewProductBtn = document.getElementById("add-new-product");
const searchInput = document.getElementById("serch-input");
const selectedSort = document.getElementById("sort-products");

const totalProducts = document.querySelector("#total-products");

class ProductsView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
    this.products = [];
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }
  addNewProduct(e) {
    e.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = productCategory.value;
    if (!title || !quantity || !category) return;
    Storage.saveProducts({ title, quantity, category });
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
    productTitle.value = "";
    productQuantity.value = "";
    productCategory.value = "";
  }
  createProductsList(products) {
    let result = "";
    products.forEach((item) => {
      // item.category => id => <option> value=${categoryItem.id}
      const selectedCategory = Storage.getAllCategories().find(
        (c) => +c.id === +item.category
      );
      result += ` <div class="flex items-center justify-between mb-4">
                            <span class="text-slate-400">${item.title}</span>
                            <div class="flex items-center gap-x-3">
                                <span class="text-slate-400">${new Date(
                                  item.createdAt
                                ).toLocaleDateString("fa-IR")}</span>
                                <span class="block border border-slate-400 text-slate-400 rounded-2xl px-3 py-0.5">${
                                  selectedCategory.title
                                }</span>
                                <span
                                    class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 text-slate-300 border-2 border-slate-300">${
                                      item.quantity
                                    }</span>
                                     <button class="edit-product border border-slate-400 text-slate-400 rounded-2xl py-0.5 px-2" data-product-id=${
                                       item.id
                                     }>edit</i></button>
                                <button class="delete-product border border-red-400 text-red-400 rounded-2xl py-0.5 px-2" data-product-id=${
                                  item.id
                                }>delete</button>
                            </div>
                        </div>`;
    });

    const productsDOM = document.getElementById("products-list");
    productsDOM.innerHTML = result;

    const deleteBtns = document.querySelectorAll(".delete-product");
    deleteBtns.forEach((item) => {
      item.addEventListener("click", (e) => this.deletedProduct(e));
    });

    const editBtns = document.querySelectorAll(".edit-product");
    editBtns.forEach((item) => {
      item.addEventListener("click", (e) => this.editProduct(e));
    });

    this.totalOfProducts();
  }
  searchProducts(e) {
    const value = e.target.value;
    const filterdProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    this.createProductsList(filterdProducts);
  }
  sortProducts(e) {
    const value = e.target.value;
    this.products = Storage.getAllProducts(value);
    this.createProductsList(this.products);
  }
  deletedProduct(e) {
    const productId = e.target.dataset.productId;
    Storage.deleteProduct(productId);
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
  }
  editProduct(e) {
    const productId = e.target.dataset.productId;
    //   Storage.editProduct(productId);
    const product = Storage.getAllProducts().find((p) => p.id === +productId);
    productTitle.value = product.title;
    productQuantity.value = product.quantity;
    productCategory.value = product.category;

    //    console.log(product);
  }
  totalOfProducts() {
    totalProducts.innerText = this.products.length;
  }
}

export default new ProductsView();
