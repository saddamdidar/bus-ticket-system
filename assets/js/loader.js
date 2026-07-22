async function loadComponent(id, file) {
    const response = await fetch(file);

    if (!response.ok) {
        console.error(`Failed to load ${file}`);
        return;
    }

    document.getElementById(id).innerHTML = await response.text();
}

loadComponent("header", "components/header.html");
loadComponent("header", "components/footer.html");
loadComponent("header", "components/marquee.html");
loadComponent("header", "components/navbar.html");
loadComponent("header", "components/slider.html");
loadComponent("header", "components/ticket-search.html");
