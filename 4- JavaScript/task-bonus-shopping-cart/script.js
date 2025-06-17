'use strict';

////////////////////////////////////////////////////////
//
const shoppingCartContainer = document.querySelector('.shopping-cart');
//
const nameEl = document.getElementById('name');
const priceEl = document.getElementById('price');
const quantityEl = document.getElementById('quantity');
const btnAdd = document.querySelector('.btn-add');
//
const deleteNameEl = document.getElementById('delete-name');
const btnDelete = document.querySelector('.btn-delete');

////////////////////////////////////////////////////////
const shoppingCartList = [
  {
    id: Date.now(),
    name: 'Water Bottle',
    price: 5,
    quantity: 3,
  },
];

////////////////////////////////////////////////////////
// UI Helpers
////////////////////////////////////////////////////////
const displayItem = (item, i) => {
  const { id, name, price, quantity } = item;
  const totalPrice = price * quantity;

  const markup = `
        <tr data-id="${id}">
          <td class="item-number">${i ? i : shoppingCartList.length}</td>
          <td class="item-name">${name}</td>
          <td class="item-price">$${price.toFixed(2)}</td>
          <td class="item-quantity">${quantity}</td>
          <td class="item-total-price">$${totalPrice.toFixed(2)}</td>
        </tr>
  `;

  shoppingCartContainer.insertAdjacentHTML('beforeend', markup);
};

//
const updateQuantity = (item) => {
  const itemEl = document.querySelector(`[data-id="${item.id}"]`);

  const quantityEl = itemEl.querySelector('.item-quantity');
  const totalPriceEl = itemEl.querySelector('.item-total-price');

  quantityEl.textContent = item.quantity;
  totalPriceEl.textContent = `$${(item.quantity * item.price).toFixed(2)}`;
};

//
const isNoItems = () => {
  if (!shoppingCartList.length)
    document.querySelector('.no-product').classList.remove('hidden');
  else document.querySelector('.no-product').classList.add('hidden');
};

////////////////////////////////////////////////////////
// Add Item to Shopping cart
////////////////////////////////////////////////////////
const addItem = (e) => {
  e.preventDefault();

  const itemName = nameEl.value.trim();
  const itemPrice = +priceEl.value.trim();
  const itemQuantity = +quantityEl.value.trim();

  if (!itemName || !itemPrice || !itemQuantity) return;

  const index = shoppingCartList.findIndex(
    (item) => item.name.toLowerCase() == itemName.toLowerCase()
  );

  if (index !== -1) {
    shoppingCartList[index].quantity += itemQuantity;
    updateQuantity(shoppingCartList[index]);
  } else {
    const newItem = {
      id: Date.now(),
      name: itemName,
      price: itemPrice,
      quantity: itemQuantity,
    };

    shoppingCartList.push(newItem);
    isNoItems();
    displayItem(newItem);
  }

  document.getElementById('form-add').reset();
};

////////////////////////////////////////////////////////
// Remove Item from Shopping cart by name
////////////////////////////////////////////////////////
const removeItem = (e) => {
  e.preventDefault();

  const deleteName = deleteNameEl.value.trim();

  if (!deleteName) return;

  const index = shoppingCartList.findIndex(
    (item) => item.name.toLowerCase() == deleteName.toLowerCase()
  );

  if (index !== -1)
    if (shoppingCartList[index].quantity !== 1) {
      shoppingCartList[index].quantity--;
      updateQuantity(shoppingCartList[index]);
    } else {
      document
        .querySelector(`[data-id="${shoppingCartList[index].id}"]`)
        .remove();
      shoppingCartList.splice(index, 1);
      isNoItems();
    }

  document.getElementById('form-delete').reset();
};

////////////////////////////////////////////////////////
// DOM Event Listener
////////////////////////////////////////////////////////
btnAdd.addEventListener('click', addItem);

btnDelete.addEventListener('click', removeItem);

////////////////////////////////////////////////////////
// Init
////////////////////////////////////////////////////////
const initRender = () => {
  isNoItems();
  shoppingCartList.forEach(displayItem);
};

(() => {
  initRender();
})();

// addItem({ name: 'Milk', price: 5, quantity: 1 });
// addItem({ name: 'Milk', price: 5, quantity: 1 });
// addItem({ name: 'Yogurt', price: 10, quantity: 1 });
// addItem({ name: 'Yogurt', price: 10, quantity: 1 });
// addItem({ name: 'Yogurt', price: 10, quantity: 1 });

// printReceipt();

// removeItem('Milk');
// removeItem('Yogurt');

// printReceipt();
