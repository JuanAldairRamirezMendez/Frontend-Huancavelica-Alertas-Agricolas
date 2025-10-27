# 🛰️ Overview

### Archivos fuente relevantes
Este documento ofrece una **visión general completa** del sistema **Frontend Huancavelica Alertas Agrícolas**, incluyendo su propósito, arquitectura de alto nivel, stack tecnológico y capacidades principales.  
Para información detallada sobre subsistemas específicos, consulta las páginas hijas listadas en el índice.

### Páginas relacionadas
- Para configuración del sistema y desarrollo local: ver **Getting Started**  
- Para capas arquitectónicas: ver **System Architecture**  
- Para autenticación: ver **Authentication System**  
- Para características PWA y uso sin conexión: ver **Progressive Web App Features**

---

## � Estructura del repositorio y enlaces

Abajo se describe de forma natural qué contiene cada carpeta importante y, al final de cada sección, un espacio para pegar el permalink (URL absoluta en GitHub) o el enlace relativo dentro del repositorio. Reemplaza los placeholders por los enlaces reales para que los usuarios puedan saltar con un clic a la documentación correspondiente.

### docs/ — Documentación técnica y procesos
Contiene guías y documentos de referencia destinados a desarrolladores, operadores y gestores del proyecto. Aquí encontrarás la guía de inicio, la arquitectura del sistema, la descripción del sistema de autenticación, las características PWA, guías de UI y despliegue.

- Permalink: <PERMALINK_GETTING_STARTED>

Archivos típicos (ejemplos):
- `docs/Getting-Started.md` — pasos para dejar el entorno listo y ejecutar localmente.
- `docs/System-Architecture.md` — diagramas y decisiones arquitectónicas.
- `docs/Authentication.md` — flujo de login y manejo de tokens.
- `docs/PWA-Features.md` — comportamiento offline y service worker.
- `docs/UI-Components.md` — guía de componentes y patrones de diseño.
- `docs/Deployment.md` — CI/CD y despliegue (Vercel, Docker).

---

### src/ — Código fuente de la aplicación (explicado por carpetas)
El código que se despliega vive aquí. Está organizado en subcarpetas que separan responsabilidades:

- `src/components/` — biblioteca de componentes reutilizables (botones, cards, modals). Cada componente suele incluir su propio `README.md`, tests y stories.
- `src/pages/` — páginas o vistas ligadas al router (Login, Dashboard, Alerts, Reports, Profile).
- `src/hooks/` — hooks personalizados que encapsulan lógica (ej.: `useAlerts`, `useAuth`).
- `src/context/` — providers globales (AuthProvider, LanguageProvider, ThemeProvider) y hooks de consumo (`useAuth()`, `useLanguage()`).
- `src/utils/` — utilidades puras, formateadores y clientes HTTP (`apiClient`).
- `src/assets/` — imágenes, iconos y fuentes que deben procesarse con Vite.

- Permalink raíz: <PERMALINK_SRC_README>
- Permalink componentes: <PERMALINK_SRC_COMPONENTS>
- Permalink hooks: <PERMALINK_SRC_HOOKS>
- Permalink context: <PERMALINK_SRC_CONTEXT>
- Permalink utils: <PERMALINK_SRC_UTILS>
- Permalink assets: <PERMALINK_SRC_ASSETS>

Recomendación: en el `src/components/<Nombre>/README.md` documenta props, variantes, ejemplos y tests para facilitar la adopción por otros desarrolladores.

---

### public/ — Archivos estáticos y manifest
Contiene `index.html`, `manifest.json`, favicons y otros archivos que se sirven sin procesamiento. Mantén `public/` ligero y coloca assets que requieren fingerprinting en `src/assets/`.

- Permalink: <PERMALINK_PUBLIC_README>

---

### Cómo pegar permalinks rápidamente (sugerencia)
1. En GitHub abre el archivo deseado y copia la URL desde la barra de direcciones (usa la rama `main` o `master` según tu repo).  
2. Sustituye el placeholder correspondiente en este README.

Ejemplo en PowerShell (reemplaza la URL de ejemplo):

```powershell
((Get-Content README.md) -replace '<PERMALINK_GETTING_STARTED>', 'https://github.com/OWNER/REPO/blob/main/docs/Getting-Started.md') | Set-Content README.md
```

Consejo de mejores prácticas
- Usa enlaces relativos si planeas mover el repo o trabajar con forks, p. ej. `docs/Getting-Started.md` en lugar de una URL absoluta.  
- Mantén los READMEs por carpeta actualizados y cortos: 1) propósito de la carpeta, 2) qué archivos importantes contiene, 3) cómo contribuir.


## 🎯 Propósito y contexto del sistema

**Frontend Huancavelica Alertas Agrícolas** es una **Aplicación Web Progresiva (PWA)** diseñada para entregar **alertas climáticas agrícolas** a productores del departamento de **Huancavelica, Perú**.  
El sistema responde a los principales desafíos de las comunidades agrícolas locales:

| Desafío | Descripción |
|----------|--------------|
| Conectividad intermitente | Acceso a internet poco confiable en zonas rurales |
| Accesibilidad lingüística | Usuarios hablan español, quechua o ambos |
| Uso móvil prioritario | Dispositivos con planes de datos limitados |
| Alertas en tiempo real | Necesidad de recibir avisos inmediatos (heladas, granizo, sequía) |

La aplicación implementa una **arquitectura offline-first**, lo que permite a los agricultores acceder a la información crítica **sin conexión activa**.  
Todas las funciones clave —autenticación, alertas, cultivos y clima— operan del lado del cliente usando `localStorage`.

**Fuentes:**  
- Diagrama de Arquitectura del Sistema (Nivel Alto)  
- `README.md`, `package.json`

