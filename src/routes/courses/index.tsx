import { createFileRoute } from '@tanstack/react-router'
import Page from '../../components/Page'
import CourseDrawer from '../../components/drawers/CourseDrawer'
import ListView from '../../components/ListView'
import { useMemo, useState } from 'react'
import type { Column } from '../../components/Table'

export const Route = createFileRoute('/courses/')({
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
            key: "name",
            label: "Nome"
        }
    ], [open])

    return (
        <>
            <Page title="Course" subtitle="Course Management" action={
                { label: "Add Course" }
            }>
                <ListView resource="/courses" setPage={setPage} action={action}
                    page={page} columns={cols} />

            </Page >
            <CourseDrawer />
        </>
    )
}
