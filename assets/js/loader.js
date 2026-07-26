const components = [
    ["header", "components/header.html"],
    ["navbar", "components/navbar.html"],
    ["notice-bar", "components/notice-bar.html"],
    ["hero", "components/hero.html"],
    ["ticket-search", "components/ticket-search.html"],
    ["features", "components/features.html"],
    ["popular-routes", "components/popular-routes.html"],
    ["why-choose-us", "components/why-choose-us.html"],
    ["top-bar", "components/top-bar.html"],
    ["mobile-menu", "components/mobile-menu.html"],
    ["fare", "components/fare.html"],
    ["counters", "components/counters.html"],
    ["contact", "components/contact.html"],
    ["footer", "components/footer.html"]
];

async function loadComponent(id, file) {
    console.log("Loading:", id);

    const response = await fetch(file);

    if (!response.ok) {
        throw new Error(`Cannot load ${file}`);
    }

    document.getElementById(id).innerHTML = await response.text();

    console.log("Loaded:", id);
}


async function initializePage() {

    for (const [id, file] of components) {
        await loadComponent(id, file);
    }

    // Call page initialization only after all components are loaded
    if (typeof initializeApp === "function") {
        initializeApp();
    }
}

document.addEventListener("DOMContentLoaded", initializePage);