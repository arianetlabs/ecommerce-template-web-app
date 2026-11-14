---
paths:
  - 'resources/js/**'
---

# Js

## Use HugeIcons for frontend icons
Use @hugeicons/core-free-icons with @hugeicons/react for frontend icons. Do not add lucide-react imports or dependency; render icon data with HugeiconsIcon or the shared components/ui/icon wrapper.

## Organizar auxiliares por responsabilidad y ámbito
Ubica los auxiliares de una página o componente cerca de su consumidor, en `components/`, `lib/`, `types/` o `hooks/` según su responsabilidad. Crea carpetas cuando haya archivos que organizar y actualiza los imports al moverlos. Conserva los contratos de entidades compartidas en `@/types/entities` y respeta la separación entre Admin y Store.

## Reutilizar los componentes y variantes de shadcn/ui
Usa el componente de shadcn/ui adecuado dentro del entorno que lo consume. Si falta, incorpora su código fuente en `components/admin/ui/` o `components/store/ui/`, según corresponda, y solicita autorización si requiere dependencias nuevas. Prioriza las variantes del componente y reserva las sobreescrituras con `className` o `style` para los casos que la tarea pida expresamente.

## Usar el alias para imports internos
Usa `@/` para importar módulos internos de `resources/js/`, incluidos los imports de tipos y los dinámicos. Agrupa las declaraciones al inicio, después de directivas como `'use client'`. Conserva los especificadores de paquetes externos y módulos nativos, y deja el orden de imports al formateador del proyecto.
