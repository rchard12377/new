// Product list
const products = [
  { id: 1, name: "Mango Pickle", price: 120, category: "pickles", stock: 15, rating: 4, img: "images/mango-pickle.jpg" },
  { id: 2, name: "Homemade Jam", price: 180, category: "spreads", stock: 10, rating: 5, img: "images/jam.jpg" },
  { id: 3, name: "Spicy Masala Chips", price: 90, category: "snacks", stock: 25, rating: 4, img: "images/chips.jpg" },
  { id: 4, name: "Organic Honey", price: 250, category: "spreads", stock: 20, rating: 5, img: "images/honey.jpg" },
  { id: 5, name: "Cold-Pressed Olive Oil", price: 400, category: "oils", stock: 8, rating: 4, img: "images/olive-oil.jpg" }
];

let cart = [];
let quantities = {}; // track quantities per product

// Render products
function renderProducts(filterCategory = "all", searchText = "") {
  const productList = document.getElementById("products");
  productList.innerHTML = "";

  const filtered = products.filter(product => {
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  filtered.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");

    // Star rating
    let stars = "⭐".repeat(product.rating) + "☆".repeat(5 - product.rating);

    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name} <span class="badge">${product.stock > 0 ? "In Stock" : "Out of Stock"}</span></h3>
      <p class="price">₹${product.price}</p>
      <p class="rating">${stars}</p>
      <div class="quantity">
        <button onclick="changeQuantity(${product.id}, -1)">➖</button>
        <span id="qty-${product.id}">1</span>
        <button onclick="changeQuantity(${product.id}, 1)">➕</button>
      </div>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
      <button class="buy-btn" onclick="buyNow(${product.id})">Buy Now</button>
    `;
    productList.appendChild(div);
  });
}

function changeQuantity(id, change) {
  if (!quantities[id]) quantities[id] = 1;
  quantities[id] = Math.max(1, quantities[id] + change);
  const span = document.getElementById(`qty-${id}`);
  if (span) span.innerText = quantities[id];
}

// Add to cart
function addToCart(id) {
  const qty = quantities[id] || 1;
  const product = products.find(p => p.id === id);
  for (let i = 0; i < qty; i++) {
    cart.push(product);
  }
  document.getElementById("cart-count").innerText = cart.length;
}

// Buy Now (single product checkout)
function buyNow(id) {
  const product = products.find(p => p.id === id);
  alert(\`Buying \${product.name} for ₹\${product.price}\`);
}

// Render cart with remove + clear
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-items-count");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = \`\${item.name} - ₹\${item.price} <button class="remove-btn" onclick="removeFromCart(\${index})">❌</button>\`;
    cartItems.appendChild(li);
  });

  cartTotal.innerText = total;
  cartCount.innerText = cart.length;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  document.getElementById("cart-count").innerText = cart.length;
  renderCart();
}

document.getElementById("clear-cart").onclick = () => {
  cart = [];
  document.getElementById("cart-count").innerText = 0;
  renderCart();
};

// Modal controls
document.getElementById("cart-btn").onclick = () => {
  document.getElementById("cart-modal").style.display = "flex";
  renderCart();
};
document.getElementById("close-cart").onclick = () => {
  document.getElementById("cart-modal").style.display = "none";
};

// Checkout
document.getElementById("checkout-btn").onclick = () => {
  alert("Checkout not integrated yet. You can connect Stripe/PayPal later.");
};

// Search + Filter
document.getElementById("search").addEventListener("input", (e) => {
  renderProducts(document.getElementById("category-filter").value, e.target.value);
});
document.getElementById("category-filter").addEventListener("change", (e) => {
  renderProducts(e.target.value, document.getElementById("search").value);
});

// Initial render
renderProducts();
