import { Button } from '@/components/store/ui/button'
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export function SeasonBanner() {
  return (
    <section className="web-container pt-7.5 pb-7.5 sm:pt-12.5 sm:pb-12.5">
      <article className="group relative min-h-110 overflow-hidden rounded-2xl bg-secondary sm:min-h-125 lg:min-h-140">
        <img
          loading="lazy"
          src="https://placehold.co/1440x620"
          alt=""
          className="absolute inset-0 size-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/70 to-background/10" />
        <div className="relative flex min-h-110 items-center p-6 sm:min-h-125 sm:p-10 lg:min-h-140 lg:p-14">
          <div className="max-w-lg rounded-xl p-6 backdrop-blur-xs sm:p-8">
            <h2 className="font-heading text-4xl leading-tight font-bold">Coleccion de verano</h2>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">Prendas ligeras, tonos suaves y combinaciones listas para viajar.</p>
            <Button
              asChild
              className="mt-6 rounded-lg"
            >
              <a href="#colecciones">
                Comprar ahora
                <HugeiconsIcon
                  icon={ArrowRight02Icon}
                  strokeWidth={2}
                  data-icon="inline-end"
                  aria-hidden="true"
                />
              </a>
            </Button>
          </div>
        </div>
      </article>
    </section>
  )
}
