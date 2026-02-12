# Portafolio y CV - Plantilla Astro

Esta es una plantilla minimalista y configurable para crear un **Portafolio y Currículum Vitae** digital. Está desarrollada con **Astro** para asegurar un rendimiento óptimo, accesibilidad y una excelente experiencia de usuario.

El proyecto está diseñado para que puedas personalizarlo fácilmente con tus propios datos utilizando un archivo JSON, sin necesidad de tocar el código fuente principal.

## 🚀 Tecnologías

-   **[Astro](https://astro.build/)**: Framework web para contenido estático y dinámico.
-   **HTML5 & CSS3**: Maquetación semántica y estilos modernos.
-   **TypeScript**: Para un código más robusto y mantenible.
-   **Diseño Responsivo**: Adaptado a móviles, tablets y escritorio.
-   **Optimización para Impresión**: Estilos específicos (`@media print`) para generar un PDF limpio y profesional directamente desde el navegador.

## 🛠️ Instalación y Configuración

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/tu-repo.git
    cd tu-repo
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Configurar tus datos:**

    El proyecto utiliza un archivo `cv.json` para cargar toda la información. Por seguridad, este archivo está ignorado por Git para proteger tus datos personales.

    -   Renombra el archivo `cv.template.json` a `cv.json`.
    -   Abre `cv.json` y rellena los campos con tu información real (Experiencia, Educación, Proyectos, etc.).

    ```bash
    cp cv.template.json cv.json
    ```

4.  **Iniciar el servidor de desarrollo:**

    ```bash
    npm run dev
    ```

    El sitio estará disponible en `http://localhost:4321`.

## 📄 Generar PDF

Para obtener la versión en PDF del currículum:
1.  Abre el sitio en tu navegador.
2.  Presiona `Ctrl + P` (o `Cmd + P` en Mac).
3.  Selecciona "Guardar como PDF".
4.  Asegúrate de que la opción "Gráficos de fondo" esté activada para conservar los estilos visuales.

## 🚢 Despliegue con Datos Privados (Netlify/Vercel)

Si quieres desplegar tu propio currículum sin hacer público tu archivo `cv.json`:

1.  Copia el contenido de tu archivo `cv.json` local.
2.  Ve a la configuración de tu proyecto en Netlify o Vercel.
3.  En la sección de **Variables de Entorno** (Environment Variables), añade una nueva variable llamada:
    -   **Clave**: `CV_DATA`
    -   **Valor**: [Pega aquí todo el contenido JSON de tu archivo]
4.  Realiza un nuevo despliegue. El script de construcción generará automáticamente tu `cv.json` privado solo para el build.

---

Desarrollado con ❤️ por la comunidad open source.