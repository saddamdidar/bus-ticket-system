/*
====================================================
Navigation
====================================================
*/

function initNavigation() {

    console.log("Navigation initialized");

    const mobileMenu = document.getElementById("mobileMenu");
    const mobileToggle = document.getElementById("mobileToggle");
    const mobileClose = document.getElementById("mobileClose");
    const scrollTop = document.getElementById("scrollTop");

    // -----------------------------
    // Mobile Menu
    // -----------------------------

    if (mobileToggle && mobileMenu) {

        mobileToggle.addEventListener("click", () => {

            mobileMenu.classList.add("open");

            document.body.style.overflow = "hidden";

        });

    }

    if (mobileClose && mobileMenu) {

        mobileClose.addEventListener("click", closeMobileMenu);

    }

    // -----------------------------
    // Close Menu when clicking link
    // -----------------------------

    if (mobileMenu) {

        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMobileMenu);

        });

    }

    function closeMobileMenu() {

        mobileMenu.classList.remove("open");

        document.body.style.overflow = "";

    }

    // -----------------------------
    // Scroll To Top Button
    // -----------------------------

    if (scrollTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 400) {

                scrollTop.style.opacity = "1";
                scrollTop.style.pointerEvents = "auto";

            } else {

                scrollTop.style.opacity = "0";
                scrollTop.style.pointerEvents = "none";

            }

        });

        scrollTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    // -----------------------------
    // Active Menu
    // -----------------------------

    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {

        link.addEventListener("click", function () {

            links.forEach(item => {

                item.classList.remove(
                    "text-khan-blue",
                    "font-semibold"
                );

            });

            this.classList.add(
                "text-khan-blue",
                "font-semibold"
            );

        });

    });

}