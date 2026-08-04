// Burger Shot Careers

document.addEventListener("DOMContentLoaded", () => {

    const submitButton = document.getElementById("submitApplication");

    submitButton.addEventListener("click", async () => {

        const rpName = document.getElementById("rpName").value.trim();
        const discord = document.getElementById("discord").value.trim();
        const age = document.getElementById("age").value.trim();
        const position = document.getElementById("position").value;
        const experience = document.getElementById("experience").value.trim();
        const availability = document.getElementById("availability").value;
        const why = document.getElementById("why").value.trim();

        if (
            !rpName ||
            !discord ||
            !age ||
            !experience ||
            !why
        ) {
            alert("Please fill out all fields.");
            return;
        }

        const applicationNumber =
            "APP-" + Math.floor(100000 + Math.random() * 900000);

        const embed = {
            username: "Burger Shot Careers",
            embeds: [{
                title: "🍔 NEW JOB APPLICATION",
                color: 0xFFC107,

                fields: [

                    {
                        name: "📄 Application #",
                        value: applicationNumber,
                        inline: true
                    },

                    {
                        name: "👤 RP Name",
                        value: rpName,
                        inline: true
                    },

                    {
                        name: "💬 Discord",
                        value: discord,
                        inline: true
                    },

                    {
                        name: "🎂 Age",
                        value: age,
                        inline: true
                    },

                    {
                        name: "💼 Position",
                        value: position,
                        inline: true
                    },

                    {
                        name: "📅 Availability",
                        value: availability,
                        inline: true
                    },

                    {
                        name: "📋 Previous Experience",
                        value: experience
                    },

                    {
                        name: "⭐ Why Should We Hire You?",
                        value: why
                    }

                ],

                footer: {
                    text: "Burger Shot Hiring"
                },

                timestamp: new Date().toISOString()

            }]
        };

        try {

            await fetch("https://discord.com/api/webhooks/1534297897892446468/3Fq7e3wPCygWPiy1ahVsmHk5aRqzKyF2CUHNqZ6BZpNuWJZ0T9ZeVxuYfaKOhxtXT31e", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(embed)

            });

            let applications =
                JSON.parse(localStorage.getItem("applications")) || [];

            applications.push({

                applicationNumber,
                rpName,
                discord,
                age,
                position,
                experience,
                availability,
                why,
                status: "Pending"

            });

            localStorage.setItem(
                "applications",
                JSON.stringify(applications)
            );

            alert("✅ Application Submitted!");

            window.location.href = "index.html";

        } catch (err) {

            console.error(err);

            alert("Failed to submit application.");

        }

    });

});
