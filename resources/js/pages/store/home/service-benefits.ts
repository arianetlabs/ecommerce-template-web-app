import { CreditCardIcon, CustomerSupportIcon, PackageDeliveredIcon, DeliveryTruck01Icon } from '@hugeicons/core-free-icons'
import type { IconSvgElement } from '@hugeicons/react'

export interface ServiceBenefit {
  title: string
  description: string
  icon: IconSvgElement
}

export const serviceBenefits: ServiceBenefit[] = [
  {
    title: 'Envío gratis',
    description: 'Envío gratuito en pedidos desde $120',
    icon: DeliveryTruck01Icon,
  },
  {
    title: 'Devoluciones fáciles',
    description: 'Cambia o devuelve dentro de 14 días',
    icon: PackageDeliveredIcon,
  },
  {
    title: 'Pago flexible',
    description: 'Compra segura con multiples métodos',
    icon: CreditCardIcon,
  },
  {
    title: 'Soporte experto',
    description: 'Ayuda rápida para elegir tu look',
    icon: CustomerSupportIcon,
  },
]
