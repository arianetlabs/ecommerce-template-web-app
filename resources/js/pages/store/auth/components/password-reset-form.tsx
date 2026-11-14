import TextLink from '@/components/store/text-link'
import { Button } from '@/components/store/ui/button'
import { Spinner } from '@/components/store/ui/spinner'
import { AuthField } from '@/pages/store/auth/components/auth-field'
import { login } from '@/routes/store/auth'
import { update } from '@/routes/store/auth/password'
import { Form } from '@inertiajs/react'

interface PasswordResetFormProps {
  token: string
  email: string
  passwordRules: string
}

export default function PasswordResetForm({ token, email, passwordRules }: PasswordResetFormProps) {
  return (
    <Form
      {...update.form()}
      transform={(data) => ({ ...data, token })}
      resetOnSuccess={['password', 'password_confirmation']}
    >
      {({ processing, errors }) => (
        <div className="grid gap-7">
          <div className="grid gap-4">
            <AuthField
              label="Correo electrónico"
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={email}
              required
              error={errors.email}
            />
            <AuthField
              label="Nueva contraseña"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Nueva contraseña*"
              passwordrules={passwordRules}
              required
              error={errors.password}
            />
            <AuthField
              label="Confirmar contraseña"
              name="password_confirmation"
              type="password"
              autoComplete="new-password"
              placeholder="Confirmar contraseña*"
              passwordrules={passwordRules}
              required
              error={errors.password_confirmation}
            />
          </div>
          <Button
            type="submit"
            className="w-full text-base"
            disabled={processing}
            data-test="reset-password-button"
          >
            {processing && <Spinner />}
            Cambiar contraseña
          </Button>
          <p>
            <TextLink href={login()}>Volver a iniciar sesión</TextLink>
          </p>
        </div>
      )}
    </Form>
  )
}
