let orders = JSON.parse(localStorage.getItem("orders")) || [];

const container = document.getElementById("orders");

function renderOrders(){

    container.innerHTML = "";

    if(orders.length===0){

        container.innerHTML=`
        <div class="alert alert-warning">
        No active orders.
        </div>
        `;

        return;
    }

    orders.forEach((order,index)=>{

        let items="";

        order.items.forEach(item=>{

            items+=`
            <li>${item.name} x${item.quantity}</li>
            `;

        });

        container.innerHTML+=`

        <div class="card bg-black text-white border-warning mb-4">

        <div class="card-body">

        <h4>🍔 ${order.orderNumber}</h4>

        <p><strong>Customer:</strong> ${order.customer}</p>

        <p><strong>Discord:</strong> ${order.discord}</p>

        <p><strong>Order Type:</strong> ${order.orderType}</p>

        <ul>${items}</ul>

        <h5>Status:
        <span class="text-warning">${order.status}</span>
        </h5>

        <button class="btn btn-warning"
        onclick="nextStatus(${index})">

        Next Status

        </button>

        </div>

        </div>

        `;

    });

}

function nextStatus(index){

    if(orders[index].status==="New"){

        orders[index].status="Cooking";

    }

    else if(orders[index].status==="Cooking"){

        orders[index].status="Ready";

    }

    else if(orders[index].status==="Ready"){

        orders[index].status="Completed";

    }

    localStorage.setItem("orders",JSON.stringify(orders));

    renderOrders();

}

renderOrders();
