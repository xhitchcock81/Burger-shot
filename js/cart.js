// Burger Shot Cart v2

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "0";
        cartCount.textContent = "0";
        return;
    }

    let total = 0;
    let totalItems = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;
        totalItems += item.quantity;

        cartItems.innerHTML += `
        <div class="mb-3 border-bottom pb-2">
            <strong>${item.name}</strong><br>
            Qty: ${item.quantity}<br>
            $${item.price * item.quantity}
        </div>
        `;
    });

    cartTotal.textContent = total;
    cartCount.textContent = totalItems;
}

document.addEventListener("DOMContentLoaded", () => {

    renderCart();

    document.querySelectorAll(".add-cart").forEach(button => {

        button.addEventListener("click", () => {

            const name = button.dataset.name;
            const price = Number(button.dataset.price);

            const existing = cart.find(item => item.name === name);

            if (existing) {
                existing.quantity++;
            } else {
                cart.push({
                    name,
                    price,
                    quantity: 1
                });
            }

            saveCart();
            renderCart();

            cartPanel.classList.add("open");

        });

    });

    cartButton.addEventListener("click", () => {
        cartPanel.classList.add("open");
    });

    closeCart.addEventListener("click", () => {
        cartPanel.classList.remove("open");
    });

});
