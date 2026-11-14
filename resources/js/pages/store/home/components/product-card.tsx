import { Badge } from '@/components/store/ui/badge'
import { Button } from '@/components/store/ui/button'
import type { ShowcaseProduct } from '@/pages/store/home/data'
import { FavouriteIcon, StarIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface ProductCardProps {
  product: ShowcaseProduct
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-lg bg-secondary">
        {product.badge ? (
          <Badge
            variant="default"
            className="absolute top-3 left-3 z-10"
          >
            {product.badge}
          </Badge>
        ) : null}
        <Button
          variant="secondary"
          size="icon-xs"
          className="absolute top-3 right-3 z-10 rounded-full bg-background/90 disabled:opacity-100 [&_svg]:size-5!"
          disabled
          aria-label={`Agregar ${product.name} a favoritos`}
        >
          <HugeiconsIcon
            icon={FavouriteIcon}
            strokeWidth={2}
            aria-hidden="true"
          />
        </Button>
        <img
          loading="lazy"
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="pt-4">
        <p className="text-xs text-muted-foreground">{product.category}</p>
        <h3 className="mt-1 line-clamp-2 min-h-10 text-base leading-5 font-semibold">{product.name}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold">${product.price}</span>
          {product.originalPrice ? <span className="text-base text-muted-foreground line-through">${product.originalPrice}</span> : null}
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-0.5 text-foreground">
            {Array.from({ length: 5 }).map((_, index) => (
              <HugeiconsIcon
                icon={StarIcon}
                strokeWidth={2}
                key={index}
                className="size-3 fill-current"
                aria-hidden="true"
              />
            ))}
          </span>
          <span>
            {product.rating.toFixed(1)} ({product.reviews} resenas)
          </span>
        </div>
      </div>
    </article>
  )
}
