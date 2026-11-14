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
  title: 'Restablecer contraseña',
  description: 'Por favor ingresa tu nueva contraseña a continuación',
}
