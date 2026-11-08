// 1. Simulamos una Base de Datos real con un Array de Objetos
const PELICULAS = [
    { id: 1, titulo: "Matrix Reloaded", anio: 2003, genero: "Sci-Fi", img: "assets/matrix.png" },
    { id: 2, titulo: "Fin del Mundo", anio: 2025, genero: "Sci-Fi", img: "assets/fin_del_mundo.png" },
    { id: 3, titulo: "Reinas del Drama", anio: 2024, genero: "Drama", img: "assets/reinas.png" },
    { id: 4, titulo: "Alone", anio: 2020, genero: "Thriller", img: "assets/alone.png" },
    { id: 5, titulo: "La Empleada", anio: 2023, genero: "Thriller", img: "assets/empleada.png" },
    { id: 6, titulo: "Indiana Jones", anio: 2023, genero: "Aventura", img: "assets/indiana.png" },
];

const GENEROS = ["All", "Sci-Fi", "Drama", "Thriller", "Aventura"];
let filtroActual = "All";

// 2. Apuntamos a los contenedores del HTML (DOM)
const gridPeliculas = document.getElementById("movies-grid");
const contenedorFiltros = document.getElementById("filter-container");

// 3. Función para pintar las películas en pantalla
function mostrarPeliculas(listaDePeliculas) {
    gridPeliculas.innerHTML = "";

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

            const peliculasFiltradas = (filtroActual === "All")
                ? PELICULAS
                : PELICULAS.filter(p => p.genero === filtroActual);

            mostrarPeliculas(peliculasFiltradas);
        });

        contenedorFiltros.appendChild(boton);
    });
}

// 5. Inicializamos los filtros y películas de la app
crearBotonesFiltro();
mostrarPeliculas(PELICULAS);



