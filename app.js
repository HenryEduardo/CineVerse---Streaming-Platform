// ==========================================================================
// 1. BASE DE DATOS DE PELÍCULAS (INICIO)
// ==========================================================================
const PELICULAS = [
    { id: 1, titulo: "Matrix Reloaded", anio: 2003, genero: "Sci-Fi", img: "assets/matrix.png" },
    { id: 2, titulo: "Fin del Mundo", anio: 2025, genero: "Sci-Fi", img: "assets/fin_del_mundo.png" },
    { id: 3, titulo: "Reinas del Drama", anio: 2024, genero: "Drama", img: "assets/reinas.png" },
    { id: 4, titulo: "Alone", anio: 2020, genero: "Thriller", img: "assets/alone.png" },
    { id: 5, titulo: "La Empleada", anio: 2023, genero: "Thriller", img: "assets/empleada.png" },
    { id: 6, titulo: "Indiana Jones", anio: 2023, genero: "Aventura", img: "assets/indiana.png" },
    // Películas del catálogo general para búsqueda global
    { id: 101, titulo: "INCEPTION", anio: 2010, genero: "Sci-Fi", img: "assets/inception.png" },
    { id: 102, titulo: "Past Lives", anio: 2023, genero: "Drama", img: "assets/past_lives.png" },
    { id: 103, titulo: "Interstellar", anio: 2014, genero: "Sci-Fi", img: "assets/interstelar.png" },
    { id: 104, titulo: "Oppenheimer", anio: 2023, genero: "Drama", img: "assets/oppenheimer.png" },
    { id: 105, titulo: "Poor Things", anio: 2023, genero: "Drama", img: "assets/poor_things.png" },
    { id: 106, titulo: "Spider-Man", anio: 2023, genero: "Aventura", img: "assets/spider-man.png" },
    { id: 107, titulo: "Beyond the Divide", anio: 2025, genero: "Aventura", img: "assets/Beyond_the_Divi_poster.png" },
    { id: 108, titulo: "DUNE: Parte dos", anio: 2025, genero: "Sci-Fi", img: "assets/dune.png" },
    { id: 109, titulo: "The Batman", anio: 2025, genero: "Thriller", img: "assets/The_Batman_poster.png" },
    { id: 110, titulo: "The Outsider", anio: 2025, genero: "Thriller", img: "assets/The_Outsider_poster.png" },
    { id: 111, titulo: "Glass House", anio: 2025, genero: "Drama", img: "assets/Glass_House_poster.png" },
    { id: 112, titulo: "Neon District", anio: 2025, genero: "Sci-Fi", img: "assets/Neon_District_poster.png" },
    { id: 113, titulo: "Dark Water", anio: 2025, genero: "Thriller", img: "assets/Dark_Water_poster.png" },
    { id: 114, titulo: "Into the Stillness", anio: 2023, genero: "Thriller", img: "assets/Into_the_Stillness_poster.png" },
    { id: 115, titulo: "Nocturne", anio: 2024, genero: "Thriller", img: "assets/Nocturne_poster.png" },
    { id: 116, titulo: "Blue Hour", anio: 2024, genero: "Drama", img: "assets/Blue_Hour_poster.png" },
];

const PELICULAS_DESTACADAS_IDS = [1, 2, 3, 4, 5, 6];
const GENEROS = ["All", "Sci-Fi", "Drama", "Thriller", "Aventura"];
let filtroActual = "All";
let busquedaActual = "";

// Función para normalizar texto (sin tildes, minúsculas)
function normalizarTexto(texto) {
    return texto
        ? texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
        : "";
}

// 2. Apuntamos a los contenedores del HTML (DOM)
const gridPeliculas = document.getElementById("movies-grid");
const contenedorFiltros = document.getElementById("filter-container");

