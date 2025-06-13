'use strict';

////////////////////////////////////////////////////////
const items = [
  {
    name: 'Water Bottle',
    price: 5,
    quantity: 3,
  },
];

////////////////////////////////////////////////////////
// Print Receipts
////////////////////////////////////////////////////////
const printReceipt = () => {
  let result = 'Receipt:\n';

  items.forEach(({ name, price, quantity }) => {
    result += `${name} x ${quantity} = ${price * quantity}\n`;
  });

  result += `------------------------------\nTotal: ${items.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  )}`;

  console.log(result);
};

////////////////////////////////////////////////////////
// Add Item to Shopping cart
////////////////////////////////////////////////////////
const addItem = ({ name, price, quantity }) => {
  const index = items.findIndex(
    (item) => item.name.toLowerCase() == name.toLowerCase()
  );

  if (index !== -1) {
    items[index].quantity += quantity;
  } else {
    items.push({ name, price, quantity });
  }
};

////////////////////////////////////////////////////////
// Remove Item from Shopping cart by name
////////////////////////////////////////////////////////
const removeItem = (name) => {
  const index = items.findIndex(
    (item) => item.name.toLowerCase() == name.toLowerCase()
  );

  if (index !== -1)
    if (items[index].quantity !== 1) {
      items[index].quantity--;
    } else items.splice(index, 1);
};

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

addItem({ name: 'Milk', price: 5, quantity: 1 });
addItem({ name: 'Milk', price: 5, quantity: 1 });
addItem({ name: 'Yogurt', price: 10, quantity: 1 });
addItem({ name: 'Yogurt', price: 10, quantity: 1 });
addItem({ name: 'Yogurt', price: 10, quantity: 1 });

printReceipt();

removeItem('Milk');
removeItem('Yogurt');

printReceipt();
