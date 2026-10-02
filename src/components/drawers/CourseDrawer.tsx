import { Button, CloseButton, Drawer, Field, FieldLabel, Input, Stack } from "@chakra-ui/react"
import type React from "react"
import { toaster } from "../Toaster"
import { useState } from "react"
import { z } from "zod"

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

const validateFields = z.object({
    name: z.string().min(1, { message: "Este campo não pode ser vazio" })
        .regex(/^([^0-9]*)$/, { message: "Este campo deve conter apenas letras" })
})

const CourseDrawer = ({ isOpen, selectedRow, setOpen, setAction }: CourseDrawerProps) => {

    const [formData, setFormData] = useState<FormData>(
        {
            id: selectedRow?.id ?? "",
            name: selectedRow?.name ?? ""
        }
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if (selectedRow?.action === "edit") {
            setFormData(() => ({
                id: selectedRow?.id,
                name: selectedRow?.name
            }))
        }

        setFormData((data) => ({
            ...data, [name]: value
        }))
    }
    const [errors, setErrors] = useState<string>("")
    const [hasError, setHasError] = useState<boolean>(false)
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false)

    const handleSubmit = async () => {

        const validatedFields = validateFields.safeParse(formData)

        if (!validatedFields.success) {
            const erro = validatedFields.error.flatten().fieldErrors
            setErrors(erro.name?.[0] ?? "")
            setHasError(true)
            setTimeout(() => {
                setHasError(false)
            }, 3000)
            return
        }

        setHasError(false)
        setIsSubmiting(true)

        const { id } = formData
        const res = await fetch(`http://localhost:8080/courses${(!selectedRow) ? "" : ("/" + id)}`, {
            method: (!selectedRow) ? "POST" : "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })

        if (!res.ok) {
            toaster.create({
                title: "Erro na requisição",
            })
            setIsSubmiting(false)
            return
        }

        setIsSubmiting(false)
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

                            <Field.Root required invalid={hasError}>
                                <FieldLabel>Nome</FieldLabel>
                                <Input readOnly={selectedRow?.action === "view"} placeholder="Digite o nome do Curso" defaultValue={selectedRow?.name} onChange={handleChange} name="name" />
                                <Field.ErrorText>{errors}</Field.ErrorText>
                            </Field.Root>
                        </Stack>
                    </Drawer.Body>

                    <Drawer.Footer>
                        <Button onClick={() => setOpen(false)}>
                            Cancel
                        </Button>

                        {selectedRow?.action !== "view" && (
                            <Button onClick={handleSubmit}
                                loading={isSubmiting} disabled={isSubmiting}>
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