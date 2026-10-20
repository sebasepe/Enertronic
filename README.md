# Enertronic — Portal Corporativo & Telemetría Industrial

Portal web oficial de **Enertronic Ingeniería S.A.C.**, empresa peruana especializada en telemetría industrial, automatización de procesos críticos y sistemas SCADA / IIoT.

Desarrollado en **Angular 21** con arquitectura Standalone Components, SSR (Server-Side Rendering) / SSG (Static Site Generation), Angular Signals y soporte bilingüe (Español / Inglés).

---

## Inicio Rápido

### Requisitos
- **Node.js**: v20 o superior (recomendado v22+)
- **NPM**: v10 o superior

### Comandos de Desarrollo
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo local (http://localhost:4200)
npm start

# Regenerar el sitemap.xml manualmente
npm run sitemap

# Compilar para producción (ejecuta generación de sitemap + ng build con SSR/SSG)
npm run build
```

---

## 📁 ¿Dónde y Cómo Actualizar el Contenido?

> **¡IMPORTANTE!** No es necesario modificar código TypeScript para actualizar el contenido del sitio. Todo el contenido dinámico está desacoplado en archivos JSON editables dentro de la carpeta `public/data/`.

```
public/
├── data/
│   ├── casos-exito.json    ← Casos de éxito y proyectos
│   ├── solutions.json      ← Catálogo de productos y soluciones de telemetría
│   ├── blog-posts.json     ← Artículos técnicos del blog
│   └── clients.json        ← Clientes destacados en Inicio
└── i18n/
    ├── es.json             ← Textos fijos y etiquetas en Español
    └── en.json             ← Textos fijos y etiquetas en Inglés
```

---

### 1. Cómo agregar un Caso de Éxito
Abre `public/data/casos-exito.json` y añade un nuevo objeto al array con la siguiente estructura:

```json
{
  "id": "caso-8",
  "slug": "caso-nombre-del-proyecto",
  "client": "NOMBRE DEL CLIENTE",
  "categoryId": "AGUA",
  "categoryES": "Agua Potable y Saneamiento",
  "categoryEN": "Water & Sanitation",
  "titleES": "Título del proyecto en español",
  "titleEN": "Project title in english",
  "location": "Ubicación del proyecto, Perú",
  "image": "assets/slides/mi-imagen.png",
  "icon": "water_drop",
  "accentColor": "#0284c7",
  "metricsES": "Métrica clave destacada",
  "metricsEN": "Key highlight metric",
  "summaryES": "Resumen conciso del proyecto...",
  "summaryEN": "Concise project summary...",
  "challengeES": "Descripción del reto técnico...",
  "challengeEN": "Technical challenge description...",
  "solutionES": "Descripción de la solución implementada...",
  "solutionEN": "Description of the solution deployed...",
  "resultsES": [
    "Resultado medible 1",
    "Resultado medible 2"
  ],
  "resultsEN": [
    "Measurable outcome 1",
    "Measurable outcome 2"
  ],
  "technologies": ["SCADA", "Telemetría Satelital", "PLC"]
}
```

*Los slugs son enrutables automáticamente mediante `/casos-de-exito/:slug` y se pre-renderizan dinámicamente.*

---

### 2. Cómo agregar o editar una Solución / Producto
Abre `public/data/solutions.json` y edita o agrega un elemento con los campos:
- `slug`: Identificador único para la URL (`/soluciones/:slug`)
- `titleES` / `titleEN`: Nombre del producto
- `specs`: Array con especificaciones técnicas (`labelES`, `labelEN`, `valueES`, `valueEN`)
- `models`: Modelos de hardware disponibles
- `applicationsES` / `applicationsEN`: Lista de aplicaciones recomendadas
- `benefits`: Beneficios destacados con iconos de Material Icons

---

### 3. Cómo agregar un Artículo al Blog
Abre `public/data/blog-posts.json` y añade un artículo estático con fecha, autor, resumen y párrafos de contenido (`contentES`, `contentEN`).
> El blog también consulta en vivo fuentes RSS de IoT/SCADA internacional vía API para mantenerse fresco automáticamente.

---

### 4. Cómo editar Traducciones (Textos de Cabecera, Footer, Botones)
Abre:
- `public/i18n/es.json` para textos en Español.
- `public/i18n/en.json` para textos en Inglés.

---

### 5. Sitemap y SEO
El archivo `public/sitemap.xml` se sincroniza automáticamente al compilar con `npm run build` o ejecutando:
```bash
npm run sitemap
```
Este script lee automáticamente todos los `slug` de `solutions.json` y `casos-exito.json`, asegurando que Google indexe siempre el 100% de las páginas sin intervención manual.

---

## 🏛️ Arquitectura del Código

El proyecto sigue la convención modular recomendada para Angular:

```
src/app/
├── core/                   ← Servicios singleton y componentes globales
│   ├── components/         ← Header, Footer, etc.
│   └── services/           ← SolutionsService, CasosExitoService, BlogService,
│                              LanguageService, SeoService, ThemeService
├── features/               ← Páginas y vistas con carga diferida (lazy loaded)
│   ├── home/               ← Página de inicio
│   ├── solutions/          ← Catálogo y detalle de soluciones
│   ├── casos-exito/        ← Casos de éxito con modal/slides dinámicos
│   ├── blog/               ← Blog técnico y feeds RSS
│   ├── company/            ← Nosotros / Acerca de la empresa
│   └── contact/            ← Formulario y canales de contacto
└── shared/                 ← Componentes, pipes y utilidades reutilizables
    ├── components/         ← HeroBanner, etc.
    └── pipes/              ← TranslatePipe (i18n reactivo)
```

---

## 🚢 Despliegue (Deploy)

El proyecto está configurado para despliegue estático/SSR en **Netlify** o servidores tradicionales Apache/Nginx (incluye `public/.htaccess` y `public/_redirects`).

Al ejecutar `npm run build`, la carpeta final para producción es:
```
dist/enertronic/browser
```
Copia el contenido de dicha carpeta en la raíz pública del servidor web.
