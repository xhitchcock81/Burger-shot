const cart = JSON.parse(localStorage.getItem("cart")) || [];

const summary = document.getElementById("orderSummary");

let total = 0;

if(cart.length===0){

    summary.innerHTML="<p>Your cart is empty.</p>";

}else{

    summary.innerHTML="";

    cart.forEach(item=>{

        total += item.price*item.quantity;

        summary.innerHTML += `
        <p>
            ${item.name}
            x${item.quantity}
            - $${item.price*item.quantity}
        </p>
        `;

    });

    summary.innerHTML += `
    <hr>
    <h4>Total: $${total}</h4>
    `;

}

document.getElementById("placeOrder").onclick=()=>{

    alert("Next step: Send order to Discord!");

};
