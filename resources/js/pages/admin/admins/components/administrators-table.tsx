import { Avatar, AvatarFallback } from '@/components/admin/ui/avatar'
import { Badge } from '@/components/admin/ui/badge'
import { Card, CardContent } from '@/components/admin/ui/card'
import { useInitials } from '@/hooks/admin/use-initials'
import { dateFormatter } from '@/lib/admin/date'
import AdminRowActions from '@/pages/admin/admins/components/admin-row-actions'
import type { Administrator } from '@/types/entities'

interface AdministratorsTableProps {
  admins: Administrator[]
}

function formatDate(value: string | null): string {
  if (!value) {
    return '—'
  }

  return dateFormatter.format(new Date(value))
}

function formatFullName(administrator: Administrator): string {
  return `${administrator.name} ${administrator.last_name}`.trim()
}

function formatPhone(phone: string): string {
  return phone
}

export default function AdministratorsTable({ admins }: AdministratorsTableProps) {
  const getInitials = useInitials()

  return (
    <Card className="gap-0 border-sidebar-border/70 p-0 shadow-none dark:border-sidebar-border">
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed divide-y divide-border text-sm">
            <colgroup>
              <col />
              <col />
              <col className="w-35" />
              <col className="w-40" />
              <col className="w-35" />
              <col className="w-15" />
            </colgroup>
            <thead className="bg-muted/40 text-muted-foreground">
              <tr>
                <th className="px-6 py-3.5 text-left font-medium">Administrador</th>
                <th className="px-6 py-3.5 text-left font-medium">Correo electrónico</th>
                <th className="px-6 py-3.5 text-center font-medium">Celular</th>
                <th className="px-6 py-3.5 text-center font-medium">Rol</th>
                <th className="px-6 py-3.5 text-center font-medium">Registro</th>
                <th className="px-6 py-3.5 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background">
              {admins.length === 0 ? (
                <tr>
                  <td
                    className="px-6 py-10 text-center text-muted-foreground"
                    colSpan={6}
                  >
                    No hay usuarios administradores registrados.
                  </td>
                </tr>
              ) : (
                admins.map((administrator) => (
                  <tr
                    key={administrator.id}
                    className="align-middle transition-colors hover:bg-muted/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{getInitials(administrator.name, administrator.last_name)}</AvatarFallback>
                        </Avatar>
                        <p className="font-medium text-nowrap text-foreground">{formatFullName(administrator)}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-foreground">{administrator.email}</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{formatPhone(administrator.phone)}</td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant="outline">{administrator.role.label}</Badge>
                    </td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{formatDate(administrator.created_at)}</td>
                    <td className="px-6 py-4 text-right">
                      <AdminRowActions administrator={administrator} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
