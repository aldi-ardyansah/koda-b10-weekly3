const hamburger = document.querySelector(".nav-hamburger");

// Showing nav menu when click on hamburger icon
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