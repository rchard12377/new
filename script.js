// Sample product list
const products = [
  { id: 1, name: "Organic Honey", price: 250, img: "https://via.placeholder.com/200" },
  { id: 2, name: "Brown Bread", price: 50, img: "https://via.placeholder.com/200" },
  { id: 3, name: "Peanut Butter", price: 180, img: "https://via.placeholder.com/200" },
  { id: 4, name: "Olive Oil", price: 400, img: "https://via.placeholder.com/200" }
];

let cart = [];

// Render products
const productList = document.getElementById("product-list");
products.forEach(product => {
  const div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>₹${product.price}</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
  productList.appendChild(div);
});

// Add to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  document.getElementById("cart-count").innerText = cart.length;
}

// Cart modal
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

cartBtn.onclick = () => {
  cartModal.style.display = "flex";
  renderCart();
};

closeCart.onclick = () => {
  cartModal.style.display = "none";
};

// Render cart
function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    cartItems.appendChild(li);
  });
  cartTotal.innerText = total;
}

// Checkout
document.getElementById("checkout-btn").onclick = () => {
  alert("Checkout feature not integrated yet. You can connect PayPal/Stripe.");
};
