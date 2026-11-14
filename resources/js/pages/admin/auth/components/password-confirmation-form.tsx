import InputError from '@/components/admin/input-error'
import PasswordInput from '@/components/admin/password-input'
import { Button } from '@/components/admin/ui/button'
import { Label } from '@/components/admin/ui/label'
import { Spinner } from '@/components/admin/ui/spinner'
import { store } from '@/routes/admin/auth/password/confirm'
import { Form } from '@inertiajs/react'

export default function PasswordConfirmationForm() {
  return (
    <Form
      {...store.form()}
      resetOnSuccess={['password']}
    >
      {({ processing, errors }) => (
        <div className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <PasswordInput
              id="password"
              name="password"
              placeholder="Contraseña"
              autoComplete="current-password"
              autoFocus
            />

            <InputError message={errors.password} />
          </div>

          <div className="flex items-center">
            <Button
              className="w-full"
              disabled={processing}
              data-test="confirm-password-button"
            >
              {processing && <Spinner />}
              Confirmar contraseña
            </Button>
          </div>
        </div>
      )}
    </Form>
  )
}
