import Heading from '@/components/admin/heading'
import CategoriesTable from '@/pages/admin/categories/components/categories-table'
import CreateCategoryModal from '@/pages/admin/categories/components/create-category-modal'
import { index as categoriesIndex } from '@/routes/admin/categories'
import type { SelectOption } from '@/types'
import type { Category, CategoryParent } from '@/types/entities'
import { GridViewIcon } from '@hugeicons/core-free-icons'
import { Head } from '@inertiajs/react'

interface CategoriesIndexProps {
  categories: Category[]
  parent_category: CategoryParent | null
  category_parent_options: SelectOption[]
}

function getHeadingTitle(parentCategory: CategoryParent | null): string {
  return parentCategory === null ? 'Categorías' : `Subcategorías de ${parentCategory.name}`
}

function getHeadingDescription(parentCategory: CategoryParent | null): string {
  return parentCategory === null
    ? 'Gestiona las categorías del catálogo y accede a sus subcategorías desde el listado.'
    : `Gestiona las subcategorías asociadas a ${parentCategory.name}.`
}

export default function CategoriesIndex({ categories, parent_category, category_parent_options }: CategoriesIndexProps) {
  const title = getHeadingTitle(parent_category)
  const description = getHeadingDescription(parent_category)

  return (
    <>
      <Head title={title} />

      <div className="flex flex-col gap-8 p-4 lg:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <Heading
            title={title}
            description={description}
            badgeIcon={GridViewIcon}
            badgeLabel="Catálogo"
          />

          <div className="flex w-full flex-wrap items-center justify-start gap-3 md:w-auto md:justify-end">
            <CreateCategoryModal
              parentCategoryOptions={category_parent_options}
              defaultParentId={parent_category?.id ?? null}
              triggerClassName="w-full md:w-auto"
            />
          </div>
        </div>

        <CategoriesTable
          categories={categories}
          categoryParentOptions={category_parent_options}
        />
      </div>
    </>
  )
}

CategoriesIndex.layout = {
  breadcrumbs: [
    {
      title: 'Categorías',
      href: categoriesIndex(),
    },
  ],
}
