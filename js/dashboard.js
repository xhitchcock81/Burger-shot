// Burger Shot Dashboard

const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

const applications =
    JSON.parse(localStorage.getItem("applications")) || [];

const messages =
    JSON.parse(localStorage.getItem("contactMessages")) || [];

let revenue = 0;

orders.forEach(order => {
    revenue += Number(order.total || 0);
});

// Dashboard Cards

document.getElementById("ordersCount").textContent =
    orders.length;

document.getElementById("applicationsCount").textContent =
    applications.length;

document.getElementById("messagesCount").textContent =
    messages.length;

document.getElementById("revenue").textContent =
    "$" + revenue;

// Orders

const ordersList =
    document.getElementById("ordersList");

if (orders.length === 0) {

    ordersList.innerHTML =
        "<p>No orders yet.</p>";

} else {

    orders.forEach(order => {

        ordersList.innerHTML += `

<div class="card bg-black border-warning mb-3">

<div class="card-body">

<h5>${order.orderNumber}</h5>

<p><strong>Customer:</strong> ${order.customer}</p>

<p><strong>Type:</strong> ${order.orderType}</p>

<p><strong>Total:</strong> $${order.total}</p>

<p><strong>Status:</strong> ${order.status}</p>

</div>

</div>

`;

    });

}

// Applications

const applicationsList =
    document.getElementById("applicationsList");

if (applications.length === 0) {

    applicationsList.innerHTML =
        "<p>No applications.</p>";

} else {

    applications.forEach(app => {

        applicationsList.innerHTML += `

<div class="card bg-black border-warning mb-3">

<div class="card-body">

<h5>${app.applicationNumber}</h5>

<p><strong>Name:</strong> ${app.rpName}</p>

<p><strong>Position:</strong> ${app.position}</p>

<p><strong>Status:</strong> ${app.status}</p>

</div>

</div>

`;

    });

}

// Contact Messages

const messagesList =
    document.getElementById("messagesList");

if (messages.length === 0) {

    messagesList.innerHTML =
        "<p>No messages.</p>";

} else {

    messages.forEach(msg => {

        messagesList.innerHTML += `

<div class="card bg-black border-warning mb-3">

<div class="card-body">

<h5>${msg.subject}</h5>

<p><strong>Name:</strong> ${msg.name}</p>

<p>${msg.message}</p>

</div>

</div>

`;

    });

}
