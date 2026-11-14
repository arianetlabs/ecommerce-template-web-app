import { Button } from '@/components/store/ui/button'
import { cn } from '@/lib/utils'
import { ProductCard } from '@/pages/store/home/components/product-card'
import { SectionHeading } from '@/pages/store/home/components/section-heading'
import type { ShowcaseProduct } from '@/pages/store/home/data'
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface ProductSectionProps {
  id: string
  title: string
  description: string
  products: ShowcaseProduct[]
  className?: string
}

export function ProductSection({ id, title, description, products, className }: ProductSectionProps) {
  return (
    <section
      id={id}
      className={cn('web-container', className)}
    >
      <SectionHeading
        title={title}
        description={description}
      />
      <div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-4 lg:gap-x-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
      <div className="mt-9 flex justify-center">
        <Button
          asChild
          variant="outline"
          className="rounded-lg"
        >
          <a href="#colecciones">
            Ver coleccion completa
            <HugeiconsIcon
              icon={ArrowRight02Icon}
              strokeWidth={2}
              data-icon="inline-end"
              aria-hidden="true"
            />
          </a>
        </Button>
      </div>
    </section>
  )
}
