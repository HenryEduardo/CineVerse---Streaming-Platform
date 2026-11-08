// Base de datos de películas basadas en la UI original
const catalogData = [
    { id: 1, title: "Dune: Part Two", year: 2025, type: "movie", genre: "Sci-Fi", rating: "9.5", img: "assets/Dune.png" },
    { id: 2, title: "The Last Signal", year: 2024, type: "series", genre: "Mystery", rating: "6.2", img: "assets/The_Last_Signal_poster.png" },
    { id: 3, title: "Beyond the Divide", year: 2023, type: "movie", genre: "Adventure", rating: "7.8", img: "assets/Beyond_the_Divi_poster.png" },
    { id: 4, title: "Nocturne", year: 2024, type: "movie", genre: "Sci-Fi", rating: "8.0", img: "assets/Nocturne_poster.png" },
    { id: 5, title: "Neon District", year: 2025, type: "movie", genre: "Action", rating: "8.7", img: "assets/Neon_District_poster.png" },
    { id: 6, title: "Into the Stillness", year: 2023, type: "movie", genre: "Thriller", rating: "9.0", img: "assets/Into_the_Stillness_poster.png" },
    { id: 7, title: "Glass House", year: 2024, type: "series", genre: "Drama", rating: "8.5", img: "assets/Glass_House_poster.png" },
    { id: 8, title: "Stone & Sky", year: 2023, type: "movie", genre: "Adventure", rating: "9.2", img: "assets/Stone_&_Sky_poster.png" },
    { id: 9, title: "Dark Water", year: 2025, type: "series", genre: "Mystery", rating: "9.2", img: "assets/Dark_Water_poster.png" },
    { id: 10, title: "Blue Hour", year: 2024, type: "series", genre: "Crime", rating: "8.3", img: "assets/Blue_Hour_poster.png" }
];

const container = document.getElementById('movies-container');
const totalCountEl = document.getElementById('total-count');
const tabs = document.querySelectorAll('.tab');

// FUNCIÓN PARA RENDERIZAR LAS TARJETAS
function renderCards(movies) {
    if (!container) return; // Validación de seguridad
    container.innerHTML = "";
    totalCountEl.textContent = movies.length;

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');

        // Corregido: El corazón inicia con "fa-solid" y agregamos una clase de control para estilos
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${movie.img}" alt="${movie.title}">
                <div class="card-rating">
                    <i class="fa-solid fa-star"></i> ${movie.rating}
                </div>
                <button class="btn-like" onclick="toggleLike(event, ${movie.id})">
                    <i class="fa-solid fa-heart liked"></i>
                </button>
                <div class="play-overlay">
                    <div class="play-btn"><i class="fa-solid fa-play"></i></div>
                </div>
            </div>
            <div class="card-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-metadata">${movie.year} • ${movie.genre} • ${movie.type.charAt(0).toUpperCase() + movie.type.slice(1)}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

// LOGICA DE FILTRADO (Tabs: All, Movies, Series)
tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        tabs.forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');

        const filterValue = e.target.getAttribute('data-filter');

        if (filterValue === 'all') {
            renderCards(catalogData);
        } else {
            const filtered = catalogData.filter(item => item.type === filterValue);
            renderCards(filtered);
        }
    });
});

// FUNCIÓN PARA DAR/REMOVER LIKE (Corregida y unificada)
function toggleLike(event, id) {
    event.stopPropagation(); // Evita que se abra la película al dar clic al corazón
    const button = event.currentTarget;
    const icon = button.querySelector('i');

    // Alterna la clase para rellenar (fa-solid) o vaciar (fa-regular) el icono del corazón
    if (icon.classList.contains('fa-solid')) {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
    } else {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
    }
}

// Carga Inicial
document.addEventListener('DOMContentLoaded', () => {
    renderCards(catalogData);
});





// --- REPRODUCTOR DE VIDEO AVANZADO ---

// Referencias a los nuevos elementos del DOM del Modal
const videoModal = document.getElementById('video-modal');
const modalPlayer = document.getElementById('modal-video-player');
const modalTitle = document.getElementById('modal-video-title');
const modalMeta = document.getElementById('modal-video-meta');
const closeModalBtn = document.getElementById('close-modal-btn');

// URLs de Trailers de muestra para simular el reproductor
const trailerLinks = {
    1: "https://www.youtube.com/embed/jg4-ErdQuXI", // Dune: Part Two
    2: "https://www.youtube.com/embed/XeKNP8GjAVE", // Samples genéricos
    3: "https://youtube.com"
};
const fullMovieLinks = {
    1: "https://www.youtube.com/embed/jg4-ErdQuXI", // Dune: Part Two
    2: "https://www.youtube.com/embed/XeKNP8GjAVE", // Samples genéricos
    3: "https://youtube.com"
};

