---
paths:
  - '**/*'
---

# General

## Test functionality and observable behavior
Create tests only to cover functionality and observable behavior. Do not create tests solely for code edits, refactoring, renaming, formatting, internal structure, or documentation changes that preserve behavior. When a modification changes a feature's behavior, update its existing test; create a functional test only if that behavior has no coverage. For behavior-preserving code changes, run the relevant existing tests without adding tests just to validate the implementation. This policy replaces any blanket requirement to write or modify a test for every change.

## Verificar visualmente en el navegador integrado
Realiza toda revisión o verificación visual de Admin y Store en el navegador integrado de Codex. Si la página requiere autenticación, usa la sesión activa del entorno correspondiente. Si la sesión está cerrada, pide al usuario que inicie sesión en ese navegador y retoma la revisión cuando el acceso esté disponible.
