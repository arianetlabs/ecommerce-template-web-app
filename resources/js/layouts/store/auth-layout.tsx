import { AuthIllustration, type AuthIllustrationVariant } from '@/components/store/auth-illustration'
import type { PropsWithChildren } from 'react'

interface AuthLayoutProps extends PropsWithChildren {
  title?: string
  description?: string
  illustration?: AuthIllustrationVariant
}

export default function AuthLayout({ title, description, illustration, children }: AuthLayoutProps) {
  return (
    <main className="mx-auto w-full max-w-lg px-4 py-6 sm:px-0 sm:py-10">
      <section className="flex flex-col gap-7 rounded-xl border border-border bg-background px-6 py-8 shadow-sm sm:px-8 sm:pt-10">
        {title && <h1 className="font-heading text-lg font-bold">{title}</h1>}
        {description && <p className={illustration === 'verify' ? 'text-sm text-muted-foreground' : 'sr-only'}>{description}</p>}
        {illustration && <AuthIllustration variant={illustration} />}
        {children}
      </section>
    </main>
  )
}
