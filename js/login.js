document.getElementById("loginButton").addEventListener("click", () => {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // CHANGE THESE
    const managerUser = "manager";
    const managerPass = "BurgerShot2026!";

    if (username === managerUser && password === managerPass) {

        sessionStorage.setItem("managerLoggedIn", "true");

        window.location.href = "dashboard.html";

    } else {

        alert("Invalid username or password.");

    }

});
