import InputError from '@/components/store/input-error'
import PasswordInput from '@/components/store/password-input'
import { Input } from '@/components/store/ui/input'
import { Label } from '@/components/store/ui/label'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

interface AuthFieldProps extends ComponentProps<typeof Input> {
  name: string
  label: string
  error?: string
}

export function AuthField({ name, id = name, label, error, type, className, ...props }: AuthFieldProps) {
  const errorId = error ? id + '-error' : undefined
  const fieldProps = {
    ...props,
    id,
    name,
    className: cn('border-border px-3 text-base placeholder:text-muted-foreground/80 sm:h-12', className),
    'aria-invalid': Boolean(error),
    'aria-describedby': errorId,
  }

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {type === 'password' ? (
        <PasswordInput
          {...fieldProps}
          className={cn(fieldProps.className, 'pr-10')}
        />
      ) : (
        <Input
          type={type}
          {...fieldProps}
        />
      )}
      <InputError
        id={errorId}
        message={error}
      />
    </div>
  )
}
