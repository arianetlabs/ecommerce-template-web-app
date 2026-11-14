import { SparklesIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

const messages = ['Unete para ofertas exclusivas y 10% off', 'Devoluciones faciles en 14 dias', 'Nuevas colecciones cada semana', 'Compra segura y soporte experto']

export function MarqueeStrip() {
  return (
    <div className="overflow-hidden bg-primary py-6 text-primary-foreground">
      <div className="flex min-w-max items-center gap-8 text-xs font-semibold tracking-[0.18em] uppercase motion-safe:animate-[marquee_22s_linear_infinite]">
        {[...messages, ...messages].map((message, index) => (
          <span
            key={`${message}-${index}`}
            className="inline-flex items-center gap-3"
            aria-hidden={index >= messages.length}
          >
            <HugeiconsIcon
              icon={SparklesIcon}
              strokeWidth={2}
              className="size-3.5"
              aria-hidden="true"
            />
            {message}
          </span>
        ))}
      </div>
    </div>
  )
}
