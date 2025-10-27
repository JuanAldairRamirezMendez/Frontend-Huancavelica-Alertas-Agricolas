# 🚀 Getting Started

Guía para configurar el entorno local del **Frontend Huancavelica Alertas Agrícolas**.  
Incluye requisitos, instalación, ejecución del servidor y pasos de verificación.  

Para ver la arquitectura general, consulta [System Architecture](./System-Architecture.md).  
Para configuraciones avanzadas del entorno, revisa [Development Environment](./Development-Environment.md).

---

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

| Requisito | Versión mínima | Propósito |
|------------|----------------|------------|
| **Node.js** | 20.x | Runtime para ejecutar herramientas de build y servidor de desarrollo |
| **npm** | 10.x (incluido con Node.js) | Gestor de dependencias |
| **Git** | Cualquier versión reciente | Control de versiones para clonar el repositorio |

El proyecto usa **Node.js 20** como se define en [`./.idx/dev.nix`](../.idx/dev.nix#L4), garantizando compatibilidad con **Vite 6.3.5**, **TypeScript** y **React 18.3.1**.

> **Opcional:** Para pruebas de despliegue se recomienda una cuenta en **Vercel**, aunque no es necesaria para desarrollo local.

---

## ⚙️ Instalación paso a paso

### 1. Clonar el repositorio

```bash
git clone https://github.com/Huancavelica-Alertas-Agricolas/Frontend-Huancavelica-Alertas-Agricolas.git
cd Frontend-Huancavelica-Alertas-Agricolas
