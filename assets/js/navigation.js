// ===============================
// NAVIGATION
// ===============================

function initNavigation() {

    const mobileToggle = document.getElementById("mobileToggle");
    const mobileClose = document.getElementById("mobileClose");
    const mobileMenu = document.getElementById("mobileMenu");
    const scrollBtn = document.getElementById("scrollTop");

    // Mobile Menu
    if (mobileToggle && mobileMenu) {

        mobileToggle.addEventListener("click", function () {

            mobileMenu.classList.add("open");

        });

    }

    if (mobileClose && mobileMenu) {

        mobileClose.addEventListener("click", function () {

            mobileMenu.classList.remove("open");

        });

    }

    // Close mobile menu after clicking a link
    if (mobileMenu) {

        mobileMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                mobileMenu.classList.remove("open");

            });

        });

    }

    // Scroll To Top Button
    if (scrollBtn) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 400) {

                scrollBtn.style.opacity = "1";
                scrollBtn.style.pointerEvents = "auto";

            } else {

                scrollBtn.style.opacity = "0";
                scrollBtn.style.pointerEvents = "none";

            }

        });

        scrollBtn.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

    console.log("Navigation initialized");

}

// Export
window.initNavigation = initNavigation;