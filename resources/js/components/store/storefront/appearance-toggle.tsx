import { Button } from '@/components/store/ui/button'
import { type Appearance, useAppearance } from '@/hooks/use-appearance'
import { ComputerIcon, Moon02Icon, Sun01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'

const appearances = {
  light: { icon: Sun01Icon, label: 'Claro', next: 'dark' },
  dark: { icon: Moon02Icon, label: 'Oscuro', next: 'system' },
  system: { icon: ComputerIcon, label: 'Sistema', next: 'light' },
} as const satisfies Record<Appearance, { icon: IconSvgElement; label: string; next: Appearance }>

export function AppearanceToggle() {
  const { appearance, updateAppearance } = useAppearance()
  const current = appearances[appearance] ?? appearances.system
  const label = 'Tema: ' + current.label + '. Cambiar a ' + appearances[current.next].label

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-xs"
      aria-label={label}
      title={label}
      onClick={() => updateAppearance(current.next)}
    >
      <HugeiconsIcon
        icon={current.icon}
        strokeWidth={2}
        aria-hidden="true"
      />
    </Button>
  )
}
