import Heading from '@/components/admin/heading'
import AdministratorsTable from '@/pages/admin/admins/components/administrators-table'
import CreateAdminModal from '@/pages/admin/admins/components/create-admin-modal'
import CreatedAdministratorCredentialsModal from '@/pages/admin/admins/components/created-administrator-credentials-modal'
import { index as adminsIndex } from '@/routes/admin/admins'
import type { CreatedAdministratorCredentials } from '@/types/admin'
import type { Administrator } from '@/types/entities'
import { UserMultiple02Icon } from '@hugeicons/core-free-icons'
import { Head } from '@inertiajs/react'

interface AdminsIndexProps {
  admins: Administrator[]
  created_administrator_credentials: CreatedAdministratorCredentials | null
}

export default function AdminsIndex({ admins, created_administrator_credentials }: AdminsIndexProps) {
  const createdCredentialsModalKey =
    created_administrator_credentials === null
      ? 'created-administrator-credentials-empty'
      : `${created_administrator_credentials.email}-${created_administrator_credentials.password}`

  return (
    <>
      <Head title="Administradores" />

      <div className="flex flex-col gap-8 p-4 lg:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <Heading
            title="Administradores"
            description="Gestiona las identidades con acceso al panel administrativo y revisa su información principal en un solo lugar."
            badgeIcon={UserMultiple02Icon}
            badgeLabel="Administración"
          />

          <div className="flex w-full flex-wrap items-center justify-start gap-3 md:w-auto md:justify-end">
            <CreateAdminModal triggerClassName="w-full md:w-auto" />
          </div>
        </div>

        <AdministratorsTable admins={admins} />
      </div>
      <CreatedAdministratorCredentialsModal
        key={createdCredentialsModalKey}
        createdAdministratorCredentials={created_administrator_credentials}
      />
    </>
  )
}

AdminsIndex.layout = {
  breadcrumbs: [
    {
      title: 'Administradores',
      href: adminsIndex(),
    },
  ],
}
