// Burger Shot Cart

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".add-cart").forEach(button => {

        button.addEventListener("click", () => {

            const item = {
                name: button.dataset.name,
                price: parseInt(button.dataset.price)
            };

            cart.push(item);

            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`${item.name} added to your cart!`);
        });

    });

});
