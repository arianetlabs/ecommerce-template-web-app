import { Button } from '@/components/admin/ui/button'
import type { Paginated } from '@/types/admin'
import { ArrowLeft02Icon, ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link } from '@inertiajs/react'

interface ListPaginationProps {
  pagination: Pick<Paginated<unknown>, 'links' | 'meta'>
  label: string
}

interface PaginationLinkProps {
  href: string | null
  label: string
  icon: typeof ArrowLeft02Icon
}

function PaginationLink({ href, label, icon }: PaginationLinkProps) {
  const arrow = (
    <HugeiconsIcon
      aria-hidden="true"
      icon={icon}
      strokeWidth={1.5}
      className="size-5"
    />
  )

  if (href === null) {
    return (
      <Button
        type="button"
        aria-label={label}
        disabled
        size="icon"
        variant="outline"
        className="rounded-full"
      >
        {arrow}
      </Button>
    )
  }

  return (
    <Button
      asChild
      size="icon"
      className="rounded-full"
    >
      <Link
        href={href}
        aria-label={label}
        preserveScroll
      >
        {arrow}
      </Link>
    </Button>
  )
}

export default function ListPagination({ pagination, label }: ListPaginationProps) {
  if (pagination.meta.last_page <= 1) {
    return null
  }

  return (
    <nav
      aria-label={label}
      className="flex items-center gap-4 self-center rounded-full bg-muted p-1"
    >
      <PaginationLink
        href={pagination.links.prev}
        label="Página anterior"
        icon={ArrowLeft02Icon}
      />

      <span
        className="text-sm font-medium tabular-nums"
        aria-live="polite"
      >
        <span className="sr-only">Página </span>
        {pagination.meta.current_page} de {pagination.meta.last_page}
      </span>

      <PaginationLink
        href={pagination.links.next}
        label="Página siguiente"
        icon={ArrowRight02Icon}
      />
    </nav>
  )
}
