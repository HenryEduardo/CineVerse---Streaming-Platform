// ==========================================================================
// 1. BASE DE DATOS UNIFICADA DE PELÍCULAS CON RUTAS LOCALES Y GÉNERO
// ==========================================================================
const TENDENCIAS = [
    { id: 101, titulo: "INCEPTION",          anio: 2010, rating: "8.8", match: "98%", genero: "action",  img: "assets/inception.png" },
    { id: 102, titulo: "Past Lives",         anio: 2023, rating: "7.9", match: "95%", genero: "comedy",  img: "assets/past_lives.png" },
    { id: 103, titulo: "Interstellar",       anio: 2014, rating: "8.7", match: "99%", genero: "action",  img: "assets/interstelar.png" },
    { id: 104, titulo: "Oppenheimer",        anio: 2023, rating: "8.4", match: "91%", genero: "action",  img: "assets/oppenheimer.png" },
    { id: 105, titulo: "Poor Things",        anio: 2023, rating: "7.9", match: "87%", genero: "comedy",  img: "assets/poor_things.png" },
    { id: 106, titulo: "Spider-Man",         anio: 2023, rating: "8.6", match: "96%", genero: "action",  img: "assets/spider-man.png" },
    { id: 107, titulo: "Beyond the Divide",  anio: 2025, rating: "6.5", match: "80%", genero: "anime",   img: "assets/Beyond_the_Divi_poster.png" },
    { id: 108, titulo: "DUNE: Parte dos",    anio: 2025, rating: "6.5", match: "80%", genero: "action",  img: "assets/dune.png" },
    { id: 109, titulo: "The Batman",         anio: 2025, rating: "6.5", match: "80%", genero: "action",  img: "assets/The_Batman_poster.png" },
    { id: 110, titulo: "The Outsider",       anio: 2025, rating: "6.5", match: "80%", genero: "horror",  img: "assets/The_Outsider_poster.png" },
    { id: 111, titulo: "Glass House",        anio: 2025, rating: "6.5", match: "80%", genero: "horror",  img: "assets/Glass_House_poster.png" },
    { id: 112, titulo: "Neon District",      anio: 2025, rating: "8.7", match: "94%", genero: "action",  img: "assets/Neon_District_poster.png" },
    { id: 113, titulo: "Dark Water",         anio: 2025, rating: "9.2", match: "94%", genero: "horror",  img: "assets/Dark_Water_poster.png" },
    { id: 114, titulo: "Into the Stillness", anio: 2023, rating: "9.0", match: "92%", genero: "horror",  img: "assets/Into_the_Stillness_poster.png" },
    { id: 115, titulo: "Nocturne",           anio: 2024, rating: "8.0", match: "86%", genero: "horror",  img: "assets/Nocturne_poster.png" },
    { id: 116, titulo: "Blue Hour",          anio: 2024, rating: "8.3", match: "85%", genero: "comedy",  img: "assets/Blue_Hour_poster.png" },
    { id: 117, titulo: "The Last Signal",    anio: 2024, rating: "6.2", match: "78%", genero: "anime",   img: "assets/The_Last_Signal_poster.png" },
    { id: 118, titulo: "Stone & Sky",        anio: 2023, rating: "9.2", match: "97%", genero: "anime",   img: "assets/Stone_&_Sky_poster.png" },
    { id: 119, titulo: "Matrix Reloaded",    anio: 2003, rating: "8.5", match: "95%", genero: "action",  img: "assets/matrix.png" },
    { id: 120, titulo: "Fin del Mundo",      anio: 2025, rating: "7.8", match: "88%", genero: "action",  img: "assets/fin_del_mundo.png" },
    { id: 121, titulo: "Reinas del Drama",   anio: 2024, rating: "8.0", match: "89%", genero: "comedy",  img: "assets/reinas.png" },
    { id: 122, titulo: "Alone",              anio: 2020, rating: "7.2", match: "82%", genero: "horror",  img: "assets/alone.png" },
    { id: 123, titulo: "La Empleada",        anio: 2023, rating: "7.5", match: "84%", genero: "horror",  img: "assets/empleada.png" },
    { id: 124, titulo: "Indiana Jones",      anio: 2023, rating: "8.1", match: "90%", genero: "action",  img: "assets/indiana.png" },
];

