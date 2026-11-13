$(document).ready(function() {

    // Showing nav menu when click on hamburger icon
    $(".nav-hamburger").on("click", function(e) {
        e.preventDefault();

        $(".nav-collapsible").toggleClass("nav-show");
    });

    // Hiding nav menu when scrolling page
    $(window).on("scroll", function() {
        $(".nav-collapsible").removeClass("nav-show");
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

    let loginDestination = "list-complaint.html";

    // Login Modal Page
    $.get("login.html", function(data) {
        $("body").prepend(data);

        const $loginToggle = $("#login-toggle");
        const $loginButton = $(".button-transparent");
        const $registerButton = $(".login-modal .login-tab-inactive");

        $loginToggle.prop("checked", protectedPages.includes(currentPage) && sessionStorage.getItem("isLoggedIn") !== "true");

        // Button Login
        $loginButton.on("click", function(e) {
            e.preventDefault();
            loginDestination = "list-complaint.html";
            $loginToggle.prop("checked", true);
        });

        // Button Register
        $registerButton.on("click", function(e) {
            e.preventDefault();
            $loginToggle.prop("checked", false);
            $("#register-toggle").prop("checked", true);
        });

        // Login Password Eye Icon Toggle
        $(".login-modal .login-eye").on("click", function() {
            const $loginPassword = $("#login-password");

            if ($loginPassword.attr("type") === "password") {
                $loginPassword.attr("type", "text");
                $(this).attr("src", "icons/i-eye-closed.svg");
            } else {
                $loginPassword.attr("type", "password");
                $(this).attr("src", "icons/i-eye.svg");
            }
        });

        // Login Validation
        $(".login-modal .login-form").on("submit", function(e) {
            e.preventDefault();

            const email = $("#login-email").val();
            const password = $("#login-password").val();

            if (email === "admin@mail.com" && password === "1234") {
                sessionStorage.setItem("isLoggedIn", "true");
                window.location.replace(loginDestination);
            } else {
                alert("Email atau password salah!");
            }
        });

        // Button Report Authentication
        $(".button-report").on("click", function(e) {
            e.preventDefault();

            if (sessionStorage.getItem("isLoggedIn") === "true") {
                window.location.href = "topic.html";
            } else {
                loginDestination = "topic.html";
                $loginToggle.prop("checked", true);
            }
        });

    }).fail(function(error) {
        console.error("Error loading login form:", error);
    });

    // Logout
    $(document).on("click", ".user-dropdown-logout", function(e) {
        e.preventDefault();

        sessionStorage.removeItem("isLoggedIn");
        window.location.replace("index.html");
    });

    // Register Modal Page
    $.get("register.html", function(data) {
        $("body").prepend(data);

        const $registerToggle = $("#register-toggle");
        const $loginTab = $(".register-modal .login-tab-inactive");

        $registerToggle.prop("checked", false);

        // Login Tab
        $loginTab.on("click", function(e) {
            e.preventDefault();

            $registerToggle.prop("checked", false);
            $("#login-toggle").prop("checked", true);
        });

        // Register Password Eye Icon Toggle
        $(".register-modal .login-eye").on("click", function() {
            const $registerPassword = $("#register-password");

            if ($registerPassword.attr("type") === "password") {
                $registerPassword.attr("type", "text");
                $(this).attr("src", "icons/i-eye-closed.svg");
            } else {
                $registerPassword.attr("type", "password");
                $(this).attr("src", "icons/i-eye.svg");
            }
        });

    }).fail(function(error) {
        console.error("Error loading register form:", error);
    });

    // User Dropdown
    $(".button-user").on("click", function() {
        $(".user-dropdown").toggleClass("active");
    });

    $(document).on("click", function(e) {
        if (!$(e.target).closest(".button-user, .user-dropdown").length) {
            $(".user-dropdown").removeClass("active");
        }
    });

    // Security Page Password Toggle
    $(".security-field").each(function() {
        const $field = $(this);
        const $securityPassword = $field.find(".security-input");
        const $securityEye = $field.find(".security-toggle-password img");
        const $securityToggle = $field.find(".security-toggle-password");

        $securityToggle.on("click", function() {
            if ($securityPassword.attr("type") === "password") {
                $securityPassword.attr("type", "text");
                $securityEye.attr("src", "icons/i-eye-closed.svg");
                $securityToggle.attr("aria-label", "Hide password");
            } else {
                $securityPassword.attr("type", "password");
                $securityEye.attr("src", "icons/i-eye.svg");
                $securityToggle.attr("aria-label", "Show password");
            }
        });
    });

    // Live Feed Filters
    const $liveFeedSearch = $(".input-search input");
    const $liveFeedCategory = $('input[name="category"]');
    const $liveFeedStatus = $('input[name="status"]');
    const $liveFeedProof = $(".proof input");
    const $liveFeedArticles = $(".articles-live-feed");

    function getFilterLabel(input) {
        return $(input).closest("label").clone().find("img").remove().end().text().trim().toLowerCase().replace(/\s+/g, " ");
    }

    function filterLiveFeed() {
        const searchValue = $liveFeedSearch.val().trim().toLowerCase();

        const selectedCategory = $('input[name="category"]:checked')[0];
        const categoryValue = getFilterLabel(selectedCategory);

        const selectedStatus = $('input[name="status"]:checked')[0];
        const statusValue = getFilterLabel(selectedStatus);

        const proofOnly = $liveFeedProof.prop("checked");

        $liveFeedArticles.each(function() {
            const $article = $(this);

            const articleText = $article.text().toLowerCase();
            const articleCategory = $article.find(".articles-location span:last-child").text().trim().toLowerCase();
            const articleStatus = $article.find(".articles-status").text().trim().toLowerCase();
            const hasProof = $article.find(".articles-proof").length > 0;

            const matchesSearch = articleText.includes(searchValue);
            const matchesCategory = categoryValue.startsWith("all issues") || articleCategory === categoryValue;
            const matchesStatus = statusValue === "all" || articleStatus === statusValue;
            const matchesProof = !proofOnly || hasProof;

            $article.toggle(matchesSearch && matchesCategory && matchesStatus && matchesProof);
        });
    }

    // Search
    $liveFeedSearch.on("input", filterLiveFeed);

    // Issues
    $liveFeedCategory.on("change", filterLiveFeed);

    // Status
    $liveFeedStatus.on("change", filterLiveFeed);

    // With photos/proof only
    $liveFeedProof.on("change", filterLiveFeed);

});
