import { Button } from '@/components/store/ui/button'
import { CollectionCard } from '@/pages/store/home/components/collection-card'
import { SectionHeading } from '@/pages/store/home/components/section-heading'
import { collections } from '@/pages/store/home/data'
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export function CollectionsSection() {
  return (
    <section
      id="colecciones"
      className="web-container pt-7.5 pb-7.5 sm:pt-12.5 sm:pb-12.5"
    >
      <SectionHeading
        title="Colecciones Principales"
        description="Descubre nuestras categorias mas populares seleccionadas por temporada."
      />
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-7">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.title}
            collection={collection}
          />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button
          disabled
          variant="outline"
          className="rounded-lg disabled:opacity-100"
        >
          Ver todas las colecciones
          <HugeiconsIcon
            icon={ArrowRight02Icon}
            strokeWidth={2}
            data-icon="inline-end"
            aria-hidden="true"
          />
        </Button>
      </div>
    </section>
  )
}
