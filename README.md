# 🎬 CineVerse - Streaming Platform

Interfaz web de una plataforma de streaming de películas y series, creada con **HTML, CSS y JavaScript puro** (sin frameworks ni librerías). Es un proyecto de portafolio con fines educativos: no es un servicio real de streaming.

🔗 **Demo en vivo:** [henryeduardo.github.io/CineVerse---Streaming-Platform](https://henryeduardo.github.io/CineVerse---Streaming-Platform/index.html)

![Vista previa de CineVerse](screenshots/preview.png)

---

## ✨ Funcionalidades

- **Navegación entre páginas:** Inicio, Explora, Favoritos y Configuración, con barra lateral y encabezado compartidos.
- **Favoritos:**
  - Tarjetas generadas dinámicamente con JavaScript a partir de un catálogo de datos.
  - Filtros por tipo (Todas, Películas, Series).
  - Buscador en tiempo real por título, género o año (ignora tildes y mayúsculas).
  - Contador de ítems y mensaje cuando no hay resultados.
- **Reproductor de tráilers:** ventana modal con video de YouTube incrustado, pensada para funcionar en escritorio y móvil. Se cierra con la tecla `Esc`, el botón de cierre o haciendo clic fuera.
- **Configuración:**
  - Edición de perfil con validación de formulario.
  - Interruptores de preferencias accesibles (`role="switch"`).
  - Preferencias guardadas en `localStorage`.
  - Cierre de sesión simulado en otros dispositivos.
  - Avisos emergentes no bloqueantes.
- **Diseño responsive:** se adapta a escritorio, tablet y teléfono.
- **Accesibilidad:** etiquetas `aria-label`, formularios con `label` enlazados, navegación por teclado y estados de foco visibles.

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica de las páginas |
| CSS3 | Variables CSS, Flexbox, Grid, media queries, animaciones |
| JavaScript (ES6+) | Renderizado dinámico, filtros, buscador, modal, `localStorage` |
| Font Awesome 6 | Íconos |
| GitHub Pages | Publicación del sitio |

## 📁 Estructura del proyecto

```
CineVerse---Streaming-Platform/
├── index.html
├── explore.html
├── favoritos.html
├── settings.html
├── style.css              # Estilos globales
├── favoritos.style.css    # Estilos de Favoritos y del modal
├── settings.css           # Estilos de Configuración
├── global.js              # Lógica compartida (menú, etc.)
├── favoritos.js           # Catálogo, filtros, buscador y reproductor
├── settings.js            # Perfil, preferencias y sesiones
├── assets/                # Pósters e imágenes
└── screenshots/           # Capturas para este README
```

## 🚀 Cómo ejecutarlo en local

No necesita instalación ni dependencias.

1. Clona el repositorio:
   ```bash
   git clone https://github.com/henryeduardo/CineVerse---Streaming-Platform.git
   ```
2. Entra a la carpeta:
   ```bash
   cd CineVerse---Streaming-Platform
   ```
3. Abre `index.html` en tu navegador, o usa la extensión **Live Server** de VS Code.

## 📱 Capturas

| Favoritos | Reproductor de tráiler | Configuración |
|---|---|---|
| ![Favoritos](screenshots/favoritos.png) | ![Reproductor](screenshots/reproductor.png) | ![Configuración](screenshots/settings.png) |

## 🧠 Lo que aprendí

- Generar interfaces dinámicas con JavaScript a partir de datos.
- Filtrar y buscar contenido en tiempo real combinando varios criterios.
- Incrustar videos de YouTube y resolver problemas de visualización en móviles.
- Diseñar layouts adaptables con CSS Grid, Flexbox y `aspect-ratio`.
- Aplicar buenas prácticas de accesibilidad (ARIA, etiquetas, foco, teclado).
- Guardar preferencias del usuario con `localStorage`.

## 🔮 Próximas mejoras

- [ ] Tema claro con variables CSS.
- [ ] Guardar los favoritos en `localStorage`.
- [ ] Buscador conectado entre todas las páginas.
- [ ] Soporte real de varios idiomas.

## ⚖️ Aviso

Este es un proyecto de demostración con fines educativos. Los pósters, tráilers y marcas pertenecen a sus respectivos dueños, y CineVerse no aloja ni distribuye contenido protegido.

## 👤 Autor

**Tu Nombre**

- GitHub: [@henryeduardo](https://github.com/henryeduardo)
- Portafolio: [tu-portafolio.com](https://tu-portafolio.com)
- LinkedIn: [tu-perfil](https://linkedin.com/in/tu-perfil)
