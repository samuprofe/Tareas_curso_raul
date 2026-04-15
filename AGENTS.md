# AGENTS.md

Guia operativa para agentes y colaboradores que trabajen en este backend (`Tareas33`).

## Objetivo del proyecto

Backend REST para gestion de tareas por usuario, con autenticacion JWT y persistencia en MySQL.

## Stack y versiones

- Java 21
- Spring Boot 4.x
- Spring Data JPA
- Spring Security (JWT stateless)
- MySQL/MariaDB compatible
- Lombok
- Maven Wrapper (`mvnw.cmd`)

## Estructura relevante

- `src/main/java/org/example/tareas33/entity`: entidades JPA (`Usuario`, `Tarea`, `Prioridad`)
- `src/main/java/org/example/tareas33/repository`: repositorios JPA
- `src/main/java/org/example/tareas33/dto`: contratos request/response
- `src/main/java/org/example/tareas33/service`: logica de negocio
- `src/main/java/org/example/tareas33/controller`: endpoints REST
- `src/main/java/org/example/tareas33/security`: JWT y filtro de autenticacion
- `src/main/java/org/example/tareas33/config`: seguridad y carga inicial de datos
- `src/main/resources/application.properties`: datasource/JPA/JWT
- `frontend`: SPA React + Vite que consume la API JWT
- `docs/API_ROUTES.md`: documentacion de endpoints
- `docs/REGLAS_DISEÑO.md`: reglas visuales del frontend

## Flujo de autenticacion

1. `POST /api/auth/register` crea usuario y devuelve token JWT.
2. `POST /api/auth/login` valida credenciales por email/password y devuelve token JWT.
3. El cliente envia `Authorization: Bearer <token>` en rutas protegidas.
4. `JwtAuthenticationFilter` extrae y valida token, y setea el `SecurityContext`.
5. El email autenticado se usa como `username` y para filtrar tareas por propietario.

## Reglas de dominio

- Un `Usuario` puede tener muchas `Tarea`.
- Cada `Tarea` pertenece a exactamente un `Usuario`.
- Prioridad obligatoria: `BAJA`, `MEDIA`, `ALTA`.
- Los servicios de tareas siempre operan por usuario autenticado (no acceso cruzado).

## Persistencia y compatibilidad de esquema

La entidad `Tarea` mantiene compatibilidad con esquemas legacy donde pueden coexistir columnas con nombres distintos:

- texto: `tarea` (actual) y `texto` (legacy)
- estado: `completada` (actual) y `hecha` (legacy)

Antes de cambiar estos mapeos, validar migracion de datos en entorno real.

## Configuracion JWT

Propiedades activas en `application.properties`:

- `app.jwt.secret=${JWT_SECRET:dev_secret_change_me_123456789012345}`
- `app.jwt.expiration-ms=${JWT_EXPIRATION_MS:86400000}`

Recomendacion:

- Desarrollo: se permite fallback local.
- Produccion: definir siempre `JWT_SECRET` por variable de entorno.

## Seed de datos

`DataInitializer` crea usuarios y tareas de ejemplo si no existen y muestra credenciales iniciales en consola.

## Convenciones de implementacion

- No exponer entidades JPA directamente en controladores: usar DTOs.
- Mantener logica de negocio en `service`, no en `controller`.
- Preservar aislamiento por usuario en repositorios/servicios de tareas.
- Si agregas endpoints, actualizar `docs/API_ROUTES.md`.
- Si modificas UI o creas pantallas nuevas del frontend, revisar `docs/REGLAS_DISEÑO.md`.
- Si agregas columnas/cambias entidades, revisar impacto en datos legacy.

## Comandos utiles

```powershell
.\mvnw.cmd test
```

```powershell
.\mvnw.cmd spring-boot:run
```

## Checklist rapido antes de cerrar cambios

- Compila y arranca contexto Spring.
- Endpoint nuevo documentado en `docs/API_ROUTES.md`.
- Seguridad: ruta publica/protegida correctamente definida.
- Acceso a tareas restringido al usuario autenticado.
- No se introducen secretos hardcodeados para produccion.

