import { serviceBenefits } from '@/pages/store/home/service-benefits'
import { HugeiconsIcon } from '@hugeicons/react'

export function ServiceBenefits() {
  return (
    <section className="web-container pt-15 pb-7.5 sm:pt-25 sm:pb-12.5">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {serviceBenefits.map((benefit) => {
          return (
            <article
              key={benefit.title}
              className="group flex flex-col items-center text-center"
            >
              <span className="grid size-14 place-items-center rounded-2xl bg-secondary transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-md">
                <HugeiconsIcon
                  icon={benefit.icon}
                  strokeWidth={2}
                  className="size-7 transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
              </span>
              <div className="mt-6">
                <h2 className="text-base font-bold">{benefit.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{benefit.description}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
