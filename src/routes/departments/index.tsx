import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import type { Column } from '../../components/Table'
import Page from '../../components/Page'
import ListView from '../../components/ListView'
import DepartmentDrawer from '../../components/drawers/DepartmentDrawer'
import { Box, IconButton } from '@chakra-ui/react'
import { Eye, Pencil, Trash } from 'lucide-react'

export const Route = createFileRoute('/departments/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [page, setPage] = useState<number>(0)
  const [action, setAction] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState(null)

  const handleDelete = (row: any) => {
    console.log("Handle Delete console: ", row.id)
    if (!confirm(`Tem certeza que deseja apagar o departamento "${row.name}"?`)) {
      return
    }
    fetch(`http://localhost:8080/departments/${row.id}`, {
      method: "DELETE"
    }).then(() => setAction((data) => (
      data = data + 1
    )))
  }

  const cols: Column[] = useMemo(() => [
    {
      key: "id",
      label: "Id"
    }, {
      key: "name",
      label: "Nome"
    }, {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <Box>
          <IconButton colorPalette={"blue"} mr={3} onClick={() => {
            setSelectedRow({ ...row, action: "view" })
            setOpen(true)
          }}>
            <Eye />
          </IconButton>

          <IconButton colorPalette={"gray"} mr={3} onClick={() => {
            setSelectedRow({ ...row, action: "edit" })
            setOpen(true)
          }}>
            <Pencil />
          </IconButton>

          <IconButton colorPalette={"red"} mr={3} onClick={() => {
            handleDelete(row)
          }}>
            <Trash />
          </IconButton>
        </Box>
      )
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
