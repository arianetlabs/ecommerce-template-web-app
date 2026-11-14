import InputError from '@/components/store/input-error'
import PasswordInput from '@/components/store/password-input'
import TextLink from '@/components/store/text-link'
import { Button } from '@/components/store/ui/button'
import { Checkbox } from '@/components/store/ui/checkbox'
import { Input } from '@/components/store/ui/input'
import { Label } from '@/components/store/ui/label'
import { Spinner } from '@/components/store/ui/spinner'
import { register } from '@/routes/store/auth'
import { store } from '@/routes/store/auth/login'
import { request } from '@/routes/store/auth/password'
import { Form } from '@inertiajs/react'

interface LoginFormProps {
  canResetPassword: boolean
}

export default function LoginForm({ canResetPassword }: LoginFormProps) {
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
                {canResetPassword && (
                  <TextLink
                    href={request()}
                    className="ml-auto text-sm"
                    tabIndex={5}
                  >
                    ¿Olvidaste tu contraseña?
                  </TextLink>
                )}
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

          <div className="text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{' '}
            <TextLink
              href={register()}
              tabIndex={5}
            >
              Regístrate
            </TextLink>
          </div>
        </>
      )}
    </Form>
  )
}
