document.addEventListener("DOMContentLoaded", () => {

    const sendButton = document.getElementById("sendMessage");

    sendButton.addEventListener("click", async () => {

        const name = document.getElementById("name").value.trim();
        const discord = document.getElementById("discord").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !discord || !subject || !message) {
            alert("Please fill out all fields.");
            return;
        }

        const data = {
            username: "Burger Shot Contact",
            embeds: [{
                title: "📞 NEW CONTACT MESSAGE",
                color: 0x3B82F6,
                fields: [
                    {
                        name: "👤 Name",
                        value: name,
                        inline: true
                    },
                    {
                        name: "💬 Discord",
                        value: discord,
                        inline: true
                    },
                    {
                        name: "📋 Subject",
                        value: subject
                    },
                    {
                        name: "📝 Message",
                        value: message
                    }
                ],
                footer: {
                    text: "Burger Shot Contact"
                },
                timestamp: new Date().toISOString()
            }]
        };

        try {

            await fetch("https://discord.com/api/webhooks/1534307579948306502/o_S694Y-ye0wqza09arm0QdEVboRGaY7KxcNouxUphkTTacQTyInyFF7owWCSghscxnL", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];

            messages.push({
                name,
                discord,
                subject,
                message,
                date: new Date().toLocaleString()
            });

            localStorage.setItem("contactMessages", JSON.stringify(messages));

            alert("✅ Message Sent!");

            window.location.href = "index.html";

        } catch (error) {

            console.error(error);

            alert("Failed to send message.");

        }

    });

});
