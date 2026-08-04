// Burger Shot Cart System

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        const item = {
            name: button.dataset.name,
            price: Number(button.dataset.price)
        };

        cart.push(item);

        localStorage.setItem("cart", JSON.stringify(cart));

        alert(`${item.name} added to your order!`);
    });

});
