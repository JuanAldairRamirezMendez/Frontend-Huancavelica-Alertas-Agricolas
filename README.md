# Plataforma de Alertas Tempranas para Agricultores de Huancavelica

## Descripción

Aplicación Web Progresiva (PWA) diseñada para entregar alertas climáticas agrícolas a los agricultores de la región de Huancavelica, Perú. El sistema aborda desafíos como conectividad intermitente, accesibilidad lingüística (español, quechua e inglés) y uso prioritario de dispositivos móviles mediante una arquitectura offline-first.

## Estado del Proyecto

- **Frontend**: En desarrollo (Avanzado). Arquitectura, code splitting y características PWA definidas
- **Backend**: En desarrollo con arquitectura de microservicios
- **Base de datos**: Esquema implementado en PostgreSQL

## Características

- Arquitectura Offline-First con persistencia en localStorage/IndexedDB
- Soporte trilingüe (Español, Quechua, English) mediante React Context
- Sistema de alertas climáticas con clasificación de severidad
- Gestión de datos agrícolas con Custom Hooks
- Notificaciones multicanal
- Optimización de build con Manual Code Splitting
- Dashboard funcional con componentes clave

## Tecnologías Utilizadas

| Capa | Tecnología | Propósito |
|------|------------|-----------|
| Frontend Framework | React | Renderizado de UI basado en componentes |
| Build System | Vite | Bundling de módulos ES y HMR |
| Estilos | Tailwind CSS | Framework CSS utility-first |
| Componentes UI | Radix UI | Primitivas de componentes accesibles |
| Routing | React Router DOM | Enrutamiento del lado del cliente |
| Backend | NestJS | Framework para arquitectura de microservicios |
| Base de Datos | PostgreSQL | Persistencia relacional de datos |
| Mensajería | Redis Queue | Comunicación asíncrona entre microservicios |

## Instalación y Uso
```bash
# Clonar repositorio
git clone [repository-url]
cd [project-directory]

# Ejecutar sistema completo con Docker Compose
docker-compose up -d

# Desarrollo solo del frontend
npm install
npm run dev
```

## Estructura del Proyecto

El proyecto utiliza un sistema de build (Vite) y se organiza alrededor de un conjunto de archivos principales para el bootstrapping de la aplicación y la configuración de la PWA.

| Archivo / Directorio | Descripción |
|----------------------|-------------|
| `src/main.tsx` | Punto de montaje principal de React |
| `src/App.tsx` | Orquestador principal de rutas y lógica de aplicación |
| `vite.config.ts` | Configuración del sistema de build Vite |
| `manifest.json` | Configuración PWA |
| `package.json` | Dependencias del proyecto |

### Decisiones de Diseño Relacionadas con la Estructura:

- **Organización de Características (Rutas)**: Cada característica principal tiene una ruta dedicada
- **Gestión de Datos**: Operaciones abstraídas mediante Custom Hooks
- **Arquitectura Componentes**: Enfoque modular y reutilizable

## Arquitectura de Microservicios

La arquitectura del proyecto está diseñada como un sistema distribuido basado en microservicios para garantizar escalabilidad, mantenibilidad y resiliencia.

### Microservicios Principales

| Microservicio | Responsabilidad Principal |
|---------------|---------------------------|
| Gateway | Punto de entrada de peticiones externas |
| User | Gestión de usuarios y autenticación |
| Weather | Integración con APIs de datos climáticos |
| Alert | Motor de reglas para generación de alertas |
| Notification | Servicio de notificaciones multicanal |
| Log | Registro de eventos del sistema |

### Arquitectura y Comunicación

- **Persistencia Desacoplada**: Cada microservicio con base de datos independiente
- **Comunicación Síncrona**: APIs RESTful con JSON
- **Comunicación Asíncrona**: Message Broker para tareas críticas
- **Seguridad**: JWT para autenticación y autorización

## Metodología de Desarrollo

- **Control de Versiones**: Git con flujo de ramas estructurado
- **Testing**: Estrategia de pirámide de pruebas
- **Documentación**: Formatos estandarizados para documentación técnica
- **CI/CD**: Integración y despliegue continuo

## Arquitectura de Despliegue

- **Desarrollo**: Docker Compose para entorno local
- **Producción**: Infraestructura containerizada con orquestación
- **Monitoreo**: Sistema centralizado de logs y métricas
- **Backups**: Procedimientos automatizados de respaldo

## Análisis de Limitaciones

- **Alcance Técnico**: Limitaciones deliberadas en el alcance del proyecto
- **Dependencias Externas**: Consideraciones sobre APIs de terceros
- **Recursos Hardware**: Restricciones de infraestructura física

## Plan de Evolución

- **Mejoras Funcionales**: Funcionalidades planificadas para futuras iteraciones
- **Optimizaciones Técnicas**: Mejoras de rendimiento y seguridad
- **Escalabilidad**: Estrategias para crecimiento futuro

## Equipo de Desarrollo

| Nombre | Rol | Responsabilidades |
|--------|-----|-------------------|
| Lady | Líder de Proyecto | Gestión y documentación |
| Juan | Líder Backend | Arquitectura microservicios |
| Dario | Frontend | Desarrollo de interfaz |
| Angelo | DevOps | Infraestructura y despliegue |

## Documentación Asociada

- **Documentación Técnica**: Especificaciones de arquitectura y API
- **Manual de Usuario**: Guías de uso para agricultores
- **Plan de Proyecto**: Documentación de planificación y requisitos
