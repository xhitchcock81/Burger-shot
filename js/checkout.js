// Burger Shot Checkout

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const summary = document.getElementById("orderSummary");

let total = 0;

// Build Order Summary
if (cart.length === 0) {

    summary.innerHTML = `
        <div class="alert alert-warning">
            Your cart is empty.
        </div>
    `;

} else {

    summary.innerHTML = "";

    cart.forEach(item => {

        total += item.price * item.quantity;

        summary.innerHTML += `
            <div class="d-flex justify-content-between border-bottom py-2">
                <span>${item.name} x${item.quantity}</span>
                <strong>$${item.price * item.quantity}</strong>
            </div>
        `;

    });

    summary.innerHTML += `
        <div class="d-flex justify-content-between mt-3">
            <h4>Total</h4>
            <h4>$${total}</h4>
        </div>
    `;

}

// Place Order
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

    } catch (error) {

        console.error(error);

        alert("Failed to send order.");

    }

});
