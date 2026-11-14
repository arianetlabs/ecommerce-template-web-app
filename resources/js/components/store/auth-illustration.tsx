import { FileEditIcon, Key01Icon, Mail01Icon, ShieldUserIcon, UserIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

const icons = {
  login: Key01Icon,
  register: UserIcon,
  forgot: ShieldUserIcon,
  reset: FileEditIcon,
  verify: Mail01Icon,
}

export type AuthIllustrationVariant = keyof typeof icons

interface AuthIllustrationProps {
  variant: AuthIllustrationVariant
}

export function AuthIllustration({ variant }: AuthIllustrationProps) {
  return (
    <div
      className="mx-auto flex size-32 items-center justify-center rounded-full bg-secondary"
      aria-hidden="true"
    >
      <div className="flex size-16 items-center justify-center rounded-2xl border border-foreground bg-yellow-400 text-neutral-950">
        <HugeiconsIcon
          icon={icons[variant]}
          className="size-10"
          strokeWidth={1}
        />
      </div>
    </div>
  )
}
