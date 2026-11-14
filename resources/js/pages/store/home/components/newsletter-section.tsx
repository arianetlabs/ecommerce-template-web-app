import { Button } from '@/components/store/ui/button'
import { Input } from '@/components/store/ui/input'
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export function NewsletterSection() {
  return (
    <section
      id="newsletter"
      className="web-container pt-7.5 pb-15 sm:pt-12.5 sm:pb-25"
    >
      <div className="grid gap-5 rounded-xl bg-secondary p-6 sm:p-10 md:grid-cols-[1fr_1.2fr] md:items-center">
        <div>
          <h2 className="font-heading text-xl font-bold">Newsletter</h2>
          <p className="mt-1 text-sm text-muted-foreground">Unete para recibir novedades y descuentos exclusivos.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            className="bg-background disabled:opacity-100"
            type="email"
            aria-label="Tu correo electrónico"
            disabled
            placeholder="Tu correo electronico"
          />
          <Button
            size="sm"
            disabled
            className="disabled:opacity-100"
          >
            Suscribirme
            <HugeiconsIcon
              icon={ArrowRight02Icon}
              strokeWidth={2}
              data-icon="inline-end"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    </section>
  )
}
