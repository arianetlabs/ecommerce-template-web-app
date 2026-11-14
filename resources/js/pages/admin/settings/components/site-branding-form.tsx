import { update } from '@/actions/App/Http/Controllers/Admin/Settings/BrandingController'
import InputError from '@/components/admin/input-error'
import { Button } from '@/components/admin/ui/button'
import { Label } from '@/components/admin/ui/label'
import { Spinner } from '@/components/admin/ui/spinner'
import { cn } from '@/lib/utils'
import type { SiteBrandingImage, SiteSettings } from '@/types/site-settings'
import { Delete02Icon, SaveIcon, Upload04Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Form } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'

interface SiteBrandingFormProps {
  field: keyof SiteSettings['branding']
  title: string
  image: SiteBrandingImage
}

export default function SiteBrandingForm({ field, title, image }: SiteBrandingFormProps) {
  const isDark = field.endsWith('_dark')
  const fileInput = useRef<HTMLInputElement>(null)
  const previewUrlRef = useRef<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [removeImage, setRemoveImage] = useState(false)
  const previewUrl = removeImage ? image.default_url : (preview ?? image.url)

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
      }
    }
  }, [])

  function updatePreview(file?: File) {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
    }

    const url = file ? URL.createObjectURL(file) : null
    previewUrlRef.current = url
    setPreview(url)
  }

  function clearFile() {
    updatePreview()

    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  function reset() {
    clearFile()
    setRemoveImage(false)
  }

  return (
    <Form
      {...update.form()}
      options={{ preserveScroll: true }}
      onSuccess={reset}
    >
      {({ errors, processing, clearErrors }) => (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className={cn('h-24 w-32 shrink-0 overflow-hidden rounded-lg border p-2', isDark ? 'bg-neutral-900' : 'bg-white')}>
            <img
              src={previewUrl}
              alt={title}
              className={cn('h-full w-full object-contain', isDark ? '[color-scheme:dark]' : '[color-scheme:light]')}
            />
          </div>

          <div className="min-w-0 flex-1 space-y-3">
            <div className="grid gap-1">
              <Label htmlFor={field}>{title}</Label>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={processing}
                onClick={() => fileInput.current?.click()}
              >
                <HugeiconsIcon
                  icon={Upload04Icon}
                  strokeWidth={1.5}
                />
                Subir nuevo
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={processing || (!preview && (!image.customized || removeImage))}
                onClick={() => {
                  clearFile()
                  setRemoveImage(image.customized)
                  clearErrors()
                }}
              >
                <HugeiconsIcon
                  icon={Delete02Icon}
                  strokeWidth={1.5}
                />
                Quitar
              </Button>

              <Button
                type="submit"
                size="sm"
                disabled={processing || (!preview && !removeImage)}
              >
                {processing ? (
                  <Spinner />
                ) : (
                  <HugeiconsIcon
                    icon={SaveIcon}
                    strokeWidth={1.5}
                  />
                )}
                Guardar
              </Button>
            </div>

            <input
              id={field}
              name={field}
              ref={fileInput}
              type="file"
              accept=".png,.svg,image/png,image/svg+xml"
              className="sr-only"
              tabIndex={-1}
              onChange={(event) => {
                updatePreview(event.target.files?.[0])
                setRemoveImage(false)
                clearErrors()
              }}
            />
            <input
              type="hidden"
              name={`remove_${field}`}
              value={removeImage ? '1' : '0'}
            />

            {removeImage && <p className="text-sm text-muted-foreground">Guarda los cambios para restaurar la imagen predeterminada.</p>}
            <InputError message={errors[field]} />
          </div>
        </div>
      )}
    </Form>
  )
}
