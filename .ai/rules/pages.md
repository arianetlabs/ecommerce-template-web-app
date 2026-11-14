---
paths:
  - 'resources/js/pages/**'
---

# Pages

## Componer páginas React por responsabilidad
Usa la página para coordinar props, permisos y metadatos. Extrae formularios, tablas, paginación y secciones de detalle a `components/` del módulo cuando tengan una responsabilidad propia. Comparte los tipos que utilicen varias piezas del módulo y mueve los componentes reutilizados por varios módulos a `components/admin/` o `components/store/` según su entorno.
