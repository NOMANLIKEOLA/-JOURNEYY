let cart = [];

function loadCart(){
    const storedCart = localStorage.getItem("cart");
    if(storedCart){
        cart = JSON.parse(storedCart);
    } else {
        cart = [];
    }
}

function renderCart(){
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalContainer = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = "";
    let total = 0;

    if(cart.length === 0){
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalContainer.textContent = "Total: $0.00";
        return;
    }

    cart.forEach((item,index) => {
        total += item.price * item.quantity;
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        itemDiv.innerHTML = `
            <img src = "${item.image}" alt = "${item.title}"/>
            <h3> ${item.title} </h3>
            <p> $${item.price.toFixed(2)} : ${item.quantity} </p>
            <p> <strong> $${(item.price * item.quantity).toFixed(2)} </strong> </p>
            <div class="quantity-controls">
                <button class="decrease">-</button>
                <span>${item.quantity}</span>
                <button class="increase">+</button>
            </div>
            <p><strong>$${(item.price * item.quantity).toFixed(2)}</strong></p>
            <button class="remove">Remove</button>
        `;

        itemDiv.querySelector(".increase").addEventListener("click", () => {
      item.quantity++;
      saveCart();
      renderCart();
    });

    itemDiv.querySelector(".decrease").addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart.splice(index, 1); 
      }
      saveCart();
      renderCart();
    });

    itemDiv.querySelector(".remove").addEventListener("click", () => {
      cart.splice(index, 1);
      saveCart();
      renderCart();

      
      addToBin();
    });

        cartItemsContainer.appendChild(itemDiv);
    });
        cartTotalContainer.textContent = `Total: $${total.toFixed(2)}`;
}

function addToBin(){
        const newBin = document.getElementById("bin-linkk");
          if(".remove" === true){
              itemDiv.push(newBin);
        }
      }

loadCart();
renderCart();
addToBin();

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
