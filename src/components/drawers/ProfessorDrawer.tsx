import { Button, CloseButton, Drawer, Field, FieldLabel, Input, Stack } from "@chakra-ui/react"
import type React from "react"
import { useEffect, useState } from "react"
import { toaster } from "../Toaster"

type SelectedRow = {
    id: string,
    name: string,
    cpf: string,
    department: {
        id: string,
        name: string
    }
    action: "edit" | "view"
} | null

type ProfessorDrawerProps = {
    isOpen: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selectedRow?: SelectedRow
}

type FormData = {
    id?: string,
    name: string,
    cpf: string,
    departmentId?: string
}

const drawerTitles = {
    create: "Create Professor",
    edit: "Edit Professor",
    view: "View Professor"
}

const ProfessorDrawer = ({ isOpen, setOpen, selectedRow }: ProfessorDrawerProps) => {

    const [formData, setFormData] = useState<FormData>(
        {
            id: selectedRow?.id ?? "",
            name: selectedRow?.name ?? "",
            cpf: selectedRow?.cpf ?? "",
            departmentId: selectedRow?.department.id ?? ""
        }
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if (selectedRow) {
            setFormData((data) => ({
                ...data,
                [name]: value,
                id: selectedRow?.id,
                departmentId: selectedRow?.department.id,
                name: selectedRow?.name,
                cpf: selectedRow?.cpf
            }))
        }

        setFormData((data) => ({
            ...data, [name]: value
        }))
    }

    const handleSubmit = async () => {
        const { id } = formData
        console.log(formData)
        const res = await fetch(`http://localhost:8080/professors${id ? ("/" + id) : ""}`, {
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
            title: "Professor salvo!",
            description: "Requisição foi realizada com sucesso!"
        })

        setOpen(false)
        window.location.reload
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

                            <Field.Root required>
                                <FieldLabel>CPF</FieldLabel>
                                <Input readOnly={selectedRow?.action === "view"} placeholder="Digite a descrição" defaultValue={selectedRow?.cpf} onChange={handleChange} name="cpf" />
                            </Field.Root>

                            <Field.Root required>
                                <FieldLabel>Departamento ID</FieldLabel>
                                <Input readOnly={selectedRow?.action === "view"} placeholder="Digite o Id do departamento" defaultValue={selectedRow?.department.id} onChange={handleChange} name="departmentId" />
                            </Field.Root>

                            {(!selectedRow?.action) ? undefined : (
                                <Field.Root required>
                                    <FieldLabel>Nome Departamento</FieldLabel>
                                    <Input readOnly defaultValue={selectedRow?.department.name}
                                    />
                                </Field.Root>
                            )}
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

export default ProfessorDrawer