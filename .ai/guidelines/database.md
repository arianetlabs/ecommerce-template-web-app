# Base de datos y modelos

## Claves primarias y foráneas

- Usa ULID como clave primaria para las nuevas entidades de negocio. Las claves foráneas deben usar un tipo compatible con la clave que referencian. Conserva las claves existentes y las que requieran las tablas de infraestructura del framework.
- Incluye el trait `Illuminate\Database\Eloquent\Concerns\HasUlids` en los modelos Eloquent cuya clave primaria sea ULID.

## Columnas casteadas a enums PHP

- Para nuevas columnas casteadas a enums de cadena, usa `varchar(50)` por defecto. Aumenta a 75 o 100 según la longitud de los valores persistidos. Si un valor supera los 100 caracteres, elige una longitud suficiente.
- Conserva las longitudes existentes mientras admitan todos los valores persistidos.

## Campos de contacto

- Conserva el formato de nueve dígitos en los campos `phone` que sigan el contrato local de clientes y administradores. Cuando ese formato aplique a una nueva columna, usa `char(9)` y valida los nueve dígitos.
- Alinea la longitud de `email` con el contrato del campo y mantén la validación dentro de la capacidad de la columna. Conserva los límites existentes salvo que el cambio de funcionalidad requiera revisarlos.

## Cambios de estructura durante el desarrollo

- Revisa el historial y el estado de Git antes de cambiar una migración. Crea una migración nueva para modificar el esquema de una migración ya incluida en un commit. Puedes editar una migración original mientras siga en desarrollo y esté pendiente de su primer commit.
- Si la migración en desarrollo ya se ejecutó localmente, inspecciona el esquema y sincroniza solo los cambios necesarios, conservando los datos y la integridad referencial. Evita `migrate:fresh`, `migrate:refresh` y recreaciones destructivas de tablas para esa sincronización.
