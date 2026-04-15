# Frontend Tareas33

Frontend React + Vite para consumir la API JWT de `Tareas33`.

## Stack

- React
- React Router
- Tailwind CSS
- Sonner
- TypeScript

## Requisitos

- Node.js 18+ recomendado
- Backend `Tareas33` corriendo en `http://localhost:8080`

## Configuracion

Opcionalmente puedes definir la URL base de la API:

```powershell
$env:VITE_API_BASE_URL="http://localhost:8080"
```

Si no se define, el frontend usa `http://localhost:8080` por defecto.

## Desarrollo

```powershell
Set-Location "c:\Users\Samuel2\Documents\IntelliJ projects\Tareas33\frontend"
npm install
npm run dev
```

## Build

```powershell
Set-Location "c:\Users\Samuel2\Documents\IntelliJ projects\Tareas33\frontend"
npm run build
```

