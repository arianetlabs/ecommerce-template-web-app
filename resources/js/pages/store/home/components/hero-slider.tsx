import { Button } from '@/components/store/ui/button'
import { heroSlides } from '@/pages/store/home/data'
import { ArrowLeft01Icon, ArrowRight01Icon, ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export function HeroSlider() {
  return (
    <section
      className="w-full px-3 pt-4 sm:px-4 sm:pt-6"
      aria-label="Colecciones destacadas"
    >
      <Swiper
        modules={[A11y, Autoplay, Keyboard, Navigation, Pagination]}
        keyboard
        a11y={{ prevSlideMessage: 'Diapositiva anterior', nextSlideMessage: 'Siguiente diapositiva', paginationBulletMessage: 'Ir a la diapositiva {{index}}' }}
        loop
        navigation={{ addIcons: false, prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: true, pauseOnMouseEnter: true }}
        className="home-hero-swiper overflow-hidden rounded-xl bg-secondary"
      >
        <button
          slot="container-end"
          type="button"
          className="swiper-button-prev"
          aria-label="Diapositiva anterior"
        >
          <HugeiconsIcon
            icon={ArrowLeft01Icon}
            strokeWidth={2}
            aria-hidden="true"
          />
        </button>
        <button
          slot="container-end"
          type="button"
          className="swiper-button-next"
          aria-label="Siguiente diapositiva"
        >
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            strokeWidth={2}
            aria-hidden="true"
          />
        </button>
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="relative min-h-130 overflow-hidden rounded-xl bg-secondary sm:min-h-135 lg:min-h-145">
              <img
                src={slide.image}
                alt=""
                className="absolute inset-0 size-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/70 to-background/10" />
              <div className="relative flex min-h-130 items-center px-6 py-14 sm:min-h-135 sm:px-16 lg:min-h-145 lg:px-42">
                <div className="max-w-2xl p-6 backdrop-blur-xs sm:p-8 lg:p-10">
                  <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">{slide.eyebrow}</p>
                  <h1 className="max-w-3xl font-heading text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl">{slide.title}</h1>
                  <p className="mt-4 max-w-md text-sm leading-6 font-medium text-muted-foreground sm:text-base">{slide.description}</p>
                  <Button
                    asChild
                    className="mt-7"
                    size="lg"
                  >
                    <a href="#productos">
                      {slide.cta}
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
