// Burger Shot Cart System

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {

    const cartButton = document.getElementById("cartButton");
    const cartPanel = document.getElementById("cartPanel");
    const closeCart = document.getElementById("closeCart");
    const clearCart = document.getElementById("clearCart");

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function renderCart() {

        cartItems.innerHTML = "";

        if (cart.length === 0) {

            cartItems.innerHTML = "<p class='text-muted'>Your cart is empty.</p>";

            cartTotal.textContent = "0";
            cartCount.textContent = "0";

            return;
        }

        let total = 0;
        let count = 0;

        cart.forEach((item,index)=>{

            total += item.price * item.quantity;
            count += item.quantity;

            cartItems.innerHTML += `

            <div class="border rounded p-2 mb-2">

                <strong>${item.name}</strong>

                <div class="d-flex justify-content-between align-items-center mt-2">

                    <div>

                        <button class="btn btn-sm btn-danger minus" data-index="${index}">
                        -
                        </button>

                        <span class="mx-2">${item.quantity}</span>

                        <button class="btn btn-sm btn-success plus" data-index="${index}">
                        +
                        </button>

                    </div>

                    <strong>$${item.price * item.quantity}</strong>

                </div>

                <button class="btn btn-sm btn-outline-danger mt-2 remove w-100"
                data-index="${index}">
                Remove
                </button>

            </div>

            `;
        });

        cartTotal.textContent = total;
        cartCount.textContent = count;

        document.querySelectorAll(".plus").forEach(btn=>{

            btn.onclick=()=>{

                cart[btn.dataset.index].quantity++;

                saveCart();
                renderCart();

            }

        });

        document.querySelectorAll(".minus").forEach(btn=>{

            btn.onclick=()=>{

                if(cart[btn.dataset.index].quantity>1){

                    cart[btn.dataset.index].quantity--;

                }else{

                    cart.splice(btn.dataset.index,1);

                }

                saveCart();
                renderCart();

            }

        });

        document.querySelectorAll(".remove").forEach(btn=>{

            btn.onclick=()=>{

                cart.splice(btn.dataset.index,1);

                saveCart();
                renderCart();

            }

        });

    }

    renderCart();

    document.querySelectorAll(".add-cart").forEach(button=>{

        button.onclick=()=>{

            const name=button.dataset.name;
            const price=Number(button.dataset.price);

            const existing=cart.find(x=>x.name===name);

            if(existing){

                existing.quantity++;

            }else{

                cart.push({

                    name,
                    price,
                    quantity:1

                });

            }

            saveCart();
            renderCart();

            cartPanel.classList.add("open");

        }

    });

    cartButton.onclick=()=>{

        cartPanel.classList.add("open");

    }

    closeCart.onclick=()=>{

        cartPanel.classList.remove("open");

    }

    clearCart.onclick=()=>{

        cart=[];

        saveCart();

        renderCart();

    }

});
