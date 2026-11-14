import InputError from '@/components/admin/input-error'
import PasswordInput from '@/components/admin/password-input'
import { Button } from '@/components/admin/ui/button'
import { Checkbox } from '@/components/admin/ui/checkbox'
import { Input } from '@/components/admin/ui/input'
import { Label } from '@/components/admin/ui/label'
import { Spinner } from '@/components/admin/ui/spinner'
import ForgotPasswordDialog from '@/pages/admin/auth/components/forgot-password-dialog'
import { store } from '@/routes/admin/auth/login'
import { Form } from '@inertiajs/react'

export default function LoginForm() {
  return (
    <Form
      {...store.form()}
      resetOnSuccess={['password']}
      className="flex flex-col gap-6"
    >
      {({ processing, errors }) => (
        <>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                name="email"
                required
                autoFocus
                tabIndex={1}
                autoComplete="email"
                placeholder="correo@ejemplo.com"
              />
              <InputError message={errors.email} />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
                <ForgotPasswordDialog triggerClassName="ml-auto text-sm" />
              </div>
              <PasswordInput
                id="password"
                name="password"
                required
                tabIndex={2}
                autoComplete="current-password"
                placeholder="Contraseña"
              />
              <InputError message={errors.password} />
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="remember"
                name="remember"
                value="1"
                tabIndex={3}
              />
              <Label htmlFor="remember">Recordarme</Label>
            </div>

            <Button
              type="submit"
              className="mt-4 w-full"
              tabIndex={4}
              disabled={processing}
              data-test="login-button"
            >
              {processing && <Spinner />}
              Iniciar sesión
            </Button>
          </div>
        </>
      )}
    </Form>
  )
}
