const components = [
    ["header", "components/header.html"],
    ["navbar", "components/navbar.html"]
];

async function loadComponent(id, file) {
    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`Failed to load ${file}`);
        }

        document.getElementById(id).innerHTML = await response.text();

    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    for (const [id, file] of components) {
        await loadComponent(id, file);
    }
});