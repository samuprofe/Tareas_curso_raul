# Tareas33 - Backend (modelo de datos)

Proyecto Spring Boot con persistencia JPA para un gestor de tareas por usuario.

## Modelo implementado

- `Usuario`
  - `id` (PK)
  - `email` (unico)
  - `password`
  - `nombreCompleto`
- `Tarea`
  - `id` (PK)
  - `texto`
  - `hecha`
  - `fechaCreacion` (automatica)
  - `fechaVencimiento`
  - `prioridad` (`BAJA`, `MEDIA`, `ALTA`)
  - `usuario` (FK a `Usuario`)

## Repositorios

- `UsuarioRepository`
- `TareaRepository`

## Base de datos

Configurado en `src/main/resources/application.properties` para MySQL local:

- host: `localhost`
- puerto: `3306`
- bd: `tareas` (se crea si no existe)
- usuario: `root`
- password: `1234`

## Ejecutar tests

```powershell
.\mvnw.cmd test
```

