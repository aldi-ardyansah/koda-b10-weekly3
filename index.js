// Showing nav menu when click on hamburger icon
const hamburger = document.querySelector(".nav-hamburger");

hamburger.addEventListener("click", (e) => {
    e.preventDefault();

    const navCollapsible = document.querySelectorAll(".nav-collapsible");

    navCollapsible.forEach(element => {
        element.classList.toggle("nav-show");
    });
});

// Hiding nav menu when scrolling page
window.addEventListener("scroll", (event) => {
    const navCollapsible = document.querySelectorAll(".nav-collapsible");

    navCollapsible.forEach(element => {
        element.classList.remove("nav-show");
    });
});

// Login Modal Page
fetch("login.html")
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML("afterbegin", data);

        const loginToggle = document.getElementById("login-toggle");
        const loginButton = document.querySelector(".button-transparent");
        const registerButton = document.querySelector(".login-modal .login-tab-inactive");

        loginToggle.checked = false;

        loginButton.addEventListener("click", (e) => {
            e.preventDefault();
            loginToggle.checked = true;
        });

        registerButton.addEventListener("click", (e) => {
            e.preventDefault();
            loginToggle.checked = false;
            document.getElementById("register-toggle").checked = true;
        });
    })
    .catch(error => console.error("Error loading login form:", error));

// Register Modal Page
fetch("register.html")
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML("afterbegin", data);

        const registerToggle = document.getElementById("register-toggle");
        const loginTab = document.querySelector(".register-modal .login-tab-inactive");

        registerToggle.checked = false;

        loginTab.addEventListener("click", (e) => {
            e.preventDefault();
            registerToggle.checked = false;
            document.getElementById("login-toggle").checked = true;
        });
    })
    .catch(error => console.error("Error loading register form:", error));

// User Dropdown
const buttonUser = document.querySelector(".button-user");
const userDropdown = document.querySelector(".user-dropdown");

buttonUser.addEventListener("click", () => {
    userDropdown.classList.toggle("active");
});

document.addEventListener("click", (e) => {
    if (!buttonUser.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.classList.remove("active");
    }
});