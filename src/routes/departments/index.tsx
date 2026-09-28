import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import type { Column } from '../../components/Table'
import Page from '../../components/Page'
import ListView from '../../components/ListView'
import DepartmentDrawer from '../../components/drawers/DepartmentDrawer'

export const Route = createFileRoute('/departments/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [page, setPage] = useState<number>(0)
  const [action, setAction] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState(null)

  const cols: Column[] = useMemo(() => [
    {
      key: "id",
      label: "Id"
    }, {
      key: "name",
      label: "Nome"
    }
  ], [open])

  return (
    <>
      <Page title="Deparment" subtitle="Department Management" action={
        {
          label: "Add Deparment", onClick: () => {
            setSelectedRow(null)
            setOpen(true)
          }
        }
      }>
        <ListView resource="/departments" setPage={setPage} action={action}
          page={page} columns={cols} />

      </Page >
      <DepartmentDrawer selectedRow={selectedRow} isOpen={open} setOpen={setOpen} setAction={setAction} />
    </>
  )
}
