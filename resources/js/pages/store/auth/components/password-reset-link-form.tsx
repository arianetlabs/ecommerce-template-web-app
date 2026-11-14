import { Button } from '@/components/store/ui/button'
import { Spinner } from '@/components/store/ui/spinner'
import { AuthField } from '@/pages/store/auth/components/auth-field'
import { email } from '@/routes/store/auth/password'
import { Form } from '@inertiajs/react'

export default function PasswordResetLinkForm() {
  return (
    <Form
      {...email.form()}
      className="grid gap-7"
    >
      {({ processing, errors }) => (
        <>
          <AuthField
            label="Correo electrónico"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Correo electrónico*"
            required
            error={errors.email}
          />

          <Button
            type="submit"
            className="w-full text-base"
            disabled={processing}
            data-test="email-password-reset-link-button"
          >
            {processing && <Spinner />}
            Enviar enlace de recuperación
          </Button>
        </>
      )}
    </Form>
  )
}
