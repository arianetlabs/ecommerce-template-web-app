import StoreProviders from '@/components/store/providers'
import { Footer } from '@/components/store/storefront/footer'
import { Header } from '@/components/store/storefront/header'
import type { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <StoreProviders>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </StoreProviders>
  )
}

export default Layout
