import { Badge } from '@/components/admin/ui/badge'
import { Card, CardContent } from '@/components/admin/ui/card'
import CategoryRowActions from '@/pages/admin/categories/components/category-row-actions'
import { subcategories } from '@/routes/admin/categories'
import type { SelectOption } from '@/types'
import type { Category } from '@/types/entities'
import { Link } from '@inertiajs/react'

interface CategoriesTableProps {
  categories: Category[]
  categoryParentOptions: SelectOption[]
}

function formatStatus(isActive: boolean): { label: string; variant: 'default' | 'secondary' } {
  return isActive ? { label: 'Activa', variant: 'default' } : { label: 'Inactiva', variant: 'secondary' }
}

export default function CategoriesTable({ categories, categoryParentOptions }: CategoriesTableProps) {
  return (
    <Card className="gap-0 border-sidebar-border/70 p-0 shadow-none dark:border-sidebar-border">
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed divide-y divide-border text-sm">
            <colgroup>
              <col className="w-[9ch]" />
              <col className="min-w-60" />
              <col className="w-32" />
              <col className="w-44" />
              <col className="w-40" />
            </colgroup>
            <thead className="bg-muted/40 text-muted-foreground">
              <tr>
                <th className="px-6 py-3.5 text-left font-medium">Código</th>
                <th className="px-6 py-3.5 text-left font-medium">Nombre</th>
                <th className="px-6 py-3.5 text-center font-medium">Estado</th>
                <th className="px-6 py-3.5 text-center font-medium">Subcategorías</th>
                <th className="px-6 py-3.5 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background">
              {categories.length === 0 ? (
                <tr>
                  <td
                    className="px-6 py-10 text-center text-muted-foreground"
                    colSpan={6}
                  >
                    No hay categorías registradas.
                  </td>
                </tr>
              ) : (
                categories.map((category) => {
                  const status = formatStatus(category.is_active)

                  return (
                    <tr
                      key={category.id}
                      className="align-middle transition-colors hover:bg-muted/30"
                    >
                      <td className="px-6 py-4 font-mono whitespace-nowrap text-foreground">{category.code}</td>
                      <td className="px-6 py-4 font-medium text-foreground">{category.name}</td>
                      <td className="px-6 py-4 text-center">
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm whitespace-nowrap text-foreground">
                          {category.children_count} subcategoría{category.children_count === 1 ? '' : 's'}{' '}
                          <span>
                            (
                            <Link
                              href={subcategories({ category: category.id })}
                              className="font-medium text-primary transition-colors hover:text-primary/80 hover:underline dark:text-white dark:hover:text-white/80"
                              aria-label={`Ver subcategorías de ${category.name}`}
                              prefetch
                            >
                              Ver más
                            </Link>
                            )
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <CategoryRowActions
                          category={category}
                          parentCategoryOptions={categoryParentOptions}
                        />
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
