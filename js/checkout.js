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

document.getElementById("placeOrder").onclick = async () => {

    const name = document.getElementById("customerName").value;
    const discord = document.getElementById("discordName").value;
    const orderType = document.getElementById("orderType").value;
    const notes = document.getElementById("notes").value;

    let items = "";

    cart.forEach(item => {
        items += `• ${item.name} x${item.quantity}\n`;
    });

    const data = {
        username: "Burger Shot Orders",
        embeds: [{
            title: "🍔 NEW BURGER SHOT ORDER",
            color: 16760576,
            fields: [
                {
                    name: "👤 Customer",
                    value: name || "Unknown"
                },
                {
                    name: "💬 Discord",
                    value: discord || "Not Provided"
                },
                {
                    name: "🚗 Order Type",
                    value: orderType
                },
                {
                    name: "🍔 Items",
                    value: items
                },
                {
                    name: "💰 Total",
                    value: `$${total}`
                },
                {
                    name: "📝 Notes",
                    value: notes || "None"
                }
            ]
        }]
    };

    await fetch(https://discord.com/api/webhooks/1534161859052179559/TWVa5pffY3_gQLaPB46PauJsaX3ZY2TNmJ3SuT0cV7GKvcyo7gTQ76ZwvkqOH_IzHp--, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    localStorage.removeItem("cart");

    alert("Order Sent!");

    window.location.href = "index.html";
};
