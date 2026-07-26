// ===============================
// APPLICATION INITIALIZER
// ===============================

function initializeApp() {

    console.log("Initializing application...");

    if (typeof initNavigation === "function") {
        initNavigation();
    }

    if (typeof initHero === "function") {
        initHero();
    }

    if (typeof initBooking === "function") {
        initBooking();
    }

    if (typeof initContact === "function") {
        initContact();
    }

    console.log("Application initialized successfully.");

}