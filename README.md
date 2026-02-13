# 📄 CV Portfolio — Astro Theme

Portafolio/CV minimalista, accesible y optimizado para SEO. Construido con [Astro](https://astro.build).

> Basado en el diseño de [Bartosz Jarocki](https://github.com/BartoszJarocki/cv) y [midudev](https://github.com/midudev/minimalist-portfolio-json).

## ✨ Features

- 🌗 **Modo oscuro** con toggle y persistencia en localStorage
- 🖨️ **Optimizado para impresión** — todo cabe en una sola página A4
- 📱 **Responsive** — mobile-first con breakpoints adaptativos
- ♿ **Accesible** — skip link, aria-labels, botones semánticos
- 🔍 **SEO completo** — Open Graph, Twitter Cards, canonical, robots.txt
- ⌨️ **Paleta de comandos** — `Ctrl+K` para navegación rápida
- 🎯 **Datos desde JSON** — todo se configura editando `cv.json`
- 🏷️ **Iconos automáticos** — los highlights muestran iconos de tecnologías
- 🚀 **Deploy seguro** — soporta variable de entorno `CV_DATA` para datos privados

## 🚀 Quick Start

```bash
# Clonar el repositorio
git clone https://github.com/HumbleDev-tech/resume-HumbleDev.git
cd resume-HumbleDev

# Instalar dependencias
npm install

# Editar tu información
cp cv.example.json cv.json
# Edita cv.json con tus datos

# Iniciar dev server
npm run dev
```

## 📝 Personalización

### 1. Editar `cv.json`

Toda tu información personal está en `cv.json`. Edita las secciones:

| Sección | Descripción |
|---|---|
| `basics` | Nombre, título, email, teléfono, URL, foto, ubicación, redes |
| `work` | Experiencia laboral con highlights de tecnologías |
| `education` | Formación académica |
| `certificates` | Certificaciones profesionales |
| `skills` | Conocimientos técnicos (aparecen con iconos automáticamente) |
| `languages` | Idiomas y nivel de fluidez |
| `projects` | Proyectos personales/profesionales |

### 2. Agregar iconos de tecnologías

Los `highlights` en experiencia y proyectos muestran iconos automáticamente si el nombre coincide con un icono registrado en `src/components/Icon.astro`.

**Iconos disponibles:** HTML, CSS, JavaScript, TypeScript, React, React Native, Node.js, Next.js, Python, Astro, Vite, Tailwind CSS, AWS, AWS Amplify, Firebase, MySQL, Git, GitHub, OpenAI API, Anthropic API, Gemini API, y más.

Para agregar un nuevo icono:
1. Crea el SVG en `src/icons/NuevoIcono.astro`
2. Importa y registra en `src/components/Icon.astro`

### 3. Deploy privado con `CV_DATA`

Para mantener tus datos privados en producción:

```bash
# En tu plataforma de deploy (Vercel, Netlify, etc.)
CV_DATA='{"basics":{"name":"Tu Nombre",...}}'
```

El script `scripts/generate-cv.js` genera `cv.json` desde esta variable en build time.

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── Icon.astro          # Mapa centralizado de iconos
│   ├── Section.astro       # Wrapper reutilizable de secciones
│   ├── ThemeToggle.astro   # Toggle de modo oscuro
│   ├── KeyboardManager.astro
│   └── sections/           # Componentes de cada sección del CV
├── icons/                  # SVGs de tecnologías
├── layouts/
│   └── Layout.astro        # Layout base con CSS custom properties
├── pages/
│   └── index.astro         # Página principal
├── cv.d.ts                 # Tipos TypeScript
└── env.d.ts
cv.json                     # TUS datos (gitignored en producción)
cv.example.json             # Template de ejemplo
```

## 📄 Licencia

MIT — Usa, modifica y comparte libremente.