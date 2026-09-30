import { Button, CloseButton, Drawer, Field, FieldLabel, Input, Stack } from "@chakra-ui/react"
import type React from "react"
import { useState } from "react"
import { toaster } from "../Toaster"
import { z } from "zod"

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
    selectedRow?: SelectedRow,
    setAction: React.Dispatch<React.SetStateAction<number>>
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

const validateData = z.object({
    name: z.string().min(1, { message: "O campo não pode ser vazio" })
        .min(10, { message: "O campo Nome precisa ter ao menos 10 caracteres" })
        .regex(/^([^0-9]*)$/, { message: "O campo Nome deve conter apenas letras" })
    ,
    cpf: z.string().min(1, { message: "O campo não pode ser vazio" })
        .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, { message: "Digite o CPF corretamente" })
    ,
    departmentId: z.string().min(1, { message: "O campo não pode ser vazio" })
        .regex(/^\d+$/, { message: "O campo Id deve conter apenas numeros" })

})

const ProfessorDrawer = ({ isOpen, setOpen, selectedRow, setAction }: ProfessorDrawerProps) => {

    const [formData, setFormData] = useState<FormData>(
        {
            id: selectedRow?.id ?? "",
            name: selectedRow?.name ?? "",
            cpf: selectedRow?.cpf ?? "",
            departmentId: selectedRow?.department.id ?? ""
        }
    )
    const [errors, setErrors] = useState<any>([{}])
    const [hasError, setHasError] = useState<boolean>(false)

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

        const validatedData = validateData.safeParse(formData)

        if (!validatedData.success) {
            const errs = validatedData.error.flatten().fieldErrors
            setErrors(errs ?? [{}])
            setHasError(true)
            setTimeout(() => {
                setHasError(false)
            }, 3000);
            return
        }

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

                            <Field.Root required invalid={hasError && errors?.name}>
                                <FieldLabel>Nome</FieldLabel>
                                <Input readOnly={selectedRow?.action === "view"} placeholder="Digite o nome do Professor" defaultValue={selectedRow?.name} onChange={handleChange} name="name" />
                                <Field.ErrorText>{errors?.name?.[0]}</Field.ErrorText>
                            </Field.Root>

                            <Field.Root required invalid={hasError && errors?.cpf}>
                                <FieldLabel>CPF</FieldLabel>
                                <Input readOnly={selectedRow?.action === "view"} placeholder="Digite o CPF" defaultValue={selectedRow?.cpf} onChange={handleChange} name="cpf" />
                                <Field.ErrorText>{errors?.cpf?.[0]}</Field.ErrorText>
                            </Field.Root>

                            <Field.Root required invalid={hasError && errors?.departmentId}>
                                <FieldLabel>Departamento ID</FieldLabel>
                                <Input readOnly={selectedRow?.action === "view"} placeholder="Digite o Id do Departamento" defaultValue={selectedRow?.department.id} onChange={handleChange} name="departmentId" />
                                <Field.ErrorText>{errors?.departmentId?.[0]}</Field.ErrorText>
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