import LoginForm from '@/pages/admin/auth/components/login-form'
import { Head } from '@inertiajs/react'

interface LoginProps {
  status?: string
}

export default function Login({ status }: LoginProps) {
  return (
    <>
      <Head title="Iniciar sesión" />

      <LoginForm />

      {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
    </>
  )
}

Login.layout = {
  title: 'Acceso al panel de administración',
  description: 'Ingresa tus credenciales para acceder al panel',
}
