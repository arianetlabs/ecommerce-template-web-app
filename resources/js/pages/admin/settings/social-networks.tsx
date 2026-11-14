import Heading from '@/components/admin/heading'
import SiteSocialNetworksForm from '@/pages/admin/settings/components/site-social-networks-form'
import type { SocialNetworksSettings } from '@/pages/admin/settings/components/site-social-networks-form'
import { edit as editSocialNetworks } from '@/routes/admin/social-networks'
import type { SocialNetwork } from '@/types/site-settings'
import { Head } from '@inertiajs/react'

interface SocialNetworksProps {
  settings: SocialNetworksSettings
  prefixes: Record<SocialNetwork, string>
  linkedinCompanyPrefix: string
}

const SocialNetworks = ({ settings, prefixes, linkedinCompanyPrefix }: SocialNetworksProps) => {
  return (
    <>
      <Head title="Redes Sociales" />

      <div className="space-y-6">
        <Heading
          variant="small"
          title="Redes Sociales"
          description="Ingresa solo el nombre de usuario, sin @ ni enlace. Deja en blanco las redes que no uses."
        />

        <SiteSocialNetworksForm
          settings={settings}
          prefixes={prefixes}
          linkedinCompanyPrefix={linkedinCompanyPrefix}
        />
      </div>
    </>
  )
}

SocialNetworks.layout = {
  breadcrumbs: [{ title: 'Redes Sociales', href: editSocialNetworks() }],
}

export default SocialNetworks