// Función para filtrar películas según género y término de búsqueda
function obtenerPeliculasFiltradas() {
    const query = normalizarTexto(busquedaActual);

    // Si no hay búsqueda escrita, mostramos las destacadas de inicio
    // Si el usuario escribe una búsqueda, buscamos en todo el catálogo
    const basePeliculas = query
        ? PELICULAS
        : PELICULAS.filter(p => PELICULAS_DESTACADAS_IDS.includes(p.id));

    return basePeliculas.filter(pelicula => {
        const coincideGenero = (filtroActual === "All") || (pelicula.genero === filtroActual);
        if (!query) return coincideGenero;

        const coincideTitulo = normalizarTexto(pelicula.titulo).includes(query);
        const coincideGeneroTexto = normalizarTexto(pelicula.genero).includes(query);
        const coincideAnio = String(pelicula.anio).includes(query);

        return coincideGenero && (coincideTitulo || coincideGeneroTexto || coincideAnio);
    });
}

// 3. Función para pintar las películas en pantalla
function mostrarPeliculas(listaDePeliculas) {
    if (!gridPeliculas) return;
    gridPeliculas.innerHTML = "";

    if (listaDePeliculas.length === 0) {
        gridPeliculas.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                <p style="font-size: 1.1rem; margin-bottom: 0.6rem; color: #fff;">No se encontraron películas para "<strong>${busquedaActual}</strong>"</p>
                <a href="explore.html?q=${encodeURIComponent(busquedaActual)}" style="color: var(--accent-blue); text-decoration: underline; font-size: 0.9rem;">
                    Buscar "${busquedaActual}" en todo el catálogo de Explora ❯
                </a>
            </div>
        `;
        return;
    }

    listaDePeliculas.forEach(pelicula => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("movie-card");

        tarjeta.innerHTML = `
            <div class="poster-container">
                <img src="${pelicula.img}" alt="${pelicula.titulo}" class="movie-poster">
            </div>
            <h3 class="movie-title">${pelicula.titulo}</h3>
            <p class="movie-info">${pelicula.anio} • ${pelicula.genero}</p>
        `;

        gridPeliculas.appendChild(tarjeta);
    });
}

// 4. Función para crear los botones de filtro y controlar los clics
function crearBotonesFiltro() {
    if (!contenedorFiltros) return;
    contenedorFiltros.innerHTML = "";

    GENEROS.forEach(genero => {
        const boton = document.createElement("button");
        boton.classList.add("btn-filter");
        boton.textContent = genero;

        if (genero === filtroActual) {
            boton.classList.add("active");
        }

        boton.addEventListener("click", () => {
            filtroActual = genero;
            crearBotonesFiltro();
            mostrarPeliculas(obtenerPeliculasFiltradas());
        });

        contenedorFiltros.appendChild(boton);
    });
}

// 5. Configurar el buscador global
function configurarBuscador() {
    const searchInput = document.getElementById("global-search");
    if (!searchInput) return;

    // Verificar si hay parámetro ?q= en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const qParam = urlParams.get('q');
    if (qParam) {
        searchInput.value = qParam;
        busquedaActual = qParam;
    }

    // Filtrar en tiempo real al escribir o al limpiar
    const ejecutarBusqueda = (e) => {
        busquedaActual = e.target.value;
        mostrarPeliculas(obtenerPeliculasFiltradas());
    };

    searchInput.addEventListener("input", ejecutarBusqueda);
    searchInput.addEventListener("search", ejecutarBusqueda);

    // Si presiona Enter y no hay resultados locales, redirigir a explore con esa búsqueda
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const resultados = obtenerPeliculasFiltradas();
            if (resultados.length === 0 && busquedaActual.trim() !== "") {
                window.location.href = `explore.html?q=${encodeURIComponent(busquedaActual.trim())}`;
            }
        }
    });
}

// 6. Inicializamos los filtros y películas de la app
document.addEventListener("DOMContentLoaded", () => {
    crearBotonesFiltro();
    configurarBuscador();
    mostrarPeliculas(obtenerPeliculasFiltradas());
});
