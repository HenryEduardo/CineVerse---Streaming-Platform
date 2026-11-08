// --- 6. LÓGICA DEL MENÚ HAMBURGUESA RESPONSIVE (UNIFICADA) ---
document.addEventListener("DOMContentLoaded", () => {
    const btnHamburguesa = document.getElementById("hamburger-btn");
    const barraLateral = document.getElementById("sidebar");

    if (btnHamburguesa && barraLateral) {

        // Evento al presionar el botón hamburguesa
        btnHamburguesa.addEventListener("click", (e) => {
            e.stopPropagation();
            barraLateral.classList.toggle("open");

            // Cambia dinámicamente el texto del botón
            if (barraLateral.classList.contains("open")) {
                btnHamburguesa.textContent = "✕";
            } else {
                btnHamburguesa.textContent = "☰";
            }
        });

        // Cierra el menú si se hace clic en cualquier enlace del menú lateral
        const linksMenu = document.querySelectorAll(".menu-item");
        linksMenu.forEach(link => {
            link.addEventListener("click", () => {
                barraLateral.classList.remove("open");
                btnHamburguesa.textContent = "☰";
            });
        });

        // Cierra el menú automáticamente si se hace clic fuera de la barra lateral
        document.addEventListener("click", (e) => {
            if (!barraLateral.contains(e.target) && e.target !== btnHamburguesa) {
                barraLateral.classList.remove("open");
                btnHamburguesa.textContent = "☰";
            }
        });
    }
});