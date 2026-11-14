import { Alert, AlertDescription } from '@/components/store/ui/alert'
import LoginForm from '@/pages/store/auth/components/login-form'
import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Head } from '@inertiajs/react'

interface LoginProps {
  status?: string
  canResetPassword: boolean
}

export default function Login({ status, canResetPassword }: LoginProps) {
  return (
    <>
      <Head title="Iniciar sesión" />

      <LoginForm canResetPassword={canResetPassword} />

      {status && (
        <Alert className="w-full text-green-700 dark:text-green-400">
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            strokeWidth={1.5}
          />
          <AlertDescription className="text-green-700/80 dark:text-green-400/80">{status}</AlertDescription>
        </Alert>
      )}
    </>
  )
}

Login.layout = {
  title: 'Iniciar sesión',
  description: 'Ingresa tus credenciales para acceder a tu cuenta.',
  illustration: 'login',
}
