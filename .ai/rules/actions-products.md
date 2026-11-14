---
paths:
  - 'app/Actions/Products/**'
---

# Actions Products

## Name processed product images deterministically
Processed product image filenames use `{product-slug}-{zero-based-position}-{width}x{height}.avif` inside the existing product/variant directories. This supersedes the earlier ULID filename requirement. During replacements, archive old files until the database transaction succeeds so deterministic path collisions cannot delete the new image and failures can restore the prior files.

## Keep image filenames aligned with positions
Product image filenames use `{product-slug}-{zero-based-position}-{width}x{height}.avif`. When retained images change position, move every stored variant through a temporary path before assigning final paths, update `path`/`variants` with the database position, and restore original paths if the transaction fails. This supersedes the older unique-filename rule.
