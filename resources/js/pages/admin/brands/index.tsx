import Heading from '@/components/admin/heading'
import BrandsTable from '@/pages/admin/brands/components/brands-table'
import CreateBrandModal from '@/pages/admin/brands/components/create-brand-modal'
import { index as brandsIndex } from '@/routes/admin/brands'
import type { Brand } from '@/types/entities'
import { Tag01Icon } from '@hugeicons/core-free-icons'
import { Head } from '@inertiajs/react'

interface BrandsIndexProps {
  brands: Brand[]
}

export default function BrandsIndex({ brands }: BrandsIndexProps) {
  return (
    <>
      <Head title="Marcas" />

      <div className="flex flex-col gap-8 p-4 lg:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <Heading
            title="Marcas"
            description="Gestiona las marcas del catálogo y revisa su estado, código y logo."
            badgeIcon={Tag01Icon}
            badgeLabel="Catálogo"
          />

          <div className="flex w-full items-start justify-start md:w-auto md:justify-end">
            <CreateBrandModal />
          </div>
        </div>

        <BrandsTable brands={brands} />
      </div>
    </>
  )
}

BrandsIndex.layout = {
  breadcrumbs: [
    {
      title: 'Marcas',
      href: brandsIndex(),
    },
  ],
}
