import InformationController from '@/actions/App/Http/Controllers/Admin/Settings/InformationController'
import InputError from '@/components/admin/input-error'
import { Button } from '@/components/admin/ui/button'
import { Input } from '@/components/admin/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/admin/ui/input-group'
import { Label } from '@/components/admin/ui/label'
import { Spinner } from '@/components/admin/ui/spinner'
import { Textarea } from '@/components/admin/ui/textarea'
import type { SiteSettings } from '@/types'
import { RefreshIcon, SaveIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Form } from '@inertiajs/react'

interface SiteInformationFormProps {
  settings: SiteSettings
}

export default function SiteInformationForm({ settings }: SiteInformationFormProps) {
  return (
    <Form
      {...InformationController.update.form()}
      options={{
        preserveScroll: true,
      }}
      className="space-y-6"
    >
      {({ errors, processing }) => (
        <>
          <div className="grid items-start gap-4 xl:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="site_name">Nombre del sitio</Label>

              <Input
                id="site_name"
                defaultValue={settings.site_name}
                maxLength={128}
                name="site_name"
                placeholder="Nombre del sitio"
                required
              />

              <InputError message={errors.site_name} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="footer_credit_name">Nombre en créditos del footer</Label>

              <Input
                id="footer_credit_name"
                defaultValue={settings.footer_credit_name}
                maxLength={128}
                name="footer_credit_name"
                placeholder="Nombre para créditos"
                required
              />

              <InputError message={errors.footer_credit_name} />
            </div>
          </div>

          <div className="grid items-start gap-4 xl:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>

              <Input
                id="email"
                type="email"
                defaultValue={settings.email}
                maxLength={128}
                name="email"
                placeholder="correo@ejemplo.com"
                required
              />

              <InputError message={errors.email} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Celular</Label>

              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <InputGroupText>+51</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  id="phone"
                  className="rounded-none border-0 shadow-none focus-visible:ring-0"
                  defaultValue={settings.phone}
                  inputMode="numeric"
                  maxLength={9}
                  minLength={9}
                  name="phone"
                  pattern="[0-9]{9}"
                  placeholder="987654321"
                  required
                />
              </InputGroup>

              <InputError message={errors.phone} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">Dirección</Label>

            <Input
              id="address"
              defaultValue={settings.address}
              maxLength={128}
              name="address"
              placeholder="Av. Principal 123"
              required
            />

            <InputError message={errors.address} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="site_description">Descripción del sitio</Label>

            <Textarea
              id="site_description"
              defaultValue={settings.site_description}
              maxLength={255}
              name="site_description"
              placeholder="Describe brevemente el sitio"
              required
            />

            <InputError message={errors.site_description} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="site_keywords">Palabras clave</Label>

            <Input
              id="site_keywords"
              defaultValue={settings.site_keywords}
              maxLength={255}
              name="site_keywords"
              placeholder="ecommerce, tienda, online"
              required
            />

            <p className="text-xs text-muted-foreground">Se guardan separadas por comas.</p>
            <InputError message={errors.site_keywords} />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
            <Button
              type="reset"
              variant="outline"
              disabled={processing}
            >
              <HugeiconsIcon
                icon={RefreshIcon}
                strokeWidth={1.5}
              />
              Cancelar
            </Button>

            <Button
              disabled={processing}
              type="submit"
            >
              {processing ? (
                <Spinner />
              ) : (
                <HugeiconsIcon
                  icon={SaveIcon}
                  strokeWidth={1.5}
                />
              )}
              Guardar cambios
            </Button>
          </div>
        </>
      )}
    </Form>
  )
}
