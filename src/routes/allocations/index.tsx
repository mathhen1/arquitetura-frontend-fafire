import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import type { Column } from '../../components/Table'
import Page from '../../components/Page'
import AllocationDrawer from '../../components/drawers/AllocationDrawer'
import ListView from '../../components/ListView'

export const Route = createFileRoute('/allocations/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [page, setPage] = useState<number>(0)
    const [action, setAction] = useState<number>(0)
    const [open, setOpen] = useState<boolean>(false)

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
        }
    ], [open])

    return (
        <>
            <Page title="Allocation" subtitle="Allocation Management" action={
                { label: "Add Allocation" }
            }>
                <ListView resource="/allocations" setPage={setPage} action={action}
                    page={page} columns={cols} />

            </Page >
            <AllocationDrawer />
        </>
    )
}