---

## 🧩 Arquitectura de alto nivel

El sistema sigue una **arquitectura por capas** con cinco subsistemas principales:

- Interfaz de usuario (UI)
- Gestión de estado y hooks
- Ruteo y navegación
- Almacenamiento local y persistencia
- Configuración PWA e instalación

**Fuentes:**  
- `src/App.tsx` (líneas 1–152)  
- `package.json` (líneas 6–52)  
- Diagrama de Arquitectura del Sistema

---

## ⚙️ Stack tecnológico

| Capa | Tecnología | Versión | Propósito |
|------|-------------|----------|------------|
| Framework frontend | React | 18.3.1 | Renderizado basado en componentes |
| Sistema de build | Vite | 6.3.5 | Empaquetado ES modules, HMR |
| Plugin de compilación | @vitejs/plugin-react-swc | 3.10.2 | Compilación rápida de React |
| Ruteo | react-router-dom | 7.9.2 | Navegación cliente |
| Componentes UI | Radix UI | varias | Primitivos accesibles |
| Estilos | Tailwind CSS | 4.1.13 | Framework CSS utilitario |
| Iconos | lucide-react | 0.487.0 | Biblioteca de iconos SVG |
| Gráficos | Recharts | 2.15.2 | Visualización de datos |
| Formularios | react-hook-form | 7.55.0 | Manejo de estado de formularios |
| HTTP client | axios | 1.12.2 | Comunicación con API backend |
| Temas | next-themes | 0.4.6 | Gestión modo claro/oscuro |
| Notificaciones | sonner | 2.0.3 | Alertas toast |
| Despliegue | Vercel | N/A | Hosting SPA |
| Soporte PWA | manifest.json | N/A | Configuración de instalación |

---

## 🧠 Capacidades principales

### 1. Autenticación Offline-First
Opera completamente sin backend.  
Credenciales demo almacenadas en `localStorage.demoUser`.  
Sesiones persistidas en `localStorage.climaAlert_user`.  
Uso de `navigator.onLine` para detección de red y mensajes adaptativos.  

**Implementación:** `src/App.tsx` (líneas 31–51), hook `useAuth()`, componente `LoginForm`.

---

### 2. Aplicación Web Progresiva (PWA)
Instalable como app nativa con soporte sin conexión.  
Manifesto define nombre, íconos y colores.  
Modo independiente sin UI de navegador.  
Todas las funciones operan sin internet.

**Implementación:** `index.html`, `manifest.json`.

---

### 3. Interfaz Trilingüe
Soporta **Español**, **Quechua** y **Inglés**.  
Manejada por `LanguageProvider` en `src/main.tsx`.  
Ideal para usuarios locales y técnicos.

---

### 4. Gestión de datos agrícolas
Hooks personalizados con caché local:

| Hook | Propósito | Fuente |
|------|------------|--------|
| useAuth() | Sesión de usuario | localStorage |
| useAlerts() | Alertas climáticas | API + caché |
| useCrops() | Cultivos registrados | API + caché |
| useWeather() | Condiciones del clima | API + caché |
| useRecommendations() | Recomendaciones agrícolas | API + caché |

---

### 5. Optimización del build (code splitting)
Se definen **5 chunks** principales para optimizar caché y carga:

| Chunk | Contenido | Propósito |
|--------|------------|-----------|
| react-vendor | React y ReactDOM | Núcleo |
| ui-vendor | Radix UI | Componentes |
| charts-vendor | Recharts | Gráficos |
| forms-vendor | React Hook Form | Formularios |
| utils-vendor | Lucide, cmdk | Utilidades |

**Implementación:** `vite.config.ts`.

---

## 🔁 Flujo de aplicación

1. **Inicio:** `index.html` → `main.tsx` → `App.tsx`  
2. **Autenticación:** `useAuth()` verifica sesión en `localStorage`.  
3. **Login:** formulario `/login`, guarda sesión en `climaAlert_user`.  
4. **Dashboard:** inicializa hooks `useAlerts`, `useCrops`, `useWeather`.  
5. **Navegación:** rutas protegidas `/alerts`, `/reports`, `/crops`, etc.  

**Fuentes:**  
- `src/App.tsx` (50–152)  
- `src/main.tsx`

---

## 🧱 Decisiones clave de diseño

1. **Arquitectura Offline-First:** acceso total sin red.  
2. **Code Splitting Manual:** control fino de caché.  
3. **Contexto de idioma:** manejo simple sin librerías externas.  
4. **Rutas por funcionalidad:** separación modular.  
5. **DashboardLoader:** inicialización centralizada de hooks.  

---

## 📊 Métricas del sistema

| Métrica | Valor | Significado |
|----------|--------|-------------|
| Prioridad de optimización de build | 19.68 | Desempeño en red lenta |
| Prioridad del componente LoginForm | 12.56 | Flujo central |
| Componentes UI Radix | 24+ | Base visual accesible |
| Hooks personalizados | 5 | useAuth, useAlerts, etc. |
| Idiomas soportados | 3 | ES, QU, EN |
| Rutas protegidas | 9 | Secciones autenticadas |

---

## 🚀 Próximos pasos

Para más detalles sobre subsistemas:

- **Configuración local:** ver *Getting Started*  
- **Arquitectura profunda:** ver *System Architecture*  
- **Despliegue:** ver *Build & Deployment System*  
- **Autenticación:** ver *Authentication System*  
- **Dashboard:** ver *Dashboard System*  
- **UI y Navegación:** ver *UI Component System*  
- **Datos:** ver *Data Management*  
- **PWA:** ver *Progressive Web App Features*  
- **Internacionalización:** ver *Internationalization*  

**Fuentes:**  
`src/App.tsx` (1–152), `package.json` (1–68)

---
