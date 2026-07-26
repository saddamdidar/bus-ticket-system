        // ============ HERO SLIDER ============
const slides = document.querySelectorAll(".slide-item");
const dots = document.querySelectorAll(".slider-dot");

let currentSlide = 0;

function goToSlide(i) {

    if (!slides.length || !dots.length) return;

    slides[currentSlide].classList.remove("active");
    dots[currentSlide].style.background = "rgba(255,255,255,.5)";

    currentSlide = i;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].style.background = "#fff";
}

if (slides.length && dots.length) {

    dots.forEach(dot => {

        dot.addEventListener("click", () => {
            goToSlide(Number(dot.dataset.index));
        });

    });

    setInterval(() => {

        goToSlide((currentSlide + 1) % slides.length);

    }, 4500);

}