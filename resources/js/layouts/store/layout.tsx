import StoreProviders from '@/components/store/providers'
import type { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <StoreProviders>
      <div>{children}</div>
    </StoreProviders>
  )
}

export default Layout
