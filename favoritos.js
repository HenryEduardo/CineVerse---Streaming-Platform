// ==========================================================================
// 1. BASE DE DATOS DE PELÍCULAS
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

// ==========================================================================
// 2. VIDEOS (solo el ID de YouTube, la URL se arma con buildEmbedUrl)
// ==========================================================================
// Para agregar más: copia el ID que aparece después de "v=" en el enlace de YouTube.
// Ejemplo: https://www.youtube.com/watch?v=jg4-ErdQuXI  ->  ID = jg4-ErdQuXI
const DEFAULT_VIDEO_ID = "jg4-ErdQuXI";

const trailerIds = {
    1: "jg4-ErdQuXI", // Dune: Part Two
    2: "XeKNP8GjAVE", // The Last Signal (video de muestra)
    3: "CnT6XPm41eI",
    // 4: "ID_AQUI",
    // ...
};

const fullMovieIds = {
    1: "jg4-ErdQuXI",
    2: "XeKNP8GjAVE",
    3: "CnT6XPm41eI",
    // 4: "ID_AQUI",
};

// Parámetros pensados para móvil: playsinline evita el pantallazo negro en iPhone.
// No usamos autoplay porque los móviles lo bloquean.
function buildEmbedUrl(videoId) {
    return `https://www.youtube.com/embed/${videoId}?rel=0&playsinline=1&modestbranding=1`;
}

// ==========================================================================
// 3. REFERENCIAS AL DOM
// ==========================================================================
const container = document.getElementById('movies-container');
const totalCountEl = document.getElementById('total-count');
const tabs = document.querySelectorAll('.tab');

const videoModal = document.getElementById('video-modal');
const modalPlayer = document.getElementById('modal-video-player');
const modalTitle = document.getElementById('modal-video-title');
const modalMeta = document.getElementById('modal-video-meta');
const closeModalBtn = document.getElementById('close-modal-btn');
const fullMovieBtn = document.getElementById('play-full-movie-btn');
const loadingScreen = document.getElementById('movie-loading-screen');

let activeMovieId = null;   // Película abierta en el modal
let loadingTimer = null;    // Temporizador de la "carga" de película completa
let activeFilter = 'all';   // Filtro actual (all, movie, series)
let searchQuery = '';       // Búsqueda actual en favoritos

// Función para normalizar texto (sin tildes, minúsculas)
function normalizarTexto(texto) {
    return texto
        ? texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
        : "";
}

// ==========================================================================
// 4. RENDERIZADO DE TARJETAS (una sola función)
// ==========================================================================
function renderCards(movies) {
    if (!container) return;
    container.innerHTML = "";
    if (totalCountEl) totalCountEl.textContent = movies.length;

    if (movies.length === 0) {
        container.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                <p style="font-size: 1.1rem; margin-bottom: 0.5rem; color: #fff;">No se encontraron películas para "<strong>${searchQuery}</strong>"</p>
                <span style="font-size: 0.85rem; color: #64748b;">Intenta con otro título o revisa los filtros</span>
            </div>
        `;
        return;
    }

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.dataset.id = movie.id;
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Ver tráiler de ${movie.title}`);

        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${movie.img}" alt="Póster de ${movie.title}">
                <div class="card-rating">
                    <i class="fa-solid fa-star"></i> ${movie.rating}
                </div>
                <button class="btn-like" type="button" aria-label="Quitar ${movie.title} de favoritos" aria-pressed="true">
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

function applyFilter() {
    let list = activeFilter === 'all'
        ? catalogData
        : catalogData.filter(item => item.type === activeFilter);

    if (searchQuery.trim() !== '') {
        const q = normalizarTexto(searchQuery);
        list = list.filter(item =>
            normalizarTexto(item.title).includes(q) ||
            normalizarTexto(item.genre).includes(q) ||
            String(item.year).includes(q)
        );
    }

    renderCards(list);
}

// ==========================================================================
// 5. FILTROS (Tabs: All, Movies, Series)
// ==========================================================================
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeFilter = tab.getAttribute('data-filter');
        applyFilter();
    });
});

