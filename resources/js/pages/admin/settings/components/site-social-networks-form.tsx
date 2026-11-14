import InputError from '@/components/admin/input-error'
import { Button } from '@/components/admin/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/admin/ui/input-group'
import { Label } from '@/components/admin/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/admin/ui/select'
import { Spinner } from '@/components/admin/ui/spinner'
import { update } from '@/routes/admin/social-networks'
import type { SocialNetwork } from '@/types/site-settings'
import { SaveIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useForm } from '@inertiajs/react'

const socialNetworks = [
  { name: 'facebook', label: 'Facebook' },
  { name: 'instagram', label: 'Instagram' },
  { name: 'tiktok', label: 'TikTok' },
  { name: 'x', label: 'X (Twitter)' },
  { name: 'youtube', label: 'YouTube' },
  { name: 'threads', label: 'Threads' },
  { name: 'linkedin', label: 'LinkedIn' },
  { name: 'snapchat', label: 'Snapchat' },
  { name: 'pinterest', label: 'Pinterest' },
] as const

type LinkedInProfileType = 'personal' | 'company'
const usernamePattern = /^(?:[\p{L}\p{N}_][\p{L}\p{M}\p{N}._-]*)$/u

export type SocialNetworksSettings = Record<SocialNetwork, string> & {
  linkedin_profile_type: LinkedInProfileType
}

interface SiteSocialNetworksFormProps {
  settings: SocialNetworksSettings
  prefixes: Record<SocialNetwork, string>
  linkedinCompanyPrefix: string
}

export default function SiteSocialNetworksForm({ settings, prefixes, linkedinCompanyPrefix }: SiteSocialNetworksFormProps) {
  const { data, setData, errors, processing, submit } = useForm(settings)

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault()
        submit(update(), { preserveScroll: true })
      }}
    >
      <div className="grid gap-4">
        {socialNetworks.map((network) => {
          const { name, label } = network
          const prefix = name === 'linkedin' && data.linkedin_profile_type === 'company' ? linkedinCompanyPrefix : prefixes[name]
          const username = data[name].trim()
          const profileUrl = usernamePattern.test(username) ? `https://${prefix}${encodeURIComponent(username)}` : null

          return (
            <div
              key={name}
              className="grid min-w-0 gap-2"
            >
              <Label htmlFor={name}>{label}</Label>
              <div className="flex items-start gap-2">
                {name === 'linkedin' && (
                  <Select
                    value={data.linkedin_profile_type}
                    onValueChange={(value: LinkedInProfileType) => setData('linkedin_profile_type', value)}
                  >
                    <SelectTrigger
                      className="shrink-0"
                      aria-label="Tipo de perfil de LinkedIn"
                      aria-invalid={!!errors.linkedin_profile_type}
                      aria-describedby={errors.linkedin_profile_type ? 'linkedin_profile_type-error' : undefined}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Perfil personal</SelectItem>
                      <SelectItem value="company">Empresa</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                <InputGroup className="flex-1">
                  <InputGroupAddon className={name === 'linkedin' ? 'max-w-2/3 min-w-0' : undefined}>
                    <InputGroupText
                      id={`${name}-prefix`}
                      className={name === 'linkedin' ? 'block truncate' : undefined}
                      title={name === 'linkedin' ? prefix : undefined}
                    >
                      {prefix}
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    id={name}
                    name={name}
                    value={data[name]}
                    onChange={(event) => setData(name, event.target.value)}
                    maxLength={100}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    aria-invalid={!!errors[name]}
                    aria-describedby={errors[name] ? `${name}-prefix ${name}-error` : `${name}-prefix`}
                  />
                </InputGroup>
              </div>
              {name === 'linkedin' && (
                <InputError
                  id="linkedin_profile_type-error"
                  message={errors.linkedin_profile_type}
                />
              )}
              <InputError
                id={`${name}-error`}
                message={errors[name]}
              />
              {profileUrl && (
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm break-all text-muted-foreground underline hover:text-foreground"
                >
                  {profileUrl}
                </a>
              )}
            </div>
          )
        })}
      </div>

      <Button
        type="submit"
        disabled={processing}
      >
        {processing ? <Spinner /> : <HugeiconsIcon icon={SaveIcon} />}
        Guardar cambios
      </Button>
    </form>
  )
}
