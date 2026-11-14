import { home } from '@/routes/store'

export const navigationItems = [
  { label: 'Inicio', href: home.url() },
  { label: 'Tienda', href: home.url() + '#colecciones' },
  { label: 'Productos', href: home.url() + '#productos' },
  { label: 'Páginas' },
  { label: 'Ofertas', href: home.url() + '#ofertas' },
  { label: 'Blog' },
]
