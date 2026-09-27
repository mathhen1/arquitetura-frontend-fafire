import { Button, CloseButton, Drawer, Field, FieldLabel, Input, Stack, Textarea } from "@chakra-ui/react"
import { professorsMock } from "../../lib/mockdb"
import { X } from "lucide-react"
import type React from "react"

type SelectedRow = {
    id: number,
    name: string,
    desc: string,
    action: "edit" | "view"
} | null

type ProfessorDrawerProps = {
    isOpen: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selectedRow?: SelectedRow
}

const drawerTitles = {
    create: "Create Professor",
    edit: "Edit Professor",
    view: "View Professor"
}

const ProfessorDrawer = ({ isOpen, setOpen, selectedRow }: ProfessorDrawerProps) => {

    return (
        <Drawer.Root open={isOpen} onOpenChange={e => setOpen(e.open)}>
            <Drawer.Positioner>
                <Drawer.Content>
                    <Drawer.CloseTrigger>
                        <CloseButton />
                    </Drawer.CloseTrigger>

                    <Drawer.Header>
                        <Drawer.Title>
                            {drawerTitles[selectedRow?.action ?? "create"]}
                        </Drawer.Title>
                    </Drawer.Header>

                    <Drawer.Body>
                        <Stack>
                            {selectedRow?.action === "view" && (
                                <Field.Root required>
                                    <FieldLabel>Id</FieldLabel>
                                    <Input readOnly defaultValue={selectedRow?.id} />
                                </Field.Root>
                            )}

                            <Field.Root required>
                                <FieldLabel>Nome</FieldLabel>
                                <Input readOnly={selectedRow?.action === "view"} placeholder="Digite a descrição" defaultValue={selectedRow?.name} />
                            </Field.Root>

                            <Field.Root required>
                                <FieldLabel>Descrição</FieldLabel>
                                <Textarea readOnly={selectedRow?.action === "view"} placeholder="Digite a descrição" defaultValue={selectedRow?.name} />
                            </Field.Root>
                        </Stack>
                    </Drawer.Body>

                    <Drawer.Footer>
                        <Button onClick={() => setOpen(false)}>
                            Cancel
                        </Button>

                        {selectedRow?.action !== "view" && (
                            <Button>
                                Submit
                            </Button>
                        )}
                    </Drawer.Footer>

                </Drawer.Content>
            </Drawer.Positioner>
        </Drawer.Root>
    )
}

export default ProfessorDrawer