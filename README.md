# Modo demo (sin backend)

El frontend funciona con datos simulados (mock) para que puedas ver la interfaz aunque no tengas el backend/API.

Las llamadas reales a la API están **comentadas** en:
- `src/hooks/useAlerts.ts`
- `src/services/alertService.ts`

Cuando tengas el backend listo, **descomenta** esas líneas y elimina los mocks para conectar con tu API real.

## Para conectar con el backend
1. Asegúrate de que tu backend esté corriendo en `http://localhost:8000/api` o cambia la URL en el código/comentarios.
2. Descomenta las llamadas reales a la API en los archivos mencionados arriba.
3. Elimina o comenta los bloques de datos mock.

## Comandos útiles
- Instalar dependencias:
  ```
  npm install --legacy-peer-deps
  ```
- Iniciar el frontend:
  ```
  npm run dev
  ```
- Accede a la app en: [http://localhost:3000](http://localhost:3000)

## Notas
- Si ves la app "vacía" o sin datos, revisa la consola del navegador para ver si hay errores de red.
- Si tienes dudas, revisa los comentarios en el código o consulta este README.

---

**Recuerda:** El frontend está listo para usarse y probarse sin backend, pero para datos reales debes conectar la API siguiendo los pasos anteriores.

  # Plataforma de Alertas Climáticas

  This is a code bundle for Plataforma de Alertas Climáticas. The original project is available at https://www.figma.com/design/okwPuOGx4dUYXG5PDtBF0d/Plataforma-de-Alertas-Clim%C3%A1ticas.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  