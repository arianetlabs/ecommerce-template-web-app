import { Button } from '@/components/store/ui/button'
import { cn } from '@/lib/utils'
import type { PromoBanner as PromoBannerType } from '@/pages/store/home/data'
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface PromoBannerProps {
  banner: PromoBannerType
  className?: string
}

export function PromoBanner({ banner, className }: PromoBannerProps) {
  const isStacked = banner.variant === 'stacked'

  return (
    <article className={cn('group relative flex min-w-0 overflow-hidden rounded-xl bg-secondary', isStacked && 'min-h-52 md:aspect-2/1 md:min-h-0', className)}>
      <img
        loading="lazy"
        src={banner.image}
        alt=""
        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/35 to-transparent" />
      <div className="relative flex min-h-[inherit] flex-1 flex-col justify-end p-6 sm:p-8">
        <h2 className="font-heading text-2xl font-bold">{banner.title}</h2>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">{banner.description}</p>
        <Button
          asChild
          className="mt-5 w-fit rounded-lg"
        >
          <a href={banner.href}>
            {banner.cta}
            <HugeiconsIcon
              icon={ArrowRight02Icon}
              strokeWidth={2}
              data-icon="inline-end"
              aria-hidden="true"
            />
          </a>
        </Button>
      </div>
    </article>
  )
}
