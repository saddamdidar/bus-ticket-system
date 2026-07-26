// ===============================
// HERO SLIDER
// ===============================

function initHero() {

    const slides = document.querySelectorAll(".slide-item");
    const dots = document.querySelectorAll(".slider-dot");

    if (!slides.length || !dots.length) {
        console.log("Hero slider not found.");
        return;
    }

    let currentSlide = 0;

    function goToSlide(index) {

        slides[currentSlide].classList.remove("active");
        dots[currentSlide].style.background = "rgba(255,255,255,.5)";

        currentSlide = index;

        slides[currentSlide].classList.add("active");
        dots[currentSlide].style.background = "#ffffff";
    }

    // Dot Click
    dots.forEach((dot, index) => {

        dot.addEventListener("click", function () {
            goToSlide(index);
        });

    });

    // Auto Slide
    setInterval(function () {

        let nextSlide = currentSlide + 1;

        if (nextSlide >= slides.length) {
            nextSlide = 0;
        }

        goToSlide(nextSlide);

    }, 4500);

    console.log("Hero initialized");

}

// Export
window.initHero = initHero;
