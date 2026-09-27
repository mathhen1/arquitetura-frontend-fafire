
import { Table as ChakraTable } from '@chakra-ui/react'

export type Column = {
    key: string,
    label: string,
    render?: (item?: any, data?: any) => void
}

type TableProps = {
    columns: Column[],
    rows: any[]
}

const Table = ({ columns, rows }: TableProps) => {
    return (
        <ChakraTable.Root>
            <ChakraTable.Header>
                <ChakraTable.Row>
                    {columns.map(col => (
                        <ChakraTable.ColumnHeader >
                            {col.label}
                        </ChakraTable.ColumnHeader >
                    ))}
                </ChakraTable.Row>
            </ChakraTable.Header>

            <ChakraTable.Body>
                {rows.map(row => (
                    <ChakraTable.Row>
                        {columns.map(col => {
                            const value = row[col.key]
                            const renderValue = col.render ? col.render(value, row) : value
                            return (
                                <ChakraTable.Cell>
                                    {renderValue}
                                </ChakraTable.Cell>
                            )
                        })}
                    </ChakraTable.Row>
                ))}
            </ChakraTable.Body>
        </ChakraTable.Root>
    )
}

export default Table