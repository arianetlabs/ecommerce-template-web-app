import { PromoBanner } from '@/pages/store/home/components/promo-banner'
import { promoBanners } from '@/pages/store/home/data'

export function PromoBannersSection() {
  return (
    <section
      id="ofertas"
      className="web-container pt-7.5 pb-15 sm:pt-12.5 sm:pb-25"
    >
      <div className="grid gap-4 md:grid-cols-2 md:grid-rows-2">
        <PromoBanner
          banner={promoBanners[0]}
          className="min-h-75 md:row-span-2"
        />
        <PromoBanner banner={promoBanners[1]} />
        <PromoBanner banner={promoBanners[2]} />
      </div>
    </section>
  )
}
