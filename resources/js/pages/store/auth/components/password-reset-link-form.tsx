import InputError from '@/components/store/input-error'
import { Button } from '@/components/store/ui/button'
import { Input } from '@/components/store/ui/input'
import { Label } from '@/components/store/ui/label'
import { Spinner } from '@/components/store/ui/spinner'
import { email } from '@/routes/store/auth/password'
import { Form } from '@inertiajs/react'

export default function PasswordResetLinkForm() {
  return (
    <Form {...email.form()}>
      {({ processing, errors }) => (
        <>
          <div className="grid gap-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              name="email"
              autoComplete="off"
              autoFocus
              placeholder="correo@ejemplo.com"
            />

            <InputError message={errors.email} />
          </div>

          <div className="my-6 flex items-center justify-start">
            <Button
              className="w-full"
              disabled={processing}
              data-test="email-password-reset-link-button"
            >
              {processing && <Spinner />}
              Enviar enlace de recuperación
            </Button>
          </div>
        </>
      )}
    </Form>
  )
}
