import { useEffect, useState } from "react"
import type { Column } from "./Table"
import Table from "./Table"
import { professorsMock } from "../lib/mockdb"
import type { Professor } from "../routes/professors"
import { Center, Icon, Spinner, Text, VStack } from "@chakra-ui/react"
import { Inbox } from "lucide-react"

type ListViewProps = {
    columns: Column[],
    resource: string
}

const ListView = (props: ListViewProps) => {

    const [rows, setRows] = useState<Professor[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {

        setLoading(true)

        fetch(`http://localhost:8080${props.resource}`, { method: "GET" })
            .then(data => data.json())
            .then(data => setRows(data))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <Center>
                <Spinner size={"lg"} color={"blue.500"} />
            </Center>
        )
    }

    if (!rows.length) {
        return (
            <Center>
                <VStack>
                    <Icon as={Inbox} />
                    <Text>
                        {"No results found"}
                    </Text>
                </VStack>
            </Center>
        )
    }

    return (
        <Table columns={props.columns} rows={rows} />
    )
}
export default ListView