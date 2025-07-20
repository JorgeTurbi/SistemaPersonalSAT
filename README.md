# SAT-C5i - Sistema de Asignaciones y Traslados

Este proyecto es una plataforma desarrollada con Angular y TailwindCSS que conecta profesionales militares con vacantes disponibles en instituciones aliadas. El sistema facilita la creación de perfiles, la publicación de ofertas y la postulación a vacantes, todo con una interfaz moderna y accesible.

---

## 🛠️ Tecnologías utilizadas

* **Angular 17+** (standalone components)
* **TailwindCSS** para estilos
* **Lucide Angular** para íconos SVG
* **Vite** como servidor de desarrollo
* **Router Angular** para navegación de rutas

---

## 📂 Estructura del proyecto

```
src/
├── app/
│   ├── components/           # Componentes compartidos (navbar, footer, etc.)
│   ├── pages/                # Páginas del sistema
│   ├── sections/             # Secciones como hero, estadísticas, CTA, etc.
│   └── app.routes.ts         # Rutas del proyecto
├── assets/images/            # Imágenes del sistema
├── styles.css                # Estilos globales de Tailwind
└── main.ts                   # Entrada principal de la app
```

---

## 🧑‍💻 Funcionalidades

### 🧭 Navegación principal

* Barra de navegación con selector de idioma (es, en, fr)
* Menú responsive con hamburguesa para móviles

### 🎯 Secciones del home

* **Hero**: mensaje principal + imagen institucional
* **¿Cómo funciona?**: muestra los pasos del proceso (crear perfil, ver vacantes, publicar vacantes)
* **Estadísticas**: indicadores clave con íconos
* **CTA**: llamado a registrarse

### 👤 Registro y autenticación (pendiente en versión actual)

---

## 🧪 Scripts útiles

```bash
# Iniciar el servidor de desarrollo
npm run dev

# Compilar en modo producción
npm run build

# Limpiar la caché de Angular
npx ng cache clean
```

---

## 📦 Instalación

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/sat-c5i-angular.git
cd sat-c5i-angular

# Instala dependencias
npm install

# Ejecuta el proyecto
npm run dev
```

---

## 📐 Tailwind personalizado

```js
// tailwind.config.js
extend: {
  colors: {
    military: {
      navy: '#001F3F',
      green: '#3A5311',
      gold: '#D4AF37',
      gray: '#54585A',
      lightgray: '#E5E5E5'
    }
  },
  backgroundImage: {
    'hero-gradient': 'linear-gradient(to right, #001F3F, #3A5311)',
  },
}
```

---

## 🌐 Ruta del proyecto

| Ruta          | Descripción                       |
| ------------- | --------------------------------- |
| `/`           | Página de inicio                  |
| `/register`   | Formulario de registro            |
| `/jobs`       | Listado de vacantes disponibles   |
| `/create-job` | Formulario para publicar vacantes |

---

## 🔐 Accesibilidad y rendimiento

* El proyecto está optimizado con imágenes escaladas
* Se emplean clases `container` y `w-full` donde corresponde
* Se manejan advertencias como `NG0913` con buenas prácticas

---

## ✨ Créditos

* Desarrollado por Jorge Turbí
* Diseño inspirado en estándares militares adaptados al contexto web

---

## 📃 Licencia

Este proyecto está bajo una licencia de uso interno para entidades del sector defensa. No se distribuye públicamente sin autorización previa.
