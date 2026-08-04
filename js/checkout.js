const cart = JSON.parse(localStorage.getItem("cart")) || [];

const summary = document.getElementById("orderSummary");

let total = 0;

if (cart.length === 0) {

    summary.innerHTML = "<p>Your cart is empty.</p>";

} else {

    summary.innerHTML = "";

    cart.forEach(item => {

        total += item.price * item.quantity;

        summary.innerHTML += `
            <p>
                ${item.name} x${item.quantity}
                - $${item.price * item.quantity}
            </p>
        `;

    });

    summary.innerHTML += `
        <hr>
        <h4>Total: $${total}</h4>
    `;

}

document.getElementById("placeOrder").onclick = async () => {

    const orderNumber = "BS-" + Date.now().toString().slice(-6);

    const name = document.getElementById("customerName").value;
    const discord = document.getElementById("discordName").value;
    const orderType = document.getElementById("orderType").value;
    const notes = document.getElementById("notes").value;

    let items = "";

    cart.forEach(item => {
        items += `• ${item.name} x${item.quantity}\n`;
    });

    const data = {
        username: "Burger Shot POS",
        embeds: [{
            title: "🍔 BURGER SHOT ORDER",
            description: "A new order has been placed.",
            color: 0xF59E0B,
            fields: [
                {
                    name: "📦 Order Number",
                    value: orderNumber,
                    inline: true
                },
                {
                    name: "👤 Customer",
                    value: name || "Unknown",
                    inline: true
                },
                {
                    name: "💬 Discord",
                    value: discord || "Not Provided",
                    inline: true
                },
                {
                    name: "🚗 Order Type",
                    value: orderType,
                    inline: true
                },
                {
                    name: "🍔 Items",
                    value: items || "No items"
                },
                {
                    name: "💰 Total",
                    value: `$${total}`,
                    inline: true
                },
                {
                    name: "📝 Notes",
                    value: notes || "None"
                }
            ],
            footer: {
                text: "Burger Shot • Fuel The Streets"
            },
            timestamp: new Date().toISOString()
        }]
    };

    // REPLACE THIS WITH YOUR NEW WEBHOOK
    await fetch("PASTE_YOUR_NEW_WEBHOOK_HERE", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    // Save order for dashboard
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
        orderNumber,
        customer: name,
        discord,
        orderType,
        notes,
        items: [...cart],
        total,
        status: "New"
    });

    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem("cart");

    alert("✅ Order Sent!");

    window.location.href = "success.html";

};
