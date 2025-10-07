let cart = [];
const cartCount = document.getElementById("cart-count");
const productsContainer = document.getElementById("products");

async function fetchProducts(){
    try{
      const res = await fetch("https://fakestoreapi.com/products");
      const products = await res.json();

      productsContainer.innerHTML = "";

      products.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.classList.add("product-card");

          productCard.innerHTML = `
            <img src = "${product.image}" alt="${product.title}"/>
            <h3> ${product.title} </h3>
            <p> $${product.price.toFixed(2)} </p>
            <button class = "add-to-cart"> Add to Cart </button> 
             `;

          const addBtn = productCard.querySelector(".add-to-cart");
          addBtn.addEventListener("click", () => {
              addToCart(product);
          });

          productsContainer.appendChild(productCard);
      });
    } catch (error) {
        console.error("Error fetching products:", error);
        productsContainer.innerHTML = "<p> Failed to load products. </p>";
    }
}

fetchProducts();

function addToCart(product){
    const existingItem = cart.find(item => item.id === product.id);
    if(existingItem){
        existingItem.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    updateCartCount();
    saveCart();
    
}

function updateCartCount(){
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart(){
    const storedCart = localStorage.getItem("cart");
    if(storedCart){
        cart = JSON.parse(storedCart);
        updateCartCount();
    }
}

loadCart();
