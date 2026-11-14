import { Button } from '@/components/store/ui/button'
import { cn } from '@/lib/utils'
import { featureCards } from '@/pages/store/home/data'
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export function FeatureCards() {
  return (
    <section className="web-container pt-7.5 pb-7.5 sm:pt-12.5 sm:pb-12.5">
      <div className="grid gap-4 md:grid-cols-3">
        {featureCards.map((card) => (
          <article
            key={card.title}
            className="group relative min-h-110 overflow-hidden rounded-xl bg-secondary"
          >
            <img
              loading="lazy"
              src={card.image}
              alt=""
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className={cn('absolute inset-0 bg-linear-to-t to-transparent', card.tone)} />
            <div className="relative flex h-full min-h-110 flex-col justify-end p-6 text-white">
              <h2 className="font-heading text-2xl font-bold">{card.title}</h2>
              <p className="mt-2 max-w-xs text-sm text-white/80">{card.description}</p>
              <Button
                asChild
                className="mt-5 w-fit rounded-lg bg-background text-foreground hover:bg-background/90"
              >
                <a href="#tendencias">
                  {card.cta}
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
        ))}
      </div>
    </section>
  )
}
