import PasswordConfirmationForm from '@/pages/admin/auth/components/password-confirmation-form'
import { Head } from '@inertiajs/react'

export default function ConfirmPassword() {
  return (
    <>
      <Head title="Confirmar contraseña" />

      <PasswordConfirmationForm />
    </>
  )
}

ConfirmPassword.layout = {
  title: 'Confirmar contraseña',
  description: 'Esta es un área segura de la aplicación. Por favor confirma tu contraseña antes de continuar.',
}
