import Heading from '@/components/admin/heading'
import ListPagination from '@/components/admin/list-pagination'
import { Card, CardContent } from '@/components/admin/ui/card'
import ProductTable from '@/pages/admin/products/components/product-table'
import ProductToolbar from '@/pages/admin/products/components/product-toolbar'
import { index as productsIndex } from '@/routes/admin/products'
import type { Paginated } from '@/types/admin'
import type { Product } from '@/types/entities'
import { Package01Icon } from '@hugeicons/core-free-icons'
import { Head } from '@inertiajs/react'

interface ProductsIndexProps {
  products: Paginated<Product>
  filters: {
    search: string
  }
}

export default function ProductsIndex({ products, filters }: ProductsIndexProps) {
  return (
    <>
      <Head title="Productos" />

      <div className="flex flex-col gap-8 p-4 lg:p-8">
        <Heading
          title="Productos"
          description="Administra el catálogo, sus precios y el estado de publicación."
          badgeIcon={Package01Icon}
          badgeLabel="Catálogo"
        />

        <ProductToolbar
          key={filters.search}
          initialSearch={filters.search}
        />

        <Card className="gap-0 border-sidebar-border/70 p-0 shadow-none dark:border-sidebar-border">
          <CardContent className="px-0">
            <ProductTable
              hasSearch={filters.search !== ''}
              products={products.data}
            />
          </CardContent>
        </Card>

        <ListPagination
          pagination={products}
          label="Paginación de productos"
        />
      </div>
    </>
  )
}

ProductsIndex.layout = {
  breadcrumbs: [
    {
      title: 'Productos',
      href: productsIndex(),
    },
  ],
}
