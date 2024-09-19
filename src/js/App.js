import CategoryView from "./CategoryView.js";
import ProductsView from "./ProductsView.js";

document.addEventListener("DOMContentLoaded", () => {
  CategoryView.setApp();
  CategoryView.createCategoriesList();
  ProductsView.setApp();
  ProductsView.createProductsList(ProductsView.products);
});
