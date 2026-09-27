import { useEffect, useState } from "react"
import type { Column } from "./Table"
import Table from "./Table"
import type { Professor } from "../routes/professors"
import { Center, Icon, Spinner, Text, VStack, HStack, IconButton } from "@chakra-ui/react"
import { Inbox, ArrowLeft, ArrowRight } from "lucide-react"

type ListViewProps = {
    columns: Column[],
    resource: string,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const ListView = (props: ListViewProps) => {

    const [rows, setRows] = useState<Professor[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const NavigationPages = () => {

        return (
            <HStack >
                <Text>
                    Navegue entre as páginas
                </Text>

                <IconButton disabled={props.page === 0} onClick={() => {
                    props.setPage((data) => (
                        data = data - 1
                    ))
                }}>
                    <ArrowLeft />
                </IconButton>

                <IconButton disabled={!rows.length} onClick={() => {
                    props.setPage((data) => (
                        data = data + 1
                    ))
                }}>
                    <ArrowRight />
                </IconButton>
            </HStack>
        )
    }

    useEffect(() => {

        setLoading(true)

        fetch(`http://localhost:8080${props.resource}?page=${props.page}`, { method: "GET" })
            .then(res => res.json())
            .then(data => setRows(data))
            .finally(() => setLoading(false))
    }, [props.page])

    if (loading) {
        return (
            <Center>
                <Spinner size={"lg"} color={"blue.500"} />
            </Center>
        )
    }

    if (!rows.length) {
        return (
            <>
                <NavigationPages />
                <Center>
                    <VStack>
                        <Icon as={Inbox} />
                        <Text>
                            {"No results found"}
                        </Text>
                    </VStack>
                </Center>
            </>
        )
    }

    return (
        <>
            <NavigationPages />
            <Table columns={props.columns} rows={rows} />
        </>
    )
}
export default ListView