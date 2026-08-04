// Burger Shot Checkout

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const summary = document.getElementById("orderSummary");

let total = 0;

// Display Order Summary
if (cart.length === 0) {

    summary.innerHTML = `
        <div class="alert alert-warning">
            Your cart is empty.
        </div>
    `;

} else {

    summary.innerHTML = "";

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        summary.innerHTML += `
            <div class="d-flex justify-content-between border-bottom py-2">
                <span>${item.name} x${item.quantity}</span>
                <strong>$${itemTotal}</strong>
            </div>
        `;

    });

    summary.innerHTML += `
        <hr>
        <div class="d-flex justify-content-between">
            <h4>Total</h4>
            <h4>$${total}</h4>
        </div>
    `;
}

document.getElementById("placeOrder").addEventListener("click", async () => {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const name = document.getElementById("customerName").value.trim();
    const discord = document.getElementById("discordName").value.trim();
    const orderType = document.getElementById("orderType").value;
    const notes = document.getElementById("notes").value.trim();

    if (!name || !discord) {
        alert("Please enter your RP Name and Discord Username.");
        return;
    }

    const orderNumber = "BS-" + Date.now().toString().slice(-6);

    let items = "";

    cart.forEach(item => {
        items += `• ${item.name} x${item.quantity}\n`;
    });

    const data = {
        username: "Burger Shot POS",
        embeds: [{
            title: "🍔 BURGER SHOT ORDER",
            color: 0xF59E0B,
            fields: [
                {
                    name: "📦 Order Number",
                    value: orderNumber,
                    inline: true
                },
                {
                    name: "👤 Customer",
                    value: name,
                    inline: true
                },
                {
                    name: "💬 Discord",
                    value: discord,
                    inline: true
                },
                {
                    name: "🚗 Order Type",
                    value: orderType,
                    inline: true
                },
                {
                    name: "🍔 Items",
                    value: items
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

    try {

        
        await fetch("https://discord.com/api/webhooks/1534161859052179559/TWVa5pffY3_gQLaPB46PauJsaX3ZY2TNmJ3SuT0cV7GKvcyo7gTQ76ZwvkqOH_IzHp--", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        // Save order for dashboard
        const orders = JSON.parse(localStorage.getItem("orders")) || [];

        orders.push({
            orderNumber,
            customer: name,
            discord,
            orderType,
            notes,
            items: cart,
            total,
            status: "New"
        });

        localStorage.setItem("orders", JSON.stringify(orders));

        // Clear cart
        localStorage.removeItem("cart");

        window.location.href = "success.html";

    } catch (err) {

        console.error(err);
        alert("Failed to send order to Discord.");

    }

});
