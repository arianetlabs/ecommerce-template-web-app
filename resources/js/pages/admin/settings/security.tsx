import Heading from '@/components/admin/heading'
import AdministratorPasswordForm from '@/pages/admin/settings/components/administrator-password-form'
import { edit } from '@/routes/admin/security'
import { Head } from '@inertiajs/react'

interface SecurityProps {
  passwordRules: string
}

export default function Security(props: SecurityProps) {
  return (
    <>
      <Head title="Configuración de seguridad" />

      <div className="space-y-6">
        <Heading
          variant="small"
          title="Actualizar contraseña"
          description="Asegúrate de que tu cuenta use una contraseña larga y aleatoria para mantenerse segura."
        />

        <AdministratorPasswordForm passwordRules={props.passwordRules} />
      </div>
    </>
  )
}

Security.layout = {
  breadcrumbs: [
    {
      title: 'Ajustes de seguridad',
      href: edit(),
    },
  ],
}
