document.addEventListener('DOMContentLoaded', () => {
    // 1. Capturamos todos los interruptores deslizantes usando su clase común
    const allToggles = document.querySelectorAll('.toggle');

    // Botones de los otros bloques de la página
    const saveButton = document.querySelector('.btn-save');
    const resetPasswordBtn = document.querySelector('.btn-text-link');
    const logoutDeviceButtons = document.querySelectorAll('.btn-logout-device');

    // 2. Control de los interruptores deslizantes de Preferencias
    if (allToggles) {
        allToggles.forEach((toggleButton, index) => {
            toggleButton.addEventListener('click', () => {
                // Alterna la clase 'on' de forma independiente en el botón presionado
                toggleButton.classList.toggle('on');

                // Validamos el estado actual tras el clic
                const isCurrentlyOn = toggleButton.classList.contains('on');

                // [Opcional] Lógica específica para cada botón según su orden en el HTML:
                if (index === 0) {
                    console.log("Modo Oscuro cambiado. ¿Activo?:", isCurrentlyOn);
                } else if (index === 1) {
                    console.log("Autoplay Tráilers cambiado. ¿Activo?:", isCurrentlyOn);
                }
            });
        });
    }

    // 3. Guardar Cambios de Perfil
    if (saveButton) {
        saveButton.addEventListener('click', (e) => {
            e.preventDefault();
            alert('¡Tus cambios de perfil han sido guardados con éxito!');
        });
    }

    // 4. Restablecer Contraseña
    if (resetPasswordBtn) {
        resetPasswordBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Se ha enviado un correo electrónico de restablecimiento seguro a tu dirección registrada.');
        });
    }

    // 5. Cerrar sesión en otros dispositivos de forma dinámica
    if (logoutDeviceButtons) {
        logoutDeviceButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const deviceItem = e.target.closest('.device-item');
                const deviceName = deviceItem.querySelector('.device-name').textContent;

                if (confirm(`¿Estás seguro de que deseas desvincular el dispositivo: ${deviceName}?`)) {
                    deviceItem.style.opacity = '0.5';
                    e.target.disabled = true;
                    e.target.textContent = 'Cerrando...';

                    setTimeout(() => {
                        deviceItem.remove(); // Remueve el elemento de la lista tras la animación
                    }, 1000);
                }
            });
        });
    }
});
