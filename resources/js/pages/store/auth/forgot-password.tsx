import TextLink from '@/components/store/text-link'
import { Alert, AlertDescription } from '@/components/store/ui/alert'
import PasswordResetLinkForm from '@/pages/store/auth/components/password-reset-link-form'
import { login } from '@/routes/store/auth'
import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Head } from '@inertiajs/react'

interface ForgotPasswordProps {
  status?: string
}

export default function ForgotPassword({ status }: ForgotPasswordProps) {
  return (
    <>
      <Head title="Olvidé mi contraseña" />

      {status && (
        <Alert className="w-full text-green-700 dark:text-green-400">
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            strokeWidth={1.5}
          />
          <AlertDescription className="text-green-700/80 dark:text-green-400/80">{status}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <PasswordResetLinkForm />

        <div className="space-x-1 text-center text-sm text-muted-foreground">
          <span>O volver a</span>
          <TextLink href={login()}>iniciar sesión</TextLink>
        </div>
      </div>
    </>
  )
}

ForgotPassword.layout = {
  title: 'Olvidé mi contraseña',
  description: 'Ingresa tu correo para recibir un enlace de recuperación',
}
