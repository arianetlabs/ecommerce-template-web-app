import Heading from '@/components/admin/heading'
import CustomersTable from '@/pages/admin/customers/components/customers-table'
import { index as customersIndex } from '@/routes/admin/customers'
import type { Customer } from '@/types/entities'
import { ShoppingBag01Icon } from '@hugeicons/core-free-icons'
import { Head } from '@inertiajs/react'

interface CustomersIndexProps {
  customers: Customer[]
}

export default function CustomersIndex({ customers }: CustomersIndexProps) {
  return (
    <>
      <Head title="Clientes" />

      <div className="flex flex-col gap-8 p-4 lg:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <Heading
            title="Clientes"
            description="Gestiona los usuarios clientes registrados en la tienda y revisa su información en un solo lugar."
            badgeIcon={ShoppingBag01Icon}
            badgeLabel="Tienda"
          />

          <div className="flex w-full flex-wrap items-center justify-start gap-3 md:w-auto md:justify-end">
            <div
              className="h-10 w-full md:w-36"
              aria-hidden="true"
            />
          </div>
        </div>

        <CustomersTable customers={customers} />
      </div>
    </>
  )
}

CustomersIndex.layout = {
  breadcrumbs: [
    {
      title: 'Clientes',
      href: customersIndex(),
    },
  ],
}
