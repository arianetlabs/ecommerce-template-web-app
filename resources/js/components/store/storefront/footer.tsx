import { Logo } from '@/components/store/storefront/logo'
import { navigationItems } from '@/components/store/storefront/navigation'
import { formatStorePhone } from '@/lib/store/phone'
import {
  CustomerSupportIcon,
  Mail01Icon,
  Location01Icon,
  Call02Icon,
  Shield01Icon,
  StarIcon,
  DeliveryTruck01Icon,
  Facebook01Icon,
  NewTwitterIcon,
  InstagramIcon,
  Linkedin01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { usePage } from '@inertiajs/react'

const socialLinks = [
  { label: 'Facebook', icon: Facebook01Icon },
  { label: 'X Twitter', icon: NewTwitterIcon },
  { label: 'Instagram', icon: InstagramIcon },
  { label: 'LinkedIn', icon: Linkedin01Icon },
]

const categories = [{ label: 'Ninos' }, { label: 'Hombre' }, { label: 'Mujer' }, { label: 'Coleccion' }]

const footerFeatures = [
  {
    title: 'Envios a',
    highlight: 'Mas de 200 paises',
    icon: DeliveryTruck01Icon,
  },
  {
    title: '100% seguro',
    highlight: 'Checkout protegido',
    icon: Shield01Icon,
  },
  {
    title: 'Soporte destacado',
    highlight: 'Atencion mundial',
    icon: CustomerSupportIcon,
  },
  {
    title: 'Mas de 9k',
    highlight: 'Resenas genuinas',
    icon: StarIcon,
  },
]

export function Footer() {
  const { site_description: description, phone: sitePhone, email, address, footer_credit_name, site_name } = usePage().props.site
  const phone = formatStorePhone(sitePhone)
  const creditName = footer_credit_name.trim() || site_name

  return (
    <footer className="border-t border-border bg-background">
      <div className="web-container grid gap-10 py-12 md:grid-cols-[1.5fr_0.7fr_0.7fr_1.3fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <Logo
            iconClassName="size-11"
            textClassName="text-4xl"
          />
          {description && <p className="max-w-xs text-base leading-7 wrap-anywhere text-muted-foreground">{description}</p>}
          <div className="flex items-center gap-5">
            {socialLinks.map((item) => (
              <HugeiconsIcon
                key={item.label}
                icon={item.icon}
                role="img"
                aria-label={item.label}
                strokeWidth={2}
                className="size-5"
              />
            ))}
          </div>
        </div>

        <FooterLinkGroup
          title="Menu"
          links={navigationItems}
        />

        <FooterLinkGroup
          title="Categoria"
          links={categories}
        />

        {(phone || email || address) && (
          <div>
            <h2 className="font-heading text-base font-bold">Servicio al cliente</h2>
            <address className="mt-6 flex flex-col gap-5 text-sm text-muted-foreground not-italic">
              {phone && (
                <a
                  href={phone.href}
                  className="flex items-center gap-3 transition-colors hover:text-foreground"
                >
                  <HugeiconsIcon
                    icon={Call02Icon}
                    strokeWidth={2}
                    className="size-5 text-foreground"
                    aria-hidden="true"
                  />
                  {phone.display}
                </a>
              )}
              {email && (
                <a
                  href={'mailto:' + email}
                  className="flex items-center gap-3 transition-colors hover:text-foreground"
                >
                  <HugeiconsIcon
                    icon={Mail01Icon}
                    strokeWidth={2}
                    className="size-5 text-foreground"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 wrap-anywhere">{email}</span>
                </a>
              )}
              {address && (
                <span className="flex items-center gap-3 transition-colors hover:text-foreground">
                  <HugeiconsIcon
                    icon={Location01Icon}
                    strokeWidth={2}
                    className="size-5 text-foreground"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 wrap-anywhere">{address}</span>
                </span>
              )}
            </address>
          </div>
        )}
      </div>

      <div className="border-y border-border">
        <div className="web-container grid gap-6 py-7 sm:grid-cols-2 lg:grid-cols-4">
          {footerFeatures.map((feature) => {
            return (
              <div
                key={feature.highlight}
                className="flex items-center gap-4"
              >
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <HugeiconsIcon
                    icon={feature.icon}
                    strokeWidth={2}
                    className="size-7"
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">{feature.title}</p>
                  <h3 className="mt-1 text-base font-bold">{feature.highlight}</h3>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="web-container flex flex-col items-center justify-between gap-4 py-7 text-sm text-muted-foreground md:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {creditName}
          {creditName.endsWith('.') ? '' : '.'} Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-8">
          <span>Politica de privacidad</span>
          <span>Terminos y condiciones</span>
        </div>
      </div>
    </footer>
  )
}

interface FooterLinkGroupProps {
  title: string
  links: Array<{
    label: string
    href?: string
  }>
}

function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <nav aria-label={title}>
      <h2 className="font-heading text-base font-bold">{title}</h2>
      <ul className="mt-6 flex flex-col gap-5 text-sm text-muted-foreground">
        {links.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <a
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ) : (
              item.label
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