// ==========================================================================
// 6. CLICS EN TARJETAS (delegación de eventos: corazón y abrir reproductor)
// ==========================================================================
function toggleLike(button) {
    const icon = button.querySelector('i');
    icon.classList.toggle('fa-solid');
    icon.classList.toggle('fa-regular');
}

if (container) {
    container.addEventListener('click', (e) => {
        const likeBtn = e.target.closest('.btn-like');
        if (likeBtn) {
            e.stopPropagation(); // No abrir el reproductor al dar clic al corazón
            toggleLike(likeBtn);
            return;
        }

        const card = e.target.closest('.movie-card');
        if (card) openPlayer(Number(card.dataset.id));
    });

    // Accesibilidad: abrir con Enter o Espacio desde el teclado
    container.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        if (e.target.closest('.btn-like')) return;
        const card = e.target.closest('.movie-card');
        if (card) {
            e.preventDefault();
            openPlayer(Number(card.dataset.id));
        }
    });
}

// ==========================================================================
// 7. REPRODUCTOR MODAL
// ==========================================================================
function openPlayer(id) {
    const movie = catalogData.find(item => item.id === id);
    if (!movie) return;

    activeMovieId = id;

    // Reseteamos cualquier carga anterior
    clearTimeout(loadingTimer);
    if (loadingScreen) loadingScreen.style.display = 'none';

    modalTitle.textContent = movie.title;
    modalMeta.textContent = `${movie.year} • ${movie.genre} • ${movie.type.toUpperCase()}`;

    const videoId = trailerIds[id] || DEFAULT_VIDEO_ID;
    modalPlayer.setAttribute('src', buildEmbedUrl(videoId));

    videoModal.classList.add('open');
}

function closePlayer() {
    // Si se cierra mientras "carga" la película completa, cancelamos el temporizador
    clearTimeout(loadingTimer);
    if (loadingScreen) loadingScreen.style.display = 'none';

    videoModal.classList.remove('open');
    // about:blank detiene el video y el audio (un src vacío puede recargar la página)
    modalPlayer.setAttribute('src', 'about:blank');
    activeMovieId = null;
}

if (closeModalBtn) closeModalBtn.addEventListener('click', closePlayer);

// Cerrar al hacer clic en el fondo oscuro
if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) closePlayer();
    });
}

// Cerrar con la tecla Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('open')) {
        closePlayer();
    }
});

// ==========================================================================
// 8. SIMULACIÓN DE PELÍCULA COMPLETA
// ==========================================================================
if (fullMovieBtn) {
    fullMovieBtn.addEventListener('click', () => {
        if (!activeMovieId) return;

        const idAtClick = activeMovieId;

        // 1. Mostramos la pantalla de carga
        loadingScreen.style.display = 'flex';

        // 2. Detenemos el tráiler para que no se mezclen los audios
        modalPlayer.setAttribute('src', 'about:blank');

        // 3. Retraso simulado de 2 segundos
        clearTimeout(loadingTimer);
        loadingTimer = setTimeout(() => {
            loadingScreen.style.display = 'none';

            // 4. Cargamos la película completa correspondiente (o la de respaldo)
            const videoId = fullMovieIds[idAtClick] || DEFAULT_VIDEO_ID;
            modalPlayer.setAttribute('src', buildEmbedUrl(videoId));
        }, 2000);
    });
}

// ==========================================================================
// 9. CONFIGURACIÓN DEL BUSCADOR GLOBAL
// ==========================================================================
function configurarBuscador() {
    const searchInput = document.getElementById("global-search");
    if (!searchInput) return;

    // Verificar si viene con parámetro ?q= en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const qParam = urlParams.get('q');
    if (qParam) {
        searchInput.value = qParam;
        searchQuery = qParam;
    }

    const ejecutarBusqueda = (e) => {
        searchQuery = e.target.value;
        applyFilter();
    };

    searchInput.addEventListener("input", ejecutarBusqueda);
    searchInput.addEventListener("search", ejecutarBusqueda);

    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") e.preventDefault();
    });
}

// ==========================================================================
// 10. CARGA INICIAL
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    configurarBuscador();
    applyFilter();
});