// MODIFICACIÓN EN TU FUNCIÓN RENDER CARDS:
// Asegúrate de añadir el atributo onclick="openPlayer(${movie.id})" a la tarjeta completa
function renderCards(movies) {
    if (!container) return;
    container.innerHTML = "";
    totalCountEl.textContent = movies.length;

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');

        // CORREGIDO: Al hacer click en la tarjeta se abre el reproductor
        card.setAttribute('onclick', `openPlayer(${movie.id})`);

        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${movie.img}" alt="${movie.title}">
                <div class="card-rating">
                    <i class="fa-solid fa-star"></i> ${movie.rating}
                </div>
                <button class="btn-like" onclick="toggleLike(event, ${movie.id})">
                    <i class="fa-solid fa-heart"></i>
                </button>
                <div class="play-overlay">
                    <div class="play-btn"><i class="fa-solid fa-play"></i></div>
                </div>
            </div>
            <div class="card-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-metadata">${movie.year} • ${movie.genre} • ${movie.type.charAt(0).toUpperCase() + movie.type.slice(1)}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

// FUNCIÓN PARA ABRIR EL REPRODUCTOR MODAL
function openPlayer(id) {
    // Buscamos la película seleccionada dentro de la base de datos catalogData
    const movie = catalogData.find(item => item.id === id);
    if (!movie) return;

    // Asignamos los textos dinámicos al modal
    modalTitle.textContent = movie.title;
    modalMeta.textContent = `${movie.year} • ${movie.genre} • ${movie.type.toUpperCase()}`;

    // Si tenemos un enlace de video asignado lo cargamos, de lo contrario un trailer por defecto
    const videoUrl = trailerLinks[id] || "https://youtube.com";
    modalPlayer.setAttribute('src', videoUrl);

    // Activamos la clase CSS para mostrarlo en pantalla con transición
    videoModal.classList.add('open');
}

// FUNCIÓN PARA CERRAR EL REPRODUCTOR
function closePlayer() {
    videoModal.classList.remove('open');
    // Es muy importante limpiar el 'src' al cerrar para pausar el audio del video de fondo
    modalPlayer.setAttribute('src', '');
}

// EVENT LISTENERS DE CIERRE
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closePlayer);
}

// Cerrar si el usuario hace clic afuera de la caja del video (en el fondo oscuro)
if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closePlayer();
        }
    });
}


// ---VIDEO COMPLETO---
// Referencias a los nuevos elementos del DOM
const fullMovieBtn = document.getElementById('play-full-movie-btn');
const loadingScreen = document.getElementById('movie-loading-screen');

// Variable global interna para saber qué ID de película está activo
let activeMovieId = null;

// Modificación de la función openPlayer existente para guardar el ID activo
function openPlayer(id) {
    const movie = catalogData.find(item => item.id === id);
    if (!movie) return;

    activeMovieId = id; // Guardamos el ID de la película que abrió el usuario
    if (loadingScreen) loadingScreen.style.display = 'none'; // Reseteamos la carga

    modalTitle.textContent = movie.title;
    modalMeta.textContent = `${movie.year} • ${movie.genre} • ${movie.type.toUpperCase()}`;

    const videoUrl = trailerLinks[id] || "https://youtube.com";
    modalPlayer.setAttribute('src', videoUrl);

    videoModal.classList.add('open');
}

// LOGICA PARA SIMULAR LA PELÍCULA COMPLETA
if (fullMovieBtn) {
    fullMovieBtn.addEventListener('click', () => {
        if (!activeMovieId) return; // Si no hay ninguna tarjeta abierta, no hace nada

        // 1. Mostramos la pantalla de animación de carga en el reproductor
        loadingScreen.style.display = 'flex';

        // 2. Apagamos momentáneamente el tráiler de YouTube de fondo para que no se mezclen los audios
        modalPlayer.setAttribute('src', '');

        // 3. Simulamos un retraso de carga del servidor de 2 segundos
        setTimeout(() => {
            // Ocultamos la pantalla de carga
            loadingScreen.style.display = 'none';

            // 4. DINÁMICO: Buscamos el enlace de la película completa que le corresponde al ID activo
            // Si el ID no tiene un video asignado en la lista, cargará un video de respaldo por defecto
            const selectedFullMovie = fullMovieLinks[activeMovieId] || "https://youtube.com";

            // 5. Inyectamos la película correspondiente en el reproductor modal
            modalPlayer.setAttribute('src', selectedFullMovie);
        }, 2000);
    });
}
