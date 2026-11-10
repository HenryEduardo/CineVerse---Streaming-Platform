// ==========================================================================
// 1. BASE DE DATOS DE PELÍCULAS (CATÁLOGO)
// ==========================================================================
const catalogData = [
    { id: 1, title: "Dune: Part Two", year: 2025, type: "movie", genre: "Sci-Fi", rating: "9.5", img: "assets/dune.png" },
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

// ==========================================================================
// 2. FUNCIÓN ÚNICA DE RENDERIZADO (UNIFICADA Y CORREGIDA)
// ==========================================================================
function renderCards(movies) {
    if (!container) return; // Validación de seguridad
    container.innerHTML = "";
    totalCountEl.textContent = movies.length;

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');

        // Configuramos la acción de abrir el reproductor al hacer clic en la tarjeta
        card.setAttribute('onclick', `openPlayer(${movie.id})`);

        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${movie.img}" alt="${movie.title}">
                <div class="card-rating">
                    <i class="fa-solid fa-star"></i> ${movie.rating}
                </div>
                <!-- Añadida clase 'liked' inicial y el toggle funcional -->
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

// ==========================================================================
// 3. LÓGICA DE FILTRADO (TABS)
// ==========================================================================
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

// ==========================================================================
// 4. FUNCIÓN INTERACTIVA DE FAVORITOS (LIKE)
// ==========================================================================
function toggleLike(event, id) {
    event.stopPropagation(); // Evita que se abra el reproductor al dar clic al corazón
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

// ==========================================================================
// 5. REPRODUCTOR DE VIDEO AVANZADO Y ENLACES (MODAL)
// ==========================================================================
const videoModal = document.getElementById('video-modal');
const modalPlayer = document.getElementById('modal-video-player');
const modalTitle = document.getElementById('modal-video-title');
const modalMeta = document.getElementById('modal-video-meta');
const closeModalBtn = document.getElementById('close-modal-btn');

// URLs de Trailers (Avances) en formato /embed/
const trailerLinks = {
    1: "https://youtube.com", // Dune: Part Two
    2: "https://youtube.com", // The Last Signal
    3: "https://youtube.com"  // Beyond the Divide
};

// URLs de Películas Completas Simuladas
const fullMovieLinks = {
    1: "https://youtube.com&controls=1", 
    2: "https://youtube.com&controls=1", 
    3: "https://youtube.com"
};

// variables de control para la película completa
const fullMovieBtn = document.getElementById('play-full-movie-btn');
const loadingScreen = document.getElementById('movie-loading-screen');
let activeMovieId = null;

// FUNCIÓN PARA ABRIR EL REPRODUCTOR MODAL
function openPlayer(id) {
    const movie = catalogData.find(item => item.id === id);
    if (!movie) return;

    activeMovieId = id; // Guardamos el ID activo globalmente
    if (loadingScreen) loadingScreen.style.display = 'none'; // Limpiamos pantalla de carga previa

    // Asignamos los textos dinámicos al modal
    modalTitle.textContent = movie.title;
    modalMeta.textContent = `${movie.year} • ${movie.genre} • ${movie.type.toUpperCase()}`;

    // Cargamos el trailer correspondiente o uno por defecto
    const videoUrl = trailerLinks[id] || "https://youtube.com";
    modalPlayer.setAttribute('src', videoUrl);

    // Mostramos el modal
    videoModal.classList.add('open');
}

// FUNCIÓN PARA CERRAR EL REPRODUCTOR
function closePlayer() {
    if (videoModal) videoModal.classList.remove('open');
    // Forzamos el vaciado del 'src' para pausar instantáneamente cualquier audio de fondo
    if (modalPlayer) modalPlayer.setAttribute('src', '');
}

// EVENT LISTENERS DE CIERRE
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closePlayer);
}

if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closePlayer();
        }
    });
}

// ==========================================================================
// 6. SIMULACIÓN DE REPRODUCCIÓN DE PELÍCULA COMPLETA
// ==========================================================================
if (fullMovieBtn) {
    fullMovieBtn.addEventListener('click', () => {
        if (!activeMovieId) return;

        // 1. Mostramos la pantalla animada de carga
        if (loadingScreen) loadingScreen.style.display = 'flex';
        
        // 2. Apagamos el tráiler para que no se duplique el audio
        modalPlayer.setAttribute('src', '');

        // 3. Retraso simulado de servidor de 2 segundos para dar realismo
        setTimeout(() => {
            if (loadingScreen) loadingScreen.style.display = 'none';
            
            // 4. Cargamos de forma dinámica el enlace largo correspondiente de fullMovieLinks
            const selectedFullMovie = fullMovieLinks[activeMovieId] || "https://youtube.com&controls=1";
            modalPlayer.setAttribute('src', selectedFullMovie);
        }, 2000);
    });
}

// Carga Inicial del Catálogo completo al abrir la ventana
document.addEventListener('DOMContentLoaded', () => {
    renderCards(catalogData);
});
