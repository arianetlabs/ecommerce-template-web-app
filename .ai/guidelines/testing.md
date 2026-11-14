# Pruebas de funcionalidades

Esta política específica del proyecto prevalece sobre las recomendaciones generales de las guías generadas o skills que indiquen crear tests por cualquier cambio de código o lógica.

- Crear tests únicamente para probar funcionalidades del sistema, sus reglas de negocio, flujos y comportamiento observable.
- No crear tests para comprobar cambios de código, refactorizaciones, reorganizaciones, detalles internos de implementación u otros cambios técnicos que no afecten el comportamiento de una funcionalidad.
- Si una modificación afecta el comportamiento de una funcionalidad existente, actualizar el test respectivo para reflejar y comprobar el comportamiento esperado. Si todavía no existe cobertura de esa funcionalidad, crear el test funcional correspondiente.
- En refactorizaciones y otros cambios que conservan el comportamiento funcional, utilizar los tests existentes para verificar que la funcionalidad se mantiene, sin añadir tests específicos para el cambio interno.
- Ejecutar las pruebas afectadas cuando corresponda y comprobar que pasan. No eliminar tests existentes sin autorización del usuario.
