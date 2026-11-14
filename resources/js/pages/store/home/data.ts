export interface HeroSlide {
  eyebrow: string
  title: string
  description: string
  cta: string
  image: string
}

export interface Collection {
  title: string
  image: string
}

export interface PromoBanner {
  title: string
  description: string
  cta: string
  href: string
  image: string
  variant: 'wide' | 'stacked'
}

export interface ShowcaseProduct {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  badge?: string
}

export interface FeatureCard {
  title: string
  description: string
  cta: string
  image: string
  tone: string
}

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: 'Nueva temporada',
    title: 'Donde el estilo encuentra confianza diaria',
    description: 'Prendas versátiles diseñadas para acompañar cada momento.',
    cta: 'Comprar ahora',
    image: 'https://placehold.co/1800x760/EEE/31343C',
  },
  {
    eyebrow: 'Esenciales urbanos',
    title: 'Básicos elevados para todos los días',
    description: 'Siluetas limpias, telas suaves y capas listas para moverse.',
    cta: 'Explorar colección',
    image: 'https://placehold.co/1800x760/EEE/31343C',
  },
  {
    eyebrow: 'Edición limitada',
    title: 'Looks ligeros con actitud relajada',
    description: 'Descubre piezas frescas para combinar sin esfuerzo.',
    cta: 'Ver novedades',
    image: 'https://placehold.co/1800x760/EEE/31343C',
  },
]

export const collections: Collection[] = [
  { title: 'Bolsos', image: 'https://placehold.co/240x240/EEE/31343C' },
  { title: 'Camisetas', image: 'https://placehold.co/240x240/EEE/31343C' },
  { title: 'Blazers', image: 'https://placehold.co/240x240/EEE/31343C' },
  { title: 'Zapatos', image: 'https://placehold.co/240x240/EEE/31343C' },
  { title: 'Abrigos', image: 'https://placehold.co/240x240/EEE/31343C' },
  { title: 'Vestidos', image: 'https://placehold.co/240x240/EEE/31343C' },
  { title: 'Accesorios', image: 'https://placehold.co/240x240/EEE/31343C' },
]

export const promoBanners: PromoBanner[] = [
  {
    title: 'Ofertas flash',
    description: 'Selección curada con descuentos por tiempo limitado.',
    cta: 'Comprar ahora',
    href: '#productos',
    image: 'https://placehold.co/680x700/EEE/31343C',
    variant: 'wide',
  },
  {
    title: 'Compra el momento',
    description: 'Piezas suaves para una rutina con estilo.',
    cta: 'Explorar ahora',
    href: '#productos',
    image: 'https://placehold.co/640x320/EEE/31343C',
    variant: 'stacked',
  },
  {
    title: 'Los destacados',
    description: 'Accesorios que completan cualquier look.',
    cta: 'Comprar ahora',
    href: '#productos',
    image: 'https://placehold.co/640x320/EEE/31343C',
    variant: 'stacked',
  },
]

export const popularProducts: ShowcaseProduct[] = [
  {
    id: 'popular-1',
    name: 'Top cruzado lino suave',
    category: 'Mujer',
    price: 39,
    originalPrice: 55,
    rating: 4.8,
    reviews: 22,
    image: 'https://placehold.co/650x650/EEE/31343C',
    badge: 'Nuevo',
  },
  {
    id: 'popular-2',
    name: 'Pantalón fluido marfil',
    category: 'Mujer',
    price: 43,
    rating: 4.6,
    reviews: 18,
    image: 'https://placehold.co/650x650/EEE/31343C',
  },
  {
    id: 'popular-3',
    name: 'Blusa básica sin mangas',
    category: 'Mujer',
    price: 33,
    originalPrice: 44,
    rating: 4.9,
    reviews: 31,
    image: 'https://placehold.co/650x650/EEE/31343C',
  },
  {
    id: 'popular-4',
    name: 'Suéter relaxed crema',
    category: 'Mujer',
    price: 43,
    rating: 4.5,
    reviews: 20,
    image: 'https://placehold.co/650x650/EEE/31343C',
    badge: 'Oferta',
  },
]

export const featureCards: FeatureCard[] = [
  {
    title: 'Tendencia ahora',
    description: 'Capas suaves para entrar en la nueva temporada.',
    cta: 'Explorar ahora',
    image: 'https://placehold.co/520x720/EEE/31343C',
    tone: 'from-black/65 via-black/20',
  },
  {
    title: 'Bolso crossbody',
    description: 'El accesorio diario con acabado premium.',
    cta: 'Comprar ahora',
    image: 'https://placehold.co/520x720/EEE/31343C',
    tone: 'from-black/55 via-black/10',
  },
  {
    title: 'Esenciales limpios',
    description: 'Vestidos ligeros para planes de dia y noche.',
    cta: 'Comprar ahora',
    image: 'https://placehold.co/520x720/EEE/31343C',
    tone: 'from-black/60 via-black/15',
  },
]

export const trendingProducts: ShowcaseProduct[] = [
  {
    id: 'trending-1',
    name: 'Camisa bordada verano',
    category: 'Hombre',
    price: 73,
    rating: 4.8,
    reviews: 16,
    image: 'https://placehold.co/650x650/EEE/31343C',
    badge: 'Mas vendido',
  },
  {
    id: 'trending-2',
    name: 'Vestido satinado blanco',
    category: 'Mujer',
    price: 70,
    originalPrice: 86,
    rating: 4.9,
    reviews: 27,
    image: 'https://placehold.co/650x650/EEE/31343C',
  },
  {
    id: 'trending-3',
    name: 'Chaqueta relaxed ivory',
    category: 'Hombre',
    price: 43,
    rating: 4.8,
    reviews: 30,
    image: 'https://placehold.co/650x650/EEE/31343C',
  },
  {
    id: 'trending-4',
    name: 'Conjunto punto suave',
    category: 'Mujer',
    price: 79,
    originalPrice: 95,
    rating: 4.6,
    reviews: 14,
    image: 'https://placehold.co/650x650/EEE/31343C',
    badge: 'Nuevo',
  },
]