// Estado global de filtrado
let generoActivo = null;
let busquedaActiva = "";

// Función para normalizar texto (sin tildes, minúsculas)
function normalizarTexto(texto) {
    return texto
        ? texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
        : "";
}

// ==========================================================================
// 2. INICIALIZACIÓN
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    configurarBuscador();
    actualizarCarruseles(null);
    configurarFiltrosGenero();
    configurarSelectGenero();
    configurarFlechasCarrusel();
});

// ==========================================================================
// 3. RENDERIZADO DE CARRUSELES
// ==========================================================================

// Carrusel 1: Tendencia Mundial (con número de ranking 1, 2, 3...)
function renderTendencias(peliculas) {
    const container = document.getElementById("tendencias-grid") || document.querySelector(".movies-carousel-grid.ranked");
    if (!container) return;

    container.innerHTML = "";

    if (peliculas.length === 0) {
        container.innerHTML = `
            <div class="no-results" style="padding: 2.5rem 1rem; color: var(--text-muted); font-size: 0.95rem;">
                <p style="color: #fff; margin-bottom: 0.3rem;">No se encontraron películas para "<strong>${busquedaActiva}</strong>"</p>
                <span style="font-size: 0.85rem; color: #64748b;">Intenta con otro término o desmarca el género seleccionado</span>
            </div>
        `;
        return;
    }

    peliculas.forEach((movie, index) => {
        const card = document.createElement("div");
        card.classList.add("movie-rank-card");
        card.innerHTML = `
            <div class="explore-poster-box">
                <div class="rank-number">${index + 1}</div>
                <img src="${movie.img}" alt="${movie.titulo}" onerror="this.src='https://placehold.co/185x277/131520/9ca3af?text=Sin+imagen'">
                <button class="btn-bookmark" aria-label="Guardar ${movie.titulo}">
                    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 16V1L13 1V16L7 11L1 16Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="movie-details">
                <h4 class="explore-movie-title">${movie.titulo}</h4>
                <p class="explore-movie-meta">
                    <span class="match-text">${movie.match} match</span> • ${movie.anio} • <span class="rating-star">★</span> ${movie.rating}
                </p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Carrusel 2: Recién puesto en CineVerse (mismas fichas pero sin número de ranking)
function renderRecientes(peliculas) {
    const container = document.getElementById("recientes-grid");
    if (!container) return;

    container.innerHTML = "";

    if (peliculas.length === 0) {
        container.innerHTML = `
            <div class="no-results" style="padding: 2.5rem 1rem; color: var(--text-muted); font-size: 0.95rem;">
                <p style="color: #fff; margin-bottom: 0.3rem;">No se encontraron películas para "<strong>${busquedaActiva}</strong>"</p>
                <span style="font-size: 0.85rem; color: #64748b;">Intenta con otro término o desmarca el género seleccionado</span>
            </div>
        `;
        return;
    }

    peliculas.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-standard-card");
        card.innerHTML = `
            <div class="explore-poster-box">
                <img src="${movie.img}" alt="${movie.titulo}" onerror="this.src='https://placehold.co/185x277/131520/9ca3af?text=Sin+imagen'">
                <button class="btn-bookmark" aria-label="Guardar ${movie.titulo}">
                    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 16V1L13 1V16L7 11L1 16Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="movie-details">
                <h4 class="explore-movie-title">${movie.titulo}</h4>
                <p class="explore-movie-meta">
                    <span class="match-text">${movie.match} match</span> • ${movie.anio} • <span class="rating-star">★</span> ${movie.rating}
                </p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Función que filtra las películas combinando género y texto de búsqueda
function filtrarPeliculas(genero = generoActivo) {
    let peliculas = genero
        ? TENDENCIAS.filter(m => m.genero.toLowerCase() === genero.toLowerCase())
        : TENDENCIAS;

    if (busquedaActiva.trim() !== "") {
        const query = normalizarTexto(busquedaActiva);
        peliculas = peliculas.filter(m =>
            normalizarTexto(m.titulo).includes(query) ||
            normalizarTexto(m.genero).includes(query) ||
            String(m.anio).includes(query)
        );
    }

    return peliculas;
}

// Actualiza ambos carruseles según el filtro activo y búsqueda
function actualizarCarruseles(genero = generoActivo) {
    const peliculas = filtrarPeliculas(genero);

    renderTendencias(peliculas);
    renderRecientes(peliculas);

    // Reiniciar scroll al principio de cada carrusel al filtrar
    const c1 = document.getElementById("tendencias-grid");
    const c2 = document.getElementById("recientes-grid");
    if (c1) c1.scrollLeft = 0;
    if (c2) c2.scrollLeft = 0;
}

// ==========================================================================
// 4. LÓGICA DE FILTRADO POR TARJETAS DE GÉNERO (Action, Comedy, Horror, Anime)
// ==========================================================================
function configurarFiltrosGenero() {
    const genreCards = document.querySelectorAll(".genre-card");
    const selectGenre = document.getElementById("filter-genre");

    genreCards.forEach(card => {
        const claseGenero = [...card.classList].find(c => c.startsWith("genre-card-") && c !== "genre-card");
        if (!claseGenero) return;
        const genero = claseGenero.replace("genre-card-", ""); // "action", "comedy", "horror", "anime"

        card.addEventListener("click", () => {
            // Si ya estaba activo, se desactiva (toggle) y vuelve a mostrar todas las fichas
            if (generoActivo === genero) {
                generoActivo = null;
                genreCards.forEach(c => c.classList.remove("genre-card--active"));
                if (selectGenre) selectGenre.value = "All genres";
                actualizarCarruseles(null);
                return;
            }

            // Activar la tarjeta seleccionada y desactivar las demás
            genreCards.forEach(c => c.classList.remove("genre-card--active"));
            card.classList.add("genre-card--active");
            generoActivo = genero;

            // Sincronizar el select del header si existe
            if (selectGenre) {
                const opcion = [...selectGenre.options].find(o => o.value.toLowerCase() === genero.toLowerCase());
                if (opcion) selectGenre.value = opcion.value;
            }

            // Filtrar ambos carruseles directamente
            actualizarCarruseles(genero);
        });
    });
}

// Sincronizar también con el select dropdown de género en el header
function configurarSelectGenre() {
    const selectGenre = document.getElementById("filter-genre");
    if (!selectGenre) return;

    selectGenre.addEventListener("change", (e) => {
        const val = e.target.value.toLowerCase();
        const genreCards = document.querySelectorAll(".genre-card");

        genreCards.forEach(c => c.classList.remove("genre-card--active"));

        if (val === "all genres" || val === "") {
            generoActivo = null;
            actualizarCarruseles(null);
        } else {
            generoActivo = val;
            const targetCard = document.querySelector(`.genre-card-${val}`);
            if (targetCard) targetCard.classList.add("genre-card--active");
            actualizarCarruseles(val);
        }
    });
}
const configurarSelectGenero = configurarSelectGenre;

// ==========================================================================
// 5. CONFIGURACIÓN DEL BUSCADOR GLOBAL
// ==========================================================================
function configurarBuscador() {
    const searchInput = document.getElementById("global-search");
    if (!searchInput) return;

    // Verificar si viene con parámetro ?q= en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const qParam = urlParams.get('q');
    if (qParam) {
        searchInput.value = qParam;
        busquedaActiva = qParam;
    }

    const ejecutarBusqueda = (e) => {
        busquedaActiva = e.target.value;
        actualizarCarruseles(generoActivo);
    };

    searchInput.addEventListener("input", ejecutarBusqueda);
    searchInput.addEventListener("search", ejecutarBusqueda);

    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") e.preventDefault();
    });
}

// ==========================================================================
// 6. LÓGICA DE INTERACTIVIDAD (FLECHAS DE DESPLAZAMIENTO)
// ==========================================================================
function configurarFlechasCarrusel() {
    const secciones = document.querySelectorAll(".explore-carousel-section");

    secciones.forEach(seccion => {
        const btnIzquierda = seccion.querySelector(".carousel-arrows .btn-left");
        const btnDerecha = seccion.querySelector(".carousel-arrows .btn-right");
        const contenedorPeliculas = seccion.querySelector(".movies-carousel-grid");

        if (btnIzquierda && btnDerecha && contenedorPeliculas) {
            btnDerecha.addEventListener("click", () => {
                contenedorPeliculas.scrollLeft += 400;
            });

            btnIzquierda.addEventListener("click", () => {
                contenedorPeliculas.scrollLeft -= 400;
            });
        }
    });
}
