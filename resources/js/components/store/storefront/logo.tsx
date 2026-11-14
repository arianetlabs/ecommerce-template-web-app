import { cn } from '@/lib/utils'
import { home } from '@/routes/store'
import { Link, usePage } from '@inertiajs/react'

interface LogoProps {
  imageClassName?: string
}

export function Logo({ imageClassName }: LogoProps) {
  const { branding, site_name: siteName } = usePage().props.site
  const hasDarkLogo = branding.main_logo_dark.url !== branding.main_logo.url
  const imageClass = cn('h-8 w-auto max-w-36 object-contain object-left sm:max-w-48', imageClassName)

  return (
    <Link
      href={home()}
      className="inline-flex shrink-0 items-center"
      aria-label={`${siteName || 'Avelio'}: inicio`}
    >
      <img
        src={branding.main_logo.url}
        alt=""
        className={cn(imageClass, hasDarkLogo && 'dark:hidden')}
      />
      {hasDarkLogo && (
        <img
          src={branding.main_logo_dark.url}
          alt=""
          className={cn(imageClass, 'hidden dark:block')}
        />
      )}
    </Link>
  )
}
