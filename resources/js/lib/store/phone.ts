export function formatStorePhone(phone: string): { display: string; href: string } | null {
  const digits = phone.replace(/\D/g, '')
  const match = /^(?:51)?(\d{3})(\d{3})(\d{3})$/.exec(digits)

  if (!match) {
    return null
  }

  const [, first, second, third] = match

  return {
    display: '+51 ' + first + ' ' + second + ' ' + third,
    href: 'tel:+51' + first + second + third,
  }
}
