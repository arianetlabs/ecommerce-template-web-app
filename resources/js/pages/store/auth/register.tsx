import RegistrationForm from '@/pages/store/auth/components/registration-form'
import type { SelectOption } from '@/types'
import { Head } from '@inertiajs/react'

interface RegisterProps {
  document_type_options: SelectOption[]
  passwordRules: string
}

export default function Register({ document_type_options, passwordRules }: RegisterProps) {
  return (
    <>
      <Head title="Registro" />
      <RegistrationForm
        document_type_options={document_type_options}
        passwordRules={passwordRules}
      />
    </>
  )
}

Register.layout = {
  title: 'Crear cuenta',
  description: 'Regístrate para empezar a comprar.',
  illustration: 'register',
}
