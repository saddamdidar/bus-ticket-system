// ============ MOBILE MENU ============
const mobileToggle = document.getElementById("mobileToggle");
const mobileClose = document.getElementById("mobileClose");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
        mobileMenu.classList.add("open");
    });
}

if (mobileClose && mobileMenu) {
    mobileClose.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
    });
}

document.querySelectorAll("#mobileMenu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu?.classList.remove("open");
    });
});

 // ============ SCROLL TOP ============
        const scrollBtn = document.getElementById('scrollTop');
        window.addEventListener('scroll', () => {
            scrollBtn.style.opacity = window.scrollY > 400 ? '1' : '0';
            scrollBtn.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
        });
        scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

        