import PasswordResetForm from '@/pages/store/auth/components/password-reset-form'
import { Head } from '@inertiajs/react'

interface ResetPasswordProps {
  token: string
  email: string
  passwordRules: string
}

export default function ResetPassword({ token, email, passwordRules }: ResetPasswordProps) {
  return (
    <>
      <Head title="Restablecer contraseña" />

      <PasswordResetForm
        token={token}
        email={email}
        passwordRules={passwordRules}
      />
    </>
  )
}

ResetPassword.layout = {
  title: 'Crear nueva contraseña',
  description: 'Define una contraseña nueva para tu cuenta.',
  illustration: 'reset',
}
