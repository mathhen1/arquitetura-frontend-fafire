import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import Page from '../../components/Page'
import ListView from '../../components/ListView'
import type { Column } from '../../components/Table'
import { Box, IconButton } from '@chakra-ui/react'
import { Eye, Pencil, Trash } from 'lucide-react'
import ProfessorDrawer from '../../components/drawers/ProfessorDrawer'

export const Route = createFileRoute('/professors/')({
    component: RouteComponent,
})

export type Professor = {
    id: number,
    name: string,
    desc: string
}

function RouteComponent() {

    const [open, setOpen] = useState<boolean>(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [page, setPage] = useState<number>(0)

    const handleDelete = (row: any) => {
        console.log("Handle Delete console: ", row.id)
        if (!confirm(`Tem certeza que deseja apagar o professor "${row.name}"?`)) {
            return
        }
        fetch(`http://localhost:8080/professors/${row.id}`, {
            method: "DELETE"
        })
    }

    const cols: Column[] = useMemo(() => [
        {
            key: "id",
            label: "Id"
        }, {
            key: "name",
            label: "Nome"
        }, {
            key: "cpf",
            label: "CPF"
        }, {
            key: "department",
            label: "Departamento ID",
            render: (department) => <p>{department.id}</p>
        }, {
            key: "department",
            label: "Departamento",
            render: (department) => <p>{department.name}</p>
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
                        // setSelectedRow({ ...row, action: "delete" })
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
            <Page subtitle="Manage Professors from Fafire" title="Professors"
                action={{
                    onClick: () => {
                        setSelectedRow(null)
                        setOpen(true)
                    }, label: "Add Professor"
                }}>
                <ListView columns={cols} resource="/professors" page={page} setPage={setPage} />
            </Page>

            <ProfessorDrawer isOpen={open} setOpen={setOpen} selectedRow={selectedRow} />
        </>
    )
}
