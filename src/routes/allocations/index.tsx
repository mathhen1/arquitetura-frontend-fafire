import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import type { Column } from '../../components/Table'
import Page from '../../components/Page'
import AllocationDrawer from '../../components/drawers/AllocationDrawer'
import ListView from '../../components/ListView'
import { Box, IconButton } from '@chakra-ui/react'
import { Eye, Pencil, Trash } from 'lucide-react'

export const Route = createFileRoute('/allocations/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [page, setPage] = useState<number>(0)
    const [action, setAction] = useState<number>(0)
    const [open, setOpen] = useState<boolean>(false)
    const [selectedRow, setSelectedRow] = useState(null)

    const handleDelete = (row: any) => {
        if (!confirm(`Tem certeza que deseja apagar a alocação ${row.id}?`)) {
            return
        }
        fetch(`http://localhost:8080/allocations/${row.id}`, {
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
            key: "dayOfWeek",
            label: "Dia"
        }, {
            key: "startHour",
            label: "Horario Inicial"
        }, {
            key: "endHour",
            label: "Horario Final"
        }, {
            key: "professor",
            label: "Professor",
            render: (professor) => <p>{professor.name}</p>
        }, {
            key: "course",
            label: "Curso",
            render: (course) => <p>{course.name}</p>
        }, {
            key: "professor",
            label: "Departamento",
            render: (professor) => <p>{professor.department.name}</p>
        }, {
            key: "actions",
            label: "Actions",
            render: (_, row) => (
                (
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
            )
        }
    ], [open])

    return (
        <>
            <Page title="Allocation" subtitle="Allocation Management" action={
                {
                    label: "Add Allocation", onClick: () => {
                        setOpen(true)
                        setSelectedRow(null)
                    }
                }
            }>
                <ListView resource="/allocations" setPage={setPage} action={action}
                    page={page} columns={cols} />

            </Page >
            <AllocationDrawer selectedRow={selectedRow} setAction={setAction}
                isOpen={open} setOpen={setOpen} />
        </>
    )
}
