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

// Login Authentication
const protectedPages = [
    "topic.html",
    "location.html",
    "proof.html",
    "review.html",
    "receipt.html",
    "notification.html",
    "list-complaint.html",
    "profile.html",
    "notification-settings.html",
    "data-export.html",
    "security.html"
];

const currentPage = window.location.pathname.split("/").pop();

// Login Modal Page
fetch("login.html")
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML("afterbegin", data);

        const loginToggle = document.getElementById("login-toggle");
        const loginButton = document.querySelector(".button-transparent");
        const registerButton = document.querySelector(".login-modal .login-tab-inactive");

        loginToggle.checked = protectedPages.includes(currentPage) && sessionStorage.getItem("isLoggedIn") !== "true";

        if (loginButton) {
            loginButton.addEventListener("click", (e) => {
                e.preventDefault();
                loginToggle.checked = true;
            });
        }

        if (registerButton) {
            registerButton.addEventListener("click", (e) => {
                e.preventDefault();
                loginToggle.checked = false;
                document.getElementById("register-toggle").checked = true;
            });
        }

        // Login Password Eye Icon Toggle
        const loginPassword = document.getElementById("login-password");
        const loginEye = document.querySelector(".login-modal .login-eye");

        loginEye.addEventListener("click", () => {
            if (loginPassword.type === "password") {
                loginPassword.type = "text";
                loginEye.src = "icons/i-eye-closed.svg";
            } else {
                loginPassword.type = "password";
                loginEye.src = "icons/i-eye.svg";
            }
        });

        // Login Validation
        const loginForm = document.querySelector(".login-modal .login-form");

        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            if (email === "admin@mail.com" && password === "1234") {
                sessionStorage.setItem("isLoggedIn", "true");
                window.location.replace("list-complaint.html");
            } else {
                alert("Email atau password salah!");
            }
        });
    })
    .catch(error => console.error("Error loading login form:", error));

// Logout
const logoutButton = document.querySelector(".user-dropdown-logout");

if (logoutButton) {
    logoutButton.addEventListener("click", (e) => {
        e.preventDefault();
        sessionStorage.removeItem("isLoggedIn");
        window.location.replace("index.html");
    });
}

// Button Report Authentication
// Button Report Authentication
const buttonReports = document.querySelectorAll(".button-report");

buttonReports.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        if (sessionStorage.getItem("isLoggedIn") === "true") {
            window.location.href = "topic.html";
        } else {
            const loginToggle = document.getElementById("login-toggle");

            if (loginToggle) {
                loginToggle.checked = true;
            }
        }
    });
});

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

        // Register Password Eye Icon Toggle
        const registerPassword = document.getElementById("register-password");
        const registerEye = document.querySelector(".register-modal .login-eye");

        registerEye.addEventListener("click", () => {
            if (registerPassword.type === "password") {
                registerPassword.type = "text";
                registerEye.src = "icons/i-eye-closed.svg";
            } else {
                registerPassword.type = "password";
                registerEye.src = "icons/i-eye.svg";
            }
        });
    })
    .catch(error => console.error("Error loading register form:", error));

// User Dropdown
const buttonUser = document.querySelector(".button-user");
const userDropdown = document.querySelector(".user-dropdown");

if (buttonUser && userDropdown) {
    buttonUser.addEventListener("click", () => {
        userDropdown.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
        if (!buttonUser.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove("active");
        }
    });
}

// Security Page Password Toggle
const securityPasswordFields = document.querySelectorAll(".security-field");

securityPasswordFields.forEach((field) => {
    const securityPassword = field.querySelector(".security-input");
    const securityEye = field.querySelector(".security-toggle-password img");
    const securityToggle = field.querySelector(".security-toggle-password");

    securityToggle.addEventListener("click", () => {
        if (securityPassword.type === "password") {
            securityPassword.type = "text";
            securityEye.src = "icons/i-eye-closed.svg";
            securityToggle.setAttribute("aria-label", "Hide password");
        } else {
            securityPassword.type = "password";
            securityEye.src = "icons/i-eye.svg";
            securityToggle.setAttribute("aria-label", "Show password");
        }
    });
});

// Live Feed Filters
const liveFeedSearch = document.querySelector(".input-search input");
const liveFeedCategory = document.querySelectorAll('input[name="category"]');
const liveFeedStatus = document.querySelectorAll('input[name="status"]');
const liveFeedProof = document.querySelector(".proof input");
const liveFeedArticles = document.querySelectorAll(".articles-live-feed");

function getFilterLabel(input) {
    const label = input.closest("label").cloneNode(true);
    label.querySelectorAll("img").forEach((img) => img.remove());
    return label.textContent.trim().toLowerCase().replace(/\s+/g, " ");
}

function filterLiveFeed() {
    const searchValue = liveFeedSearch.value.trim().toLowerCase();

    const selectedCategory = document.querySelector('input[name="category"]:checked');
    const categoryValue = getFilterLabel(selectedCategory);

    const selectedStatus = document.querySelector('input[name="status"]:checked');
    const statusValue = getFilterLabel(selectedStatus);

    const proofOnly = liveFeedProof.checked;

    liveFeedArticles.forEach((article) => {
        const articleText = article.textContent.toLowerCase();
        const articleCategory = article.querySelector(".articles-location span:last-child").textContent.trim().toLowerCase();
        const articleStatus = article.querySelector(".articles-status").textContent.trim().toLowerCase();
        const hasProof = article.querySelector(".articles-proof") !== null;

        const matchesSearch = articleText.includes(searchValue);
        const matchesCategory = categoryValue.startsWith("all issues") || articleCategory === categoryValue;
        const matchesStatus = statusValue === "all" || articleStatus === statusValue;
        const matchesProof = !proofOnly || hasProof;

        article.style.display = matchesSearch && matchesCategory && matchesStatus && matchesProof ? "" : "none";
    });
}

// Search
liveFeedSearch.addEventListener("input", filterLiveFeed);

// Issues
liveFeedCategory.forEach((category) => {
    category.addEventListener("change", filterLiveFeed);
});

// Status
liveFeedStatus.forEach((status) => {
    status.addEventListener("change", filterLiveFeed);
});

// With photos/proof only
liveFeedProof.addEventListener("change", filterLiveFeed);