import { CollectionsSection } from '@/pages/store/home/components/collections-section'
import { FeatureCards } from '@/pages/store/home/components/feature-cards'
import { HeroSlider } from '@/pages/store/home/components/hero-slider'
import { MarqueeStrip } from '@/pages/store/home/components/marquee-strip'
import { NewsletterSection } from '@/pages/store/home/components/newsletter-section'
import { ProductSection } from '@/pages/store/home/components/product-section'
import { PromoBannersSection } from '@/pages/store/home/components/promo-banners-section'
import { SeasonBanner } from '@/pages/store/home/components/season-banner'
import { ServiceBenefits } from '@/pages/store/home/components/service-benefits'
import { popularProducts, trendingProducts } from '@/pages/store/home/data'
import { Head } from '@inertiajs/react'

export default function HomePage() {
  return (
    <>
      <Head title="Avelio" />
      <main>
        <HeroSlider />
        <ServiceBenefits />
        <CollectionsSection />
        <PromoBannersSection />
        <MarqueeStrip />
        <ProductSection
          id="productos"
          title="Productos Populares"
          description="Descubre nuestras piezas mas elegidas por clientes."
          products={popularProducts}
          className="pt-15 pb-7.5 sm:pt-25 sm:pb-12.5"
        />
        <FeatureCards />
        <ProductSection
          id="tendencias"
          title="Productos en Tendencia"
          description="Nuevos favoritos para elevar tus looks de temporada."
          products={trendingProducts}
          className="pt-7.5 pb-7.5 sm:pt-12.5 sm:pb-12.5"
        />
        <SeasonBanner />
        <NewsletterSection />
      </main>
    </>
  )
}
