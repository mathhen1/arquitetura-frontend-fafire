import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { professorsMock } from '../../lib/mockdb'
import { Box, IconButton, Table } from '@chakra-ui/react'
import { Eye, Pencil, Trash } from "lucide-react"
import Page from '../../components/Page'

export const Route = createFileRoute('/professors/')({
    component: RouteComponent,
})

type Professor = {
    id: number,
    name: string,
    desc: string
}

function RouteComponent() {

    const [professors, setProfessors] = useState<Professor[]>([])

    useEffect(() => {
        setProfessors(professorsMock)
    }, [])

    return (
        <Page subtitle="Manage Professors from Fafire" title="Professors" 
        action={{onClick: () => {
            alert("Bora")
        }, label: "Add Professor"}}>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader >
                            Id
                        </Table.ColumnHeader >
                        <Table.ColumnHeader >
                            Nome
                        </Table.ColumnHeader >
                        <Table.ColumnHeader >
                            Descrição
                        </Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {professors.map(p => (
                        <Table.Row>
                            <Table.Cell>
                                {p.id}
                            </Table.Cell>
                            <Table.Cell>
                                {p.name}
                            </Table.Cell>
                            <Table.Cell>
                                {p.desc}
                            </Table.Cell>
                            <Box>
                                <Table.Cell>
                                    <IconButton colorPalette="blue" aria-label="View Professor">
                                        <Eye />
                                    </IconButton>
                                </Table.Cell>
                                <Table.Cell>
                                    <IconButton colorPalette="gray" aria-label="Edit Professor">
                                        <Pencil />
                                    </IconButton>
                                </Table.Cell>
                                <Table.Cell>
                                    <IconButton colorPalette="red" aria-label="Delete Professor">
                                        <Trash />
                                    </IconButton>
                                </Table.Cell>
                            </Box>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Page>
    )
}
