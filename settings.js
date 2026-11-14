document.addEventListener('DOMContentLoaded', () => {
    // ======================================================================
    // 1. PREFERENCIAS GUARDADAS (localStorage)
    // ======================================================================
    const STORAGE_KEY = 'cineverse-settings';

    const DEFAULTS = {
        name: 'Alex Morgan',
        email: 'alex.morgan@cineverse.com',
        darkMode: true,
        autoplay: true,
        language: 'es'
    };

    function loadSettings() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            return { ...DEFAULTS, ...(saved || {}) };
        } catch {
            return { ...DEFAULTS };
        }
    }

    const settings = loadSettings();

    function updateSettings(partial) {
        Object.assign(settings, partial);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch {
            // Si el navegador bloquea el almacenamiento, la página sigue funcionando
        }
    }

    // ======================================================================
    // 2. AVISO EMERGENTE (reemplaza a los alert())
    // ======================================================================
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);

    let toastTimer;
    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // ======================================================================
    // 3. AVATAR CON INICIALES
    // ======================================================================
    function getInitials(name) {
        const parts = name.trim().split(/\s+/).filter(Boolean);
        if (parts.length === 0) return '?';
        const first = parts[0][0];
        const second = parts[1] ? parts[1][0] : '';
        return (first + second).toUpperCase();
    }

    function updateAvatars(name) {
        const initials = getInitials(name);
        document.querySelectorAll('.avatar').forEach(el => {
            el.textContent = initials;
        });
    }

    // ======================================================================
    // 4. INTERRUPTORES (Modo oscuro, Autoplay)
    // ======================================================================
    // Nota: para que el modo claro se vea, style.css debe definir los colores
    // con variables y tener un bloque :root[data-theme="light"] { ... }
    function applyTheme(isDark) {
        document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    }

    const toggleLabels = {
        darkMode: 'Modo oscuro',
        autoplay: 'Reproducción automática'
    };

    function setToggleState(toggle, isOn) {
        toggle.classList.toggle('on', isOn);
        toggle.setAttribute('aria-checked', String(isOn));
    }

    document.querySelectorAll('.toggle[data-setting]').forEach(toggle => {
        const key = toggle.dataset.setting;

        // Estado inicial según lo guardado
        setToggleState(toggle, Boolean(settings[key]));

        toggle.addEventListener('click', () => {
            const isOn = toggle.getAttribute('aria-checked') !== 'true';
            setToggleState(toggle, isOn);
            updateSettings({ [key]: isOn });

            if (key === 'darkMode') applyTheme(isOn);

            const label = toggleLabels[key] || 'Preferencia';
            showToast(`${label} ${isOn ? 'activada' : 'desactivada'}`);
        });
    });

    applyTheme(settings.darkMode);

    // ======================================================================
    // 5. PERFIL: GUARDAR CAMBIOS
    // ======================================================================
    const profileForm = document.querySelector('.settings-form');
    const nameInput = document.getElementById('profile-name');
    const emailInput = document.getElementById('profile-email');

    if (profileForm && nameInput && emailInput) {
        nameInput.value = settings.name;
        emailInput.value = settings.email;
        updateAvatars(settings.name);

        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!profileForm.checkValidity()) {
                profileForm.reportValidity();
                return;
            }

            updateSettings({
                name: nameInput.value.trim(),
                email: emailInput.value.trim()
            });
            updateAvatars(settings.name);
            showToast('Cambios guardados correctamente');
        });
    }

    // ======================================================================
    // 6. RESTABLECER CONTRASEÑA (simulado)
    // ======================================================================
    const resetPasswordBtn = document.getElementById('reset-password-btn');

    if (resetPasswordBtn) {
        resetPasswordBtn.addEventListener('click', () => {
            showToast('Te enviamos un correo para restablecer tu contraseña');
        });
    }

    // ======================================================================
    // 7. IDIOMA DE LA INTERFAZ (solo guarda la preferencia en esta demo)
    // ======================================================================
    const languageSelect = document.getElementById('language-select');

    if (languageSelect) {
        languageSelect.value = settings.language;

        languageSelect.addEventListener('change', () => {
            updateSettings({ language: languageSelect.value });
            document.documentElement.lang = languageSelect.value;
            const selectedText = languageSelect.options[languageSelect.selectedIndex].text;
            showToast(`Idioma guardado: ${selectedText}`);
        });
    }

    // ======================================================================
    // 8. CERRAR SESIÓN EN OTROS DISPOSITIVOS
    // ======================================================================
    const deviceList = document.querySelector('.device-list');

    if (deviceList) {
        deviceList.addEventListener('click', (e) => {
            const button = e.target.closest('.btn-logout-device');
            if (!button) return;

            const deviceItem = button.closest('.device-item');
            const deviceName = deviceItem.querySelector('.device-name').textContent.trim();

            if (!confirm(`¿Seguro que quieres cerrar la sesión en: ${deviceName}?`)) return;

            deviceItem.style.opacity = '0.5';
            button.disabled = true;
            button.textContent = 'Cerrando...';

            setTimeout(() => {
                deviceItem.remove();
                showToast(`Sesión cerrada en ${deviceName}`);
            }, 1000);
        });
    }

    // ======================================================================
    // 9. BUSCADOR GLOBAL: lleva a Explora con la búsqueda
    // ======================================================================
    const searchInput = document.getElementById('global-search');

    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            e.preventDefault();

            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `explore.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
});
