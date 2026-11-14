import type { Collection } from '@/pages/store/home/data'
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface CollectionCardProps {
  collection: Collection
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <article className="group flex flex-col items-center gap-3 text-center">
      <span className="grid size-30 place-items-center overflow-hidden rounded-full bg-secondary transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md sm:size-36">
        <img
          src={collection.image}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </span>
      <span className="inline-flex items-center gap-1 text-sm font-semibold">
        {collection.title}
        <HugeiconsIcon
          icon={ArrowRight02Icon}
          strokeWidth={2}
          className="size-3.5 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </article>
  )
}
