# REGLAS_DISEÑO

Guia visual base para futuras pantallas del frontend de `Tareas33`.

## Objetivo visual

Transmitir una interfaz moderna, elegante y calmada, con personalidad sobria y tonos marrones. La aplicacion debe sentirse profesional, limpia y centrada en productividad.

## Paleta principal

### Colores base
- Fondo principal: `brand-950` / `#180e09`
- Fondo secundario: `brand-900` / `#281811`
- Superficies: blanco con opacidad (`bg-white/5`, `bg-white/10`)
- Color de accion principal: `brand-500` / `#9b6643`
- Hover principal: `brand-400`
- Texto principal: `stone-100`
- Texto secundario: `stone-400`

### Colores por prioridad
- `ALTA`: rojos suaves (`rose-400`, `rose-500/10`)
- `MEDIA`: ambar (`amber-400`, `amber-500/10`)
- `BAJA`: verde elegante (`emerald-400`, `emerald-500/10`)

## Estilo general

- Bordes redondeados amplios (`rounded-2xl`, `rounded-3xl`).
- Tarjetas tipo glass / translucent panel con blur suave.
- Sombras profundas y suaves (`shadow-warm`).
- Mucho aire visual entre bloques.
- Interfaces oscuras con contraste alto y acentos calidos.

## Layout

- Usar contenedor central con ancho maximo (`max-w-7xl`).
- Separar pantallas en bloques verticales con espacios amplios.
- En movil, apilar secciones.
- En escritorio, aprovechar grid para cabeceras, resumenes y formularios.

## Componentes

### Botones
- Primario: fondo marron principal, texto blanco.
- Secundario: superficie translucida clara.
- Ghost: fondo transparente con hover suave.
- Danger: rojo para borrado o acciones destructivas.

### Inputs
- Fondo oscuro.
- Borde sutil blanco translúcido.
- Focus con halo marron principal.
- Etiqueta siempre visible encima del control.

### Modales
- Fondo overlay oscuro con blur.
- Caja centrada o anclada abajo en movil.
- Titulo claro + descripcion corta.
- Acciones principales alineadas a la derecha en desktop.

### Tarjetas de tarea
- Mostrar prioridad como badge coloreado.
- Checkbox a la izquierda.
- Texto tachado y con menor contraste cuando la tarea esta completada.
- Accion destructiva visible pero no dominante.

## Tipografia

- Fuente principal sans moderna (`Inter` o fallback del sistema).
- Titulares con peso `600` o `700`.
- Texto secundario en `stone-400`.
- Labels y metadatos en mayusculas o tracking amplio solo cuando aporten jerarquia.

## Responsive

- Mobile first.
- Formularios a una columna en movil.
- Header y acciones apiladas en movil, en fila en escritorio.
- El listado debe mantener buena legibilidad desde 320px.

## Experiencia de usuario

- Toasts con `Sonner` abajo a la derecha.
- Mensajes cortos, claros y accionables.
- Estados vacios con CTA visible.
- Estados de carga sencillos y discretos.
- Mantener consistencia de espaciados, colores y jerarquia entre pantallas.

## Reglas de consistencia para futuras paginas

1. Reutilizar la paleta marron y los panels translucidos.
2. Mantener la misma familia de botones y campos.
3. Respetar spacing amplio y bordes redondeados.
4. Evitar colores chillones fuera del sistema de prioridad/error.
5. Si una pagina nueva introduce un patron visual nuevo, documentarlo aqui.

