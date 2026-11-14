interface SectionHeadingProps {
  title: string
  description: string
}

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-8 max-w-xl text-center">
      <h2 className="font-heading text-3xl font-bold underline decoration-foreground/25 underline-offset-4">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
