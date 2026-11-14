import Heading from '@/components/admin/heading'
import AdministratorProfileForm from '@/pages/admin/settings/components/administrator-profile-form'
import { edit } from '@/routes/admin/profile'
import { Head } from '@inertiajs/react'

const Profile = () => {
  return (
    <>
      <Head title="Configuración de tu perfil" />

      <div className="space-y-6">
        <Heading
          variant="small"
          title="Configuración de tu perfil"
          description="Actualiza tu nombre completo, celular y correo electrónico."
        />

        <AdministratorProfileForm />
      </div>
    </>
  )
}

Profile.layout = {
  breadcrumbs: [
    {
      title: 'Ajustes de perfil',
      href: edit(),
    },
  ],
}

export default Profile
