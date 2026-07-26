/*
====================================================
Hero Slider
====================================================
*/

let heroInterval = null;

function initHero() {

    console.log("Hero initialized");

    const slides = document.querySelectorAll(".slide-item");
    const dots = document.querySelectorAll(".slider-dot");

    if (!slides.length || !dots.length) {
        return;
    }

    APP_STATE.currentSlide = 0;

    // -----------------------------
    // Show Slide
    // -----------------------------

    function showSlide(index) {

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        dots.forEach(dot => {
            dot.classList.remove("active");
            dot.style.background = "rgba(255,255,255,.5)";
        });

        slides[index].classList.add("active");

        dots[index].classList.add("active");
        dots[index].style.background = "#ffffff";

        APP_STATE.currentSlide = index;

    }

    // -----------------------------
    // Next Slide
    // -----------------------------

    function nextSlide() {

        let next = APP_STATE.currentSlide + 1;

        if (next >= slides.length) {
            next = 0;
        }

        showSlide(next);

    }

    // -----------------------------
    // Previous Slide
    // -----------------------------

    function prevSlide() {

        let prev = APP_STATE.currentSlide - 1;

        if (prev < 0) {
            prev = slides.length - 1;
        }

        showSlide(prev);

    }

    // -----------------------------
    // Dot Click
    // -----------------------------

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showSlide(index);

            restartAutoPlay();

        });

    });

    // -----------------------------
    // Auto Play
    // -----------------------------

    function startAutoPlay() {

        stopAutoPlay();

        heroInterval = setInterval(nextSlide, 4500);

    }

    function stopAutoPlay() {

        if (heroInterval) {

            clearInterval(heroInterval);

            heroInterval = null;

        }

    }

    function restartAutoPlay() {

        stopAutoPlay();

        startAutoPlay();

    }

    // -----------------------------
    // Pause on Hover
    // -----------------------------

    const hero = document.getElementById("hero");

    if (hero) {

        hero.addEventListener("mouseenter", stopAutoPlay);

        hero.addEventListener("mouseleave", startAutoPlay);

    }

    // -----------------------------
    // Swipe Support
    // -----------------------------

    let touchStartX = 0;
    let touchEndX = 0;

    if (hero) {

        hero.addEventListener("touchstart", e => {

            touchStartX = e.changedTouches[0].screenX;

        });

        hero.addEventListener("touchend", e => {

            touchEndX = e.changedTouches[0].screenX;

            const distance = touchStartX - touchEndX;

            if (distance > 50) {

                nextSlide();

                restartAutoPlay();

            }

            if (distance < -50) {

                prevSlide();

                restartAutoPlay();

            }

        });

    }

    // -----------------------------
    // Initialize
    // -----------------------------

    showSlide(0);

    startAutoPlay();

}