document.addEventListener("DOMContentLoaded", function () {
    let header = document.querySelector("header");

    if (!header) {
        console.error("❌ Header не знайдено в DOM!");
        return;
    }

    window.addEventListener("scroll", function () {
        if (window.scrollY > 100) {
            header.classList.add("small");
        } else {
            header.classList.remove("small");
        }
    });
});
