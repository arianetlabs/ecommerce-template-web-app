import { cn } from '@/lib/utils'
import { usePage } from '@inertiajs/react'

export default function AppLogo() {
  const { branding, site_name: siteName } = usePage().props.site
  const { favicon, favicon_dark: darkFavicon } = branding
  const hasDarkFavicon = darkFavicon.url !== favicon.url
  const imageClass = 'size-8 shrink-0 rounded-md object-contain'

  return (
    <>
      <img
        src={favicon.url}
        alt=""
        className={cn(imageClass, hasDarkFavicon && 'dark:hidden')}
      />
      {hasDarkFavicon && (
        <img
          src={darkFavicon.url}
          alt=""
          className={cn(imageClass, 'hidden dark:block')}
        />
      )}
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate leading-tight font-semibold">{siteName}</span>
      </div>
    </>
  )
}
