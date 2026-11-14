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

      <div className="grid gap-7">
        <PasswordResetLinkForm />

        <p className="text-sm text-muted-foreground sm:text-base">
          O vuelve a <TextLink href={login()}>iniciar sesión</TextLink>
        </p>
      </div>
    </>
  )
}

ForgotPassword.layout = {
  title: 'Recuperar contraseña',
  description: 'Ingresa tu correo para restablecer tu contraseña.',
  illustration: 'forgot',
}
