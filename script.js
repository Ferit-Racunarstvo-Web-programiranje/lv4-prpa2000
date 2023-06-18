// Get elements
const cartButton = document.querySelector(".cart-button");
const cartBadge = document.querySelector(".cart-badge");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".close");
const buyButton = document.querySelector(".buy-btn");
const cartItemsList = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const itemsGrid = document.querySelector(".items-grid");
let addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
let removeFromCartButtons = document.querySelectorAll(".remove-from-cart-btn");

let items = [
  {
    id: 1,
    name: "Apple",
    price: 1.99,
  },
  {
    id: 2,
    name: "Banana",
    price: 5.99,
  },
  {
    id: 3,
    name: "Blueberries",
    price: 3.99,
  },
  {
    id: 4,
    name: "Mango",
    price: 4.99,
  },
  {
    id: 5,
    name: "Strawberries",
    price: 2.49,
  },
  {
    id: 6,
    name: "Watermelon",
    price: 6.99,
  },
  {
    id: 7,
    name: "Kiwi",
    price: 3.75,
  },
];

let cart = [];
let total = 0;
// An example function that creates HTML elements using the DOM.
function fillItemsGrid() {
  for (const item of items) {
    let itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.innerHTML = `
            <img src="images/v${item.id}.jpeg" alt="${item.name}" width="250" height="250">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
        `;
    itemsGrid.appendChild(itemElement);
  }
  addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
}

// Adding the .show-modal class to an element will make it visible
// because it has the CSS property display: block; (which overrides display: none;)
// See the CSS file for more details.
function toggleModal() {
  modal.classList.toggle("show-modal");
  if (modal.classList.contains("show-modal")) {
    updateCart(cart);
  }
}

const addToCart = (item) => {
  const itemCart = cart.find((ic) => ic.id === item.id);
  if (itemCart) {
    itemCart.quantity++;
    total += itemCart.price;
  } else {
    cart.push({ ...item, quantity: 1 });
    total += item.price;
  }
  updateCart();
};
const removeItem = (item) => {
  const cartItem = cart.find((ci) => ci.id === item.id);
  if (cartItem) {
    if (cartItem.quantity === 1) {
      cart = cart.filter((ci) => ci.id !== item.id);
      total -= cartItem.price;
    } else {
      cartItem.quantity--;
      total -= cartItem.price;
    }
  }
  updateCart();
};
const updateCart = () => {
  cartItemsList.innerHTML = "";
  cart.forEach((item) => {
    let itemElement = document.createElement("li");
    itemElement.innerHTML = `
        <span>${item.name}</span>
        <span>${item.quantity} x $${item.price.toFixed(2)}</span>
        <span><button class="remove-from-cart-btn" data-id="${
          item.id
        }">Remove</button>
        
      `;

    cartItemsList.appendChild(itemElement);
  });
  removeFromCartButtons = document.querySelectorAll(".remove-from-cart-btn");
  removeFromCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.dataset.id;
      const item = items.find((item) => item.id == itemId);
      removeItem(item);
    });
  });
  cartTotal.innerHTML = `$${total.toFixed(2)}`;
  cartBadge.innerHTML = cart.reduce((acc, item) => acc + item.quantity, 0);
};

const buy = () => {
  if (cartItemsList.innerHTML != "") {
    cartBadge.innerHTML = `0`;
    toggleModal();
    cart = [];
    total = 0;
    alert("Products succesfully bought.");
    cartItemsList.innerHTML = "";
  } else {
    alert("Cart is empty.");
  }
};

// Call fillItemsGrid function when page loads
fillItemsGrid();
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const itemId = button.dataset.id;
    const item = items.find((item) => item.id == itemId);
    addToCart(item);
  });
});
// Example of DOM methods for adding event handling
cartButton.addEventListener("click", toggleModal);
modalClose.addEventListener("click", toggleModal);
buyButton.addEventListener("click", buy);
