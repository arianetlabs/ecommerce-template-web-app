import { Badge } from '@/components/admin/ui/badge'
import { Card, CardContent } from '@/components/admin/ui/card'
import BrandRowActions from '@/pages/admin/brands/components/brand-row-actions'
import type { Brand } from '@/types/entities'

interface BrandsTableProps {
  brands: Brand[]
}

function formatStatus(isActive: boolean): { label: string; variant: 'default' | 'secondary' } {
  return isActive ? { label: 'Activa', variant: 'default' } : { label: 'Inactiva', variant: 'secondary' }
}

export default function BrandsTable({ brands }: BrandsTableProps) {
  return (
    <Card className="gap-0 border-sidebar-border/70 p-0 shadow-none dark:border-sidebar-border">
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto divide-y divide-border text-sm">
            <colgroup>
              <col className="w-30" />
              <col className="w-[9ch]" />
              <col className="min-w-60" />
              <col className="w-32" />
              <col className="w-38" />
            </colgroup>
            <thead className="bg-muted/40 text-muted-foreground">
              <tr>
                <th className="w-30 min-w-30 px-6 py-3.5 text-center font-medium">Logo</th>
                <th className="px-6 py-3.5 text-left font-medium">Código</th>
                <th className="px-6 py-3.5 text-left font-medium">Nombre</th>
                <th className="px-6 py-3.5 text-center font-medium">Estado</th>
                <th className="px-6 py-3.5 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background">
              {brands.length === 0 ? (
                <tr>
                  <td
                    className="px-6 py-10 text-center text-muted-foreground"
                    colSpan={6}
                  >
                    No hay marcas registradas.
                  </td>
                </tr>
              ) : (
                brands.map((brand) => {
                  const status = formatStatus(brand.is_active)

                  return (
                    <tr
                      key={brand.id}
                      className="align-middle transition-colors hover:bg-muted/30"
                    >
                      <td className="w-30 min-w-30 px-6 py-4">
                        {brand.logo_url === null ? (
                          <div className="flex h-11 w-20 items-center justify-center rounded-md border border-dashed border-border/70 bg-muted/30 text-[11px] text-muted-foreground">
                            Sin logo
                          </div>
                        ) : (
                          <img
                            alt={brand.name}
                            className="h-12 w-18 max-w-none object-contain p-0.5"
                            src={brand.logo_url}
                          />
                        )}
                      </td>
                      <td className="px-6 py-4 font-mono whitespace-nowrap text-foreground">{brand.code}</td>
                      <td className="px-6 py-4 font-medium text-foreground">{brand.name}</td>
                      <td className="px-6 py-4 text-center">
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <BrandRowActions brand={brand} />
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
