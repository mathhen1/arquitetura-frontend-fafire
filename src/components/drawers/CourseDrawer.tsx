import { Button, CloseButton, Drawer, Field, FieldLabel, Input, Stack } from "@chakra-ui/react"
import type React from "react"
import { toaster } from "../Toaster"
import { useState } from "react"

type SelectedRow = {
    id: string,
    name: string,
    action: "edit" | "view"
} | null

type CourseDrawerProps = {
    selectedRow: SelectedRow,
    isOpen: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setAction: React.Dispatch<React.SetStateAction<number>>
}

const drawerTitles = {
    create: "Create Course",
    edit: "Edit Course",
    view: "View Course"
}

type FormData = {
    id: string,
    name: string
}

const CourseDrawer = ({ isOpen, selectedRow, setOpen, setAction }: CourseDrawerProps) => {

    const [formData, setFormData] = useState<FormData>(
        {
            id: selectedRow?.id ?? "",
            name: selectedRow?.name ?? ""
        }
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if (selectedRow) {
            setFormData((data) => ({
                ...data,
                [name]: value,
                id: selectedRow?.id,
                name: selectedRow?.name
            }))
        }

        setFormData((data) => ({
            ...data, [name]: value
        }))
    }

    const handleSubmit = async () => {
        const { id } = formData
        console.log(formData)
        const res = await fetch(`http://localhost:8080/courses${id ? ("/" + id) : ""}`, {
            method: id ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })

        if (!res.ok) {
            toaster.create({
                title: "Erro na requisição",
            })
            return
        }

        toaster.create({
            title: "Curso salvo!",
            description: "Requisição foi realizada com sucesso!"
        })

        setAction((data) => (
            data = data + 1
        ))
        setOpen(false)
    }

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
                            {(!selectedRow?.action) ? undefined : (
                                <Field.Root required>
                                    <FieldLabel>Id</FieldLabel>
                                    <Input readOnly defaultValue={selectedRow?.id}
                                    />
                                </Field.Root>
                            )}

                            <Field.Root required>
                                <FieldLabel>Nome</FieldLabel>
                                <Input readOnly={selectedRow?.action === "view"} placeholder="Digite a descrição" defaultValue={selectedRow?.name} onChange={handleChange} name="name" />
                            </Field.Root>
                        </Stack>
                    </Drawer.Body>

                    <Drawer.Footer>
                        <Button onClick={() => setOpen(false)}>
                            Cancel
                        </Button>

                        {selectedRow?.action !== "view" && (
                            <Button onClick={handleSubmit}>
                                Submit
                            </Button>
                        )}
                    </Drawer.Footer>

                </Drawer.Content>
            </Drawer.Positioner>
        </Drawer.Root>
    )
}

export default CourseDrawer