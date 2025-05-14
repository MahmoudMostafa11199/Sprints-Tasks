'use strict';

//
const nameEl = document.querySelector('[name="name"]');
const priceEl = document.querySelector('[name="price"]');
const categoryEl = document.querySelector('[name="category"]');
//
const editNameEl = document.querySelector('[name="edit-name"]');
const editPriceEl = document.querySelector('[name="new-price"]');
const editCategoryEl = document.querySelector('[name="new-category"]');
//
const deleteNameEl = document.querySelector('[name="delete-name"]');
//
const btnAdd = document.querySelector('.btn-add');
const btnEdit = document.querySelector('.btn-edit');
const btnDelete = document.querySelector('.btn-delete');

const products = [
  { id: 1, name: 'Smart Phone', price: 120, category: 'Electronics' },
  { id: 2, name: 'Laptop', price: 100, category: 'Electronics' },
];

// Parent Class
class Product {
  _parentElement = document.querySelector('.products');
  name;
  price;
  category;

  constructor(name, price, category) {
    this.name = name;
    this.price = price;
    this.category = category;
  }

  static initialRender() {
    if (!products.length) {
      document.querySelector('.no-product').classList.remove('hidden');
    } else {
      products.forEach((p, i) => {
        const prod = new Product(p.name, p.price, p.category);
        prod.render(i + 1);
      });
    }
  }

  render(i) {
    const markup = `
        <tr>
          <td class="product-number">${i ? i : products.length}</td>
          <td>${this.name}</td>
          <td>$${this.price}</td>
          <td>${this.category}</td>
        </tr>
    `;

    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}

class AddProduct extends Product {
  constructor(name, price, category) {
    super(name, price, category);
    this.id = Date.now();
  }

  addProduct() {
    document.querySelector('.no-product').classList.add('hidden');

    const newProduct = {
      id: this.id,
      name: this.name,
      price: this.price,
      category: this.category,
    };

    products.push(newProduct);

    this.render();
  }
}

class EditProduct extends Product {
  constructor(name, price, category) {
    super(name, price, category);
  }

  editProduct() {
    const index = products.findIndex(
      (p) => p.name.toLowerCase() === this.name.toLowerCase()
    );

    if (index !== -1) {
      products[index].price = this.price;
      products[index].category = this.category;

      this._clear();
      Product.initialRender();
    } else {
      alert('Product not found!');
    }
  }
}

class DeleteProduct extends Product {
  constructor(name) {
    super(name);
  }

  deleteProduct() {
    const index = products.findIndex(
      (p) => p.name.toLowerCase() === this.name.toLowerCase()
    );

    if (index !== -1) {
      products.splice(index, 1);

      this._clear();
      Product.initialRender();
    } else {
      alert('Product not found!');
    }
  }
}

////////////////////////////////
// Initial Render Products
Product.initialRender();

/////////////////////////////////////
// Add Product
btnAdd.addEventListener('click', (e) => {
  e.preventDefault();

  if (!nameEl.value || !priceEl.value || !categoryEl.value) return;

  const product = [nameEl.value, priceEl.value, categoryEl.value];
  const productNew = new AddProduct(...product);

  productNew.addProduct();

  document.getElementById('form-add').reset();
});

/////////////////////////////////////
// Edit Product
btnEdit.addEventListener('click', (e) => {
  e.preventDefault();

  if (!editNameEl.value || !editPriceEl.value || !editCategoryEl.value) return;

  const product = [editNameEl.value, editPriceEl.value, editCategoryEl.value];

  const prod = new EditProduct(...product);
  prod.editProduct();

  document.getElementById('form-edit').reset();
});

/////////////////////////////////////
// Edit Product
btnDelete.addEventListener('click', (e) => {
  e.preventDefault();

  if (!deleteNameEl.value) return;

  const prod = new DeleteProduct(deleteNameEl.value);
  prod.deleteProduct();

  document.getElementById('form-delete').reset();
});
