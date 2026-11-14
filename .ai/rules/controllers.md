---
paths:
  - 'app/Http/Controllers/**'
---

# Controllers

## Organizar acciones y preparar las respuestas
Coloca el constructor primero cuando exista. Ordena las acciones de recurso como `index`, `create`, `store`, `show`, `edit`, `update` y `destroy`, y deja los demás métodos al final en orden alfabético. Prepara consultas, cálculos y transformaciones en variables antes de construir la respuesta. Conserva la evaluación diferida que requiera el contrato de Inertia.

Para listados, normaliza la búsqueda y los filtros, aplica los criterios y la ordenación, y prepara la paginación y las props antes de responder. Reutiliza la lógica de filtrado cuando los criterios sean equivalentes y sigue delegando las escrituras de Admin a las Actions del módulo.
