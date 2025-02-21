
        document.addEventListener("DOMContentLoaded", function () {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let cartContainer = document.getElementById("cart-items");
            let totalPrice = 0;

            if (cart.length === 0) {
                cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            } else {
                cart.forEach((item, index) => {
                    let cartItem = document.createElement("div");
                    cartItem.classList.add("cart-item");
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" width="50">
                        <p>${item.name} - $${item.price} x ${item.quantity}</p>
                        <button class="remove-item" data-index="${index}">Remove</button>
                    `;
                    cartContainer.appendChild(cartItem);
                    totalPrice += item.price * item.quantity;
                });

                document.getElementById("cart-total").textContent = totalPrice.toFixed(2);

                document.querySelectorAll(".remove-item").forEach(button => {
                    button.addEventListener("click", function () {
                        let index = this.getAttribute("data-index");
                        cart.splice(index, 1);
                        localStorage.setItem("cart", JSON.stringify(cart));
                        location.reload();
                    });
                });
            }

            document.getElementById("payment-form").addEventListener("submit", function (e) {
                e.preventDefault();
                alert("Payment successful! Your order has been placed.");
                localStorage.removeItem("cart");
                window.location.href = "home.html";
            });

            document.getElementById("paypal-button").addEventListener("click", function () {
                alert("Redirecting to PayPal...");
                localStorage.removeItem("cart");
                window.location.href = "home.html";
            });
        });
