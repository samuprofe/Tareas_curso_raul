# API ROUTES

Base URL sugerida: `/api`

## Autenticacion

### `POST /api/auth/register`
Registra un usuario y devuelve JWT.

Request:
```json
{
  "email": "nuevo@example.com",
  "password": "secreto123",
  "nombreCompleto": "Nombre Apellido"
}
```

Response `201`:
```json
{
  "token": "<jwt>",
  "tokenType": "Bearer",
  "userId": 10,
  "email": "nuevo@example.com",
  "nombreCompleto": "Nombre Apellido"
}
```

### `POST /api/auth/login`
Autentica por email y password, devuelve JWT.

Request:
```json
{
  "email": "ana@example.com",
  "password": "ana12345"
}
```

Response `200`:
```json
{
  "token": "<jwt>",
  "tokenType": "Bearer",
  "userId": 1,
  "email": "ana@example.com",
  "nombreCompleto": "Ana Diaz"
}
```

---

## Tareas (requiere JWT)

Header requerido en todos los endpoints de tareas:

`Authorization: Bearer <jwt>`

### `GET /api/tareas`
Lista las tareas del usuario autenticado.

Response `200`:
```json
[
  {
    "id": 1,
    "texto": "Planificar semana",
    "hecha": false,
    "fechaCreacion": "2026-04-15T12:00:00",
    "fechaVencimiento": "2026-04-17",
    "prioridad": "ALTA"
  }
]
```

### `GET /api/tareas/{id}`
Obtiene una tarea del usuario autenticado.

Response `200`:
```json
{
  "id": 1,
  "texto": "Planificar semana",
  "hecha": false,
  "fechaCreacion": "2026-04-15T12:00:00",
  "fechaVencimiento": "2026-04-17",
  "prioridad": "ALTA"
}
```

### `POST /api/tareas`
Crea una tarea para el usuario autenticado.

Request:
```json
{
  "texto": "Preparar demo React",
  "fechaVencimiento": "2026-04-20",
  "prioridad": "MEDIA"
}
```

Response `201`:
```json
{
  "id": 99,
  "texto": "Preparar demo React",
  "hecha": false,
  "fechaCreacion": "2026-04-15T13:00:00",
  "fechaVencimiento": "2026-04-20",
  "prioridad": "MEDIA"
}
```

### `PUT /api/tareas/{id}`
Actualiza tarea (texto, vencimiento, prioridad, opcionalmente hecha).

Request:
```json
{
  "texto": "Preparar demo React v2",
  "fechaVencimiento": "2026-04-22",
  "prioridad": "ALTA",
  "hecha": false
}
```

Response `200`: mismo formato `TareaResponse`.

### `PATCH /api/tareas/{id}/hecha`
Marca o desmarca tarea.

Request:
```json
{
  "hecha": true
}
```

Response `200`: mismo formato `TareaResponse`.

### `DELETE /api/tareas/{id}`
Elimina una tarea del usuario autenticado.

Response `204` sin cuerpo.

---

## Errores comunes

- `400` validacion de datos.
- `401` token ausente/invalido o credenciales invalidas.
- `404` tarea no encontrada o fuera de propiedad del usuario.
- `409` email ya registrado.

