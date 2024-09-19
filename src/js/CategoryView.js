import Storage from "./Storage.js";

const categoryTitle = document.getElementById("category-title");
const categoryDesc = document.getElementById("category-desc");
const addNewCategoryBtn = document.getElementById("add-new-category");
const cancelCategoryBtn = document.getElementById("cancel-category");

const toggleCategoryForm = document.getElementById("toggle-add-category");
const categoryForm = document.getElementById("category-wrapper");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    toggleCategoryForm.addEventListener("click", (e) =>
      this.showCategoryForm(e)
    );
    cancelCategoryBtn.addEventListener("click", (e) =>
      this.closeCategoryForm(e)
    );

    this.categories = [];
  }
  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDesc.value;
    if (!title || !description) return;
    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategories();
    this.createCategoriesList();
    categoryTitle.value = "";
    categoryDesc.value = "";
    this.closeCategoryForm(e);
  }
  setApp() {
    this.categories = Storage.getAllCategories();
  }
  createCategoriesList(categories) {
    let result = `<option class="bg-slate-500 text-slate-300" value="">select a category</option>`;
    this.categories.forEach((categoryItem) => {
      result += `<option class="bg-slate-500 text-slate-300" value=${categoryItem.id}>${categoryItem.title}</option>`;
    });
    const categoriesDOM = document.getElementById("product-category");
    categoriesDOM.innerHTML = result;
  }
  showCategoryForm(e) {
    e.preventDefault();
    categoryForm.classList.remove("hidden");
    toggleCategoryForm.classList.add("hidden");
  }
  closeCategoryForm(e) {
    e.preventDefault();
    categoryForm.classList.add("hidden");
    toggleCategoryForm.classList.remove("hidden");
  }
}

// to another madules don't need a new instance of CategoryView class
// export new instance of CategoryView class
export default new CategoryView();
