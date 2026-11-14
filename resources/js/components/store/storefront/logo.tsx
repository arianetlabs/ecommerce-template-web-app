import { cn } from '@/lib/utils'
import { home } from '@/routes/store'
import { CameraLensIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link } from '@inertiajs/react'

interface LogoProps {
  className?: string
  iconClassName?: string
  textClassName?: string
}

export function Logo({ className, iconClassName, textClassName }: LogoProps) {
  return (
    <Link
      href={home()}
      className={cn('inline-flex items-center gap-1.5', className)}
      aria-label="Avelio inicio"
    >
      <span className={cn('flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground', iconClassName)}>
        <HugeiconsIcon
          icon={CameraLensIcon}
          strokeWidth={2}
          aria-hidden="true"
        />
      </span>
      <span className={cn('font-heading text-xl font-bold tracking-normal', textClassName)}>Avelio</span>
    </Link>
  )
}
