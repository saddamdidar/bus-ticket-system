const components = [
    ["header", "components/header.html"],
    ["navbar", "components/navbar.html"],
    ["notice-bar", "components/notice-bar.html"],
    ["hero", "components/hero.html"],
    ["ticket-search", "components/ticket-search.html"],
    ["features", "components/features.html"]
];

async function loadComponent(id, file) {
    const response = await fetch(file);

    if (!response.ok) {
        throw new Error(`Cannot load ${file}`);
    }

    document.getElementById(id).innerHTML = await response.text();
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