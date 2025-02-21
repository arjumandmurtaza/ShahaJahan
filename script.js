document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let name = this.getAttribute("data-name");
            let price = parseFloat(this.getAttribute("data-price"));
            let image = this.getAttribute("data-image");

            let existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }
            
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            alert("Added to cart");
        });
    });

    function updateCartCount() {
        document.getElementById("cart-count").textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    if (document.getElementById("cart-items")) {
        displayCart();
    }

    function displayCart() {
        let cartContainer = document.getElementById("cart-items");
        cartContainer.innerHTML = "";
        cart.forEach((item, index) => {
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="50">
                <p>${item.name} - $${item.price} x ${item.quantity}</p>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
        });
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                displayCart();
                updateCartCount();
            });
        });
    }
    

    document.getElementById("checkout-button")?.addEventListener("click", function () {
        window.location.href = "checkout.html";
    });
});
