import { Logo } from '@/components/store/storefront/logo'
import { navigationItems } from '@/components/store/storefront/navigation'
import { Button } from '@/components/store/ui/button'
import { Separator } from '@/components/store/ui/separator'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/store/ui/sheet'
import { ArrowRight01Icon, FavouriteIcon, Menu01Icon, ShoppingBag01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="Abrir menu"
        >
          <HugeiconsIcon
            icon={Menu01Icon}
            strokeWidth={2}
            className="size-5"
            aria-hidden="true"
          />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        aria-describedby={undefined}
        className="w-80 max-w-[90vw] gap-6 overflow-y-auto p-6 [&_[data-slot=sheet-close]]:top-5 [&_[data-slot=sheet-close]]:right-5 [&_[data-slot=sheet-close]_svg]:size-5"
      >
        <SheetHeader className="p-0 pr-12">
          <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
          <SheetClose asChild>
            <Logo
              iconClassName="size-9"
              textClassName="text-2xl"
            />
          </SheetClose>
        </SheetHeader>

        <nav
          className="flex flex-col gap-1"
          aria-label="Navegacion movil"
        >
          {navigationItems.map((item) =>
            item.href ? (
              <SheetClose
                key={item.label}
                asChild
              >
                <a
                  href={item.href}
                  className="flex items-center justify-between rounded-lg px-1 py-3 text-sm font-medium transition-colors hover:bg-muted hover:px-3"
                >
                  {item.label}
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="size-4 text-muted-foreground"
                  />
                </a>
              </SheetClose>
            ) : (
              <span
                key={item.label}
                className="px-1 py-3 text-sm font-medium"
              >
                {item.label}
              </span>
            ),
          )}
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          <Separator />
          <Button
            variant="outline"
            className="justify-start disabled:opacity-100"
            disabled
          >
            <HugeiconsIcon
              icon={FavouriteIcon}
              strokeWidth={2}
              data-icon="inline-start"
              aria-hidden="true"
            />
            Favoritos
          </Button>
          <Button
            variant="outline"
            className="justify-start disabled:opacity-100"
            disabled
          >
            <HugeiconsIcon
              icon={ShoppingBag01Icon}
              strokeWidth={2}
              data-icon="inline-start"
              aria-hidden="true"
            />
            Carrito
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
