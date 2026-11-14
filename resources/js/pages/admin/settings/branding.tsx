import Heading from '@/components/admin/heading'
import SiteBrandingForm from '@/pages/admin/settings/components/site-branding-form'
import { edit as editBranding } from '@/routes/admin/branding'
import { Head, usePage } from '@inertiajs/react'

const Branding = () => {
  const { branding } = usePage().props.site

  return (
    <>
      <Head title="Logotipo del sitio" />

      <div className="space-y-6">
        <Heading
          variant="small"
          title="Logotipo del sitio"
          description="Personaliza las imágenes que identifican a tu tienda."
        />

        <section className="space-y-4 border-t pt-6">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold">Favicon</h3>
            <p className="text-sm text-muted-foreground">Ícono de la pestaña del navegador. PNG o SVG cuadrado de hasta 2 MB. Tamaños recomendados: 256 × 256 o 512 × 512 px.</p>
          </div>
          <SiteBrandingForm
            field="favicon"
            title="Favicon para tema claro"
            image={branding.favicon}
          />
          <SiteBrandingForm
            field="favicon_dark"
            title="Favicon para tema oscuro"
            image={branding.favicon_dark}
          />
        </section>

        <section className="space-y-4 border-t pt-6">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold">Logotipo principal</h3>
            <p className="text-sm text-muted-foreground">Imagen de la cabecera y el pie de página de la tienda. PNG o SVG de hasta 2 MB.</p>
          </div>
          <SiteBrandingForm
            field="main_logo"
            title="Logotipo para tema claro"
            image={branding.main_logo}
          />
          <SiteBrandingForm
            field="main_logo_dark"
            title="Logotipo para tema oscuro"
            image={branding.main_logo_dark}
          />
        </section>
      </div>
    </>
  )
}

Branding.layout = {
  breadcrumbs: [{ title: 'Logotipo del sitio', href: editBranding() }],
}

export default Branding
