import { AppearanceToggle } from '@/components/store/storefront/appearance-toggle'
import { Logo } from '@/components/store/storefront/logo'
import { MobileSidebar } from '@/components/store/storefront/mobile-sidebar'
import { navigationItems } from '@/components/store/storefront/navigation'
import { Button } from '@/components/store/ui/button'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/store/ui/input-group'
import { formatStorePhone } from '@/lib/store/phone'
import { home } from '@/routes/store'
import { overview } from '@/routes/store/account'
import { login } from '@/routes/store/auth'
import {
  ArrowUpRight01Icon,
  ArrowDown01Icon,
  CustomerSupportIcon,
  Mail01Icon,
  Location01Icon,
  Call02Icon,
  Search01Icon,
  ShoppingBag01Icon,
  DeliveryTruck01Icon,
  UserIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link, usePage } from '@inertiajs/react'

export function Header() {
  const { auth, site } = usePage().props
  const { email } = site
  const phone = formatStorePhone(site.phone)
  const accountHref = auth.user ? overview() : login()

  return (
    <header className="border-b border-border bg-background">
      <div className="hidden text-xs text-muted-foreground lg:block">
        <div className="web-container flex h-9 items-center justify-between">
          <div className="flex items-center gap-5">
            {phone && (
              <a
                href={phone.href}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <HugeiconsIcon
                  icon={Call02Icon}
                  strokeWidth={2}
                  className="size-3.5"
                  aria-hidden="true"
                />
                {phone.display}
              </a>
            )}
            {email && (
              <a
                href={'mailto:' + email}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <HugeiconsIcon
                  icon={Mail01Icon}
                  strokeWidth={2}
                  className="size-3.5"
                  aria-hidden="true"
                />
                {email}
              </a>
            )}
          </div>

          <div className="flex items-center gap-5">
            <a
              href={home.url() + '#colecciones'}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <HugeiconsIcon
                icon={Location01Icon}
                strokeWidth={2}
                className="size-3.5"
                aria-hidden="true"
              />
              Tienda
            </a>
            <span className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              <HugeiconsIcon
                icon={DeliveryTruck01Icon}
                strokeWidth={2}
                className="size-3.5"
                aria-hidden="true"
              />
              Seguir pedido
            </span>
          </div>
        </div>
      </div>

      <div className="web-container hidden h-19 items-center justify-between gap-20 lg:flex">
        <Logo />

        <InputGroup className="max-w-3xl">
          <InputGroupInput
            placeholder="Buscar..."
            aria-label="Buscar productos"
            disabled
            className="disabled:opacity-100"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-sm"
              disabled
              className="disabled:opacity-100"
              aria-label="Buscar"
            >
              <HugeiconsIcon
                icon={Search01Icon}
                strokeWidth={2}
              />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            className="gap-3 px-2 pr-4"
          >
            <Link href={accountHref}>
              <span className="grid size-10 place-items-center rounded-lg bg-secondary">
                <HugeiconsIcon
                  icon={UserIcon}
                  strokeWidth={2}
                  className="size-5"
                  aria-hidden="true"
                />
              </span>
              <span className="flex flex-col items-start leading-tight">
                <span className="text-xs text-muted-foreground">Cuenta</span>
                <span className="text-sm font-semibold">{auth.user ? 'Mi cuenta' : 'Iniciar sesión'}</span>
              </span>
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                strokeWidth={2}
                className="size-4 text-muted-foreground"
                aria-hidden="true"
              />
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="gap-3 px-2 pr-4 disabled:opacity-100"
            aria-label="Carrito"
            disabled
          >
            <span className="grid size-10 place-items-center rounded-lg bg-secondary">
              <HugeiconsIcon
                icon={ShoppingBag01Icon}
                strokeWidth={2}
                className="size-5"
                aria-hidden="true"
              />
            </span>
            <span className="flex flex-col items-start leading-tight">
              <span className="text-xs text-muted-foreground">Carrito</span>
              <span className="text-sm font-semibold">0 articulos</span>
            </span>
          </Button>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="web-container flex h-14 items-center justify-center gap-10">
          <nav
            className="flex items-center gap-7 text-sm font-medium"
            aria-label="Navegacion principal"
          >
            {navigationItems.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-muted-foreground"
                >
                  {item.label}
                </a>
              ) : (
                <span key={item.label}>{item.label}</span>
              ),
            )}
          </nav>

          <Button
            asChild
            variant="outline"
            size="sm"
          >
            <a href={home.url() + '#productos'}>
              Comprar ahora
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                strokeWidth={2}
                data-icon="inline-end"
                aria-hidden="true"
              />
            </a>
          </Button>

          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-background">
              <HugeiconsIcon
                icon={CustomerSupportIcon}
                strokeWidth={2}
                className="size-5"
                aria-hidden="true"
              />
            </span>
            <span className="flex flex-col text-sm leading-tight">
              <span className="font-medium">Soporte 24/7</span>
              {phone && (
                <a
                  href={phone.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {phone.display}
                </a>
              )}
            </span>
            <AppearanceToggle />
          </div>
        </div>
      </div>

      <div className="web-container grid h-17 grid-cols-3 items-center lg:hidden">
        <div className="flex items-center gap-1 justify-self-start">
          <MobileSidebar />
          <AppearanceToggle />
        </div>
        <div className="justify-self-center">
          <Logo />
        </div>
        <Button
          asChild
          variant="ghost"
          size="icon-xs"
          className="justify-self-end"
        >
          <Link
            href={accountHref}
            aria-label={auth.user ? 'Mi cuenta' : 'Iniciar sesión'}
          >
            <HugeiconsIcon
              icon={UserIcon}
              strokeWidth={2}
              className="size-5"
              aria-hidden="true"
            />
          </Link>
        </Button>
      </div>

      <div className="hidden bg-primary py-2 text-primary-foreground md:block lg:hidden">
        <div className="web-container flex items-center justify-center gap-2 text-xs font-medium">
          <HugeiconsIcon
            icon={Location01Icon}
            strokeWidth={2}
            className="size-3.5"
            aria-hidden="true"
          />
          Envio gratis desde $120 y devoluciones faciles
        </div>
      </div>
    </header>
  )
}
