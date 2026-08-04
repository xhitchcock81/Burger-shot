console.log("Burger Shot JS Loaded!");

document.addEventListener("DOMContentLoaded", () => {

    console.log("Page Loaded!");

    document.querySelectorAll(".add-cart").forEach(button => {

        button.addEventListener("click", () => {

            alert("Working!");

        });

    });

});
