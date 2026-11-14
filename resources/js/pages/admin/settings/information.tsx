import Heading from '@/components/admin/heading'
import SiteInformationForm from '@/pages/admin/settings/components/site-information-form'
import { edit as editInformation } from '@/routes/admin/information'
import type { SiteSettings } from '@/types'
import { Head } from '@inertiajs/react'

interface InformationProps {
  settings: SiteSettings
}

const Information = ({ settings }: InformationProps) => {
  return (
    <>
      <Head
        key={settings.site_name}
        title="Configuración de información del sitio"
      />

      <div className="space-y-6">
        <Heading
          variant="small"
          title="Configuración de información del sitio"
          description="Administra la información pública del sitio. Está información se muestra al público y es importante para el SEO."
        />

        <SiteInformationForm settings={settings} />
      </div>
    </>
  )
}

Information.layout = {
  breadcrumbs: [
    {
      title: 'Informacion del sitio',
      href: editInformation(),
    },
  ],
}

export default Information
