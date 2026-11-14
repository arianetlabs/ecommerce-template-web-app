# Git y convenciones de commits

Estas reglas se aplican automáticamente cada vez que el usuario solicite realizar, preparar o sugerir un commit. No realizar ningún commit salvo que el usuario lo solicite explícitamente.

Los mensajes de commit deben escribirse en inglés, ser concisos y describir claramente el cambio realizado. Usar una descripción breve, específica y en estilo imperativo con el formato `<type>: <description>`. Usar `<type>(<scope>): <description>` únicamente cuando el scope aporte información útil.

Antes de crear un commit, revisar todos los cambios reales que formarán parte de él. Seleccionar el prefijo según el propósito principal del cambio, no únicamente según los archivos modificados.

## Prefijos

| Prefijo | Uso |
| --- | --- |
| `feat` | Nueva funcionalidad o capacidad funcional del sistema. |
| `fix` | Corrección de bugs, errores o comportamientos incorrectos. |
| `style` | Cambios exclusivamente visuales, de presentación o formato que no modifican la lógica. |
| `refactor` | Reorganización o mejora interna del código sin cambiar su comportamiento funcional. |
| `chore` | Tareas de mantenimiento, preparación, instalación, eliminación, inicialización o setup que no constituyen una funcionalidad por sí mismas. |
| `config` | Cambios cuyo propósito principal es configurar herramientas, paquetes, servicios, entorno o comportamiento del proyecto. |
| `docs` | Creación o modificación de documentación. |
| `test` | Creación, modificación o mantenimiento de pruebas automatizadas. |
| `build` | Cambios relacionados específicamente con el proceso de build, bundling o empaquetado. |
| `perf` | Optimizaciones de rendimiento que no cambian la funcionalidad. |
| `db` | Cambios centrados en la estructura o datos iniciales de la base de datos. |

## Reglas para casos específicos

| Cambio | Prefijo |
| --- | --- |
| Crear o inicializar un proyecto. | `chore` |
| Inicializar o adaptar un fork de un proyecto existente. | `chore` |
| Instalar o desinstalar una dependencia Composer/npm/pnpm, incluso si es exclusivamente de desarrollo. | `chore` |
| Instalar una dependencia y realizar su configuración mínima necesaria en el mismo cambio. | `chore` |
| Configurar posteriormente una dependencia ya instalada. | `config` |
| Configurar herramientas de desarrollo como ESLint, Prettier, TypeScript o Pint. | `config` |
| Instalar una skill para un agente de IA. | `chore` |
| Configurar una skill de IA ya instalada. | `config` |
| Integrar una skill de IA como parte de una nueva capacidad funcional. | `feat` |
| Instalar una librería y publicar o generar sus archivos base. | `chore` |
| Personalizar posteriormente esos archivos de configuración. | `config` |
| Crear un modelo y su migración cuando el cambio está centrado en la estructura de datos. | `db` |
| Crear o modificar migraciones, índices, constraints o relaciones de base de datos. | `db` |
| Crear o modificar seeders con datos iniciales, catálogos o valores base. | `db` |
| Crear componentes UI reutilizables que todavía no se utilizan en ninguna vista o flujo. | `chore` |
| Instalar o generar componentes base de una librería UI como shadcn. | `chore` |
| Modificar exclusivamente la apariencia de componentes existentes. | `style` |
| Extraer componentes desde código existente sin cambiar funcionalidad. | `refactor` |
| Incorporar componentes en una nueva funcionalidad o flujo. | `feat` |

## Criterio para casos ambiguos

Cuando un cambio pueda pertenecer a más de una categoría, determinar cuál es el propósito principal del commit. Aplicar especialmente estos criterios:

- Instalar, agregar, eliminar o inicializar elementos sin una nueva capacidad funcional: `chore`.
- Configurar, ajustar o personalizar settings: `config`.
- Crear estructura o datos base de la base de datos: `db`.
- Agregar comportamiento funcional nuevo: `feat`.
- Corregir comportamiento existente: `fix`.
- Reorganizar código sin cambiar comportamiento: `refactor`.
- Cambiar únicamente presentación: `style`.

Ejemplos:

```text
chore: install laravel-lang and publish translations
config: customize laravel-lang locale settings
chore: install eslint-plugin-react-hooks
config: configure react hooks eslint rules
chore: add shadcn dialog and popover components
db: create categories table and model
db: seed default roles and permissions
chore: install ai agent skill
feat: add locale switching
```

## Comportamiento al realizar commits

1. Inspeccionar primero todos los cambios que formarán parte del commit.
2. Determinar el propósito principal de esos cambios.
3. Seleccionar automáticamente el prefijo correspondiente según estas convenciones.
4. Escribir el mensaje en inglés.
5. Mantener la descripción breve, específica y en estilo imperativo.
6. Usar scope únicamente cuando aporte información útil.
7. No inventar nuevos prefijos si alguno de los definidos cubre correctamente el cambio.
8. Si existen cambios claramente independientes que deberían pertenecer a commits distintos, indicarlo y separarlos cuando corresponda.
9. No realizar ningún commit salvo que el usuario lo solicite explícitamente.
