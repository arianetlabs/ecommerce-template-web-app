import InputError from '@/components/store/input-error'
import TextLink from '@/components/store/text-link'
import { Button } from '@/components/store/ui/button'
import { Label } from '@/components/store/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/store/ui/select'
import { Spinner } from '@/components/store/ui/spinner'
import { AuthField } from '@/pages/store/auth/components/auth-field'
import { login } from '@/routes/store/auth'
import { store } from '@/routes/store/auth/register'
import type { SelectOption } from '@/types'
import { Form } from '@inertiajs/react'

interface RegistrationFormProps {
  document_type_options: SelectOption[]
  passwordRules: string
}

export default function RegistrationForm({ document_type_options, passwordRules }: RegistrationFormProps) {
  return (
    <Form
      {...store.form()}
      resetOnSuccess={['password', 'password_confirmation']}
      disableWhileProcessing
      className="flex flex-col gap-7"
    >
      {({ processing, errors }) => (
        <>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <AuthField
                label="Nombres"
                name="name"
                required
                autoComplete="given-name"
                placeholder="Nombres*"
                error={errors.name}
              />
              <AuthField
                label="Apellidos"
                name="last_name"
                required
                autoComplete="family-name"
                placeholder="Apellidos*"
                error={errors.last_name}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="document_type">Tipo de documento</Label>

                <Select name="document_type">
                  <SelectTrigger
                    id="document_type"
                    className="w-full"
                    aria-invalid={Boolean(errors.document_type)}
                    aria-describedby={errors.document_type ? 'document-type-error' : undefined}
                  >
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>

                  <SelectContent>
                    {document_type_options.map((documentType) => (
                      <SelectItem
                        value={documentType.value}
                        key={documentType.value}
                      >
                        {documentType.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <InputError
                  id="document-type-error"
                  message={errors.document_type}
                />
              </div>
              <AuthField
                label="Número de documento"
                name="document_number"
                required
                placeholder="Número de documento"
                error={errors.document_number}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
              <AuthField
                label="Teléfono"
                name="phone"
                type="tel"
                autoComplete="tel-national"
                required
                placeholder="Ej: 987654321"
                error={errors.phone}
              />
              <AuthField
                label="Correo electrónico"
                type="email"
                name="email"
                required
                autoComplete="username"
                placeholder="correo@ejemplo.com"
                error={errors.email}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <AuthField
                label="Contraseña"
                type="password"
                required
                autoComplete="new-password"
                name="password"
                placeholder="Contraseña"
                passwordrules={passwordRules}
                error={errors.password}
              />
              <AuthField
                label="Confirmar contraseña"
                type="password"
                required
                autoComplete="new-password"
                name="password_confirmation"
                placeholder="Confirmar contraseña"
                passwordrules={passwordRules}
                error={errors.password_confirmation}
              />
            </div>

            <Button
              type="submit"
              className="w-full text-base"
              disabled={processing}
              data-test="register-user-button"
            >
              {processing && <Spinner />}
              Crear cuenta
            </Button>
          </div>

          <div className="text-sm text-muted-foreground sm:text-base">
            ¿Ya tienes una cuenta? <TextLink href={login()}>Inicia sesión</TextLink>
          </div>
        </>
      )}
    </Form>
  )
}
