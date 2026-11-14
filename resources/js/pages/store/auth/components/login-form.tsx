import TextLink from '@/components/store/text-link'
import { Button } from '@/components/store/ui/button'
import { Checkbox } from '@/components/store/ui/checkbox'
import { Label } from '@/components/store/ui/label'
import { Spinner } from '@/components/store/ui/spinner'
import { AuthField } from '@/pages/store/auth/components/auth-field'
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
      className="flex flex-col gap-7"
    >
      {({ processing, errors }) => (
        <>
          <div className="grid gap-4">
            <AuthField
              label="Correo electrónico"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Correo electrónico*"
              error={errors.email}
            />
            <AuthField
              label="Contraseña"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Contraseña*"
              error={errors.password}
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="remember"
                  name="remember"
                  value="1"
                />
                <Label htmlFor="remember">Recordarme</Label>
              </div>
              {canResetPassword && <TextLink href={request()}>¿Olvidaste tu contraseña?</TextLink>}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full text-base"
            disabled={processing}
            data-test="login-button"
          >
            {processing && <Spinner />}
            Iniciar sesión
          </Button>
          <p className="text-sm text-muted-foreground sm:text-base">
            ¿No tienes una cuenta? <TextLink href={register()}>Crear cuenta</TextLink>
          </p>
        </>
      )}
    </Form>
  )
}
