import { Button, CloseButton, Drawer, Field, FieldLabel, Input, Stack } from "@chakra-ui/react"
import type React from "react"
import { toaster } from "../Toaster"
import { useState } from "react"

type SelectedRow = {
    id: string,
    startHour: string,
    endHour: string,
    dayOfWeek: string,
    professor: {
        id: string,
        name: string,
        cpf: string
        department: {
            id: string,
            name: string
        }
    },
    course: {
        id: string,
        name: string
    },
    action: "edit" | "view"
} | null

type AllocationDrawerProps = {
    selectedRow: SelectedRow,
    isOpen: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setAction: React.Dispatch<React.SetStateAction<number>>
}

const drawerTitles = {
    create: "Create Allocation",
    edit: "Edit Allocation",
    view: "View Allocation"
}

type FormData = {
    id: string,
    startHour: string,
    endHour: string,
    dayOfWeek: string,
    professorId: string,
    courseId: string,
}

const AllocationDrawer = ({ isOpen, selectedRow, setOpen, setAction }: AllocationDrawerProps) => {
    const [formData, setFormData] = useState<FormData>(
        {
            id: selectedRow?.id ?? "",
            dayOfWeek: selectedRow?.dayOfWeek ?? "",
            startHour: selectedRow?.startHour ?? "",
            endHour: selectedRow?.endHour ?? "",
            professorId: selectedRow?.professor.id ?? "",
            courseId: selectedRow?.course.id ?? ""
        }
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if (selectedRow?.action === "edit") {
            setFormData(() => ({
                id: selectedRow.id,
                dayOfWeek: selectedRow.dayOfWeek,
                startHour: selectedRow.startHour,
                endHour: selectedRow.endHour,
                professorId: selectedRow.professor.id,
                courseId: selectedRow.course.id
            }))
        }

        setFormData((data) => ({
            ...data, [name]: value
        }))
    }

    const handleSubmit = async () => {
        const { id } = formData
        console.log(formData)
        const res = await fetch(`http://localhost:8080/allocations${(!selectedRow?.action) ? "" : ("/" + id)}`, {
            method: (!selectedRow?.action) ? "POST" : "PUT",
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
            title: "Alocação salva!",
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
                                    <Input readOnly defaultValue={selectedRow?.id} name="id"
                                    />
                                </Field.Root>
                            )}

                            <Field.Root required>
                                <FieldLabel>Dia da Semana</FieldLabel>
                                <Input readOnly={selectedRow?.action === "view"} placeholder="Digite o dia da semana" defaultValue={selectedRow?.dayOfWeek} onChange={handleChange} name="dayOfWeek" />
                            </Field.Root>

                            <Field.Root required>
                                <FieldLabel>Hora Inicial</FieldLabel>
                                <Input readOnly={selectedRow?.action === "view"} placeholder="Digite a hora inicial" defaultValue={selectedRow?.startHour} onChange={handleChange} name="startHour" />
                            </Field.Root>

                            <Field.Root required>
                                <FieldLabel>Hora Final</FieldLabel>
                                <Input readOnly={selectedRow?.action === "view"} placeholder="Digite a hora final" defaultValue={selectedRow?.endHour} onChange={handleChange} name="endHour" />
                            </Field.Root>

                            <Field.Root required>
                                <FieldLabel>Professor Id</FieldLabel>
                                <Input readOnly={selectedRow?.action === "view"} placeholder="Digite o Id do Professor" defaultValue={selectedRow?.professor.id} onChange={handleChange} name="professorId" />
                            </Field.Root>

                            {selectedRow?.action === "view" && <Field.Root required>
                                <FieldLabel>Nome do Professor</FieldLabel>
                                <Input readOnly defaultValue={selectedRow?.professor.name} onChange={handleChange} name="professorName" />
                            </Field.Root>}

                            {selectedRow?.action === "view" && <Field.Root required>
                                <FieldLabel>CPF do Professor</FieldLabel>
                                <Input readOnly defaultValue={selectedRow?.professor.cpf} onChange={handleChange} name="professorCpf" />
                            </Field.Root>}

                            <Field.Root required>
                                <FieldLabel>Curso Id</FieldLabel>
                                <Input readOnly={selectedRow?.action === "view"} placeholder="Digite o Id do Curso" defaultValue={selectedRow?.course.id} onChange={handleChange} name="courseId" />
                            </Field.Root>

                            {selectedRow?.action === "view" && <Field.Root required>
                                <FieldLabel>Nome do Curso</FieldLabel>
                                <Input readOnly defaultValue={selectedRow?.course.name} onChange={handleChange} name="courseName" />
                            </Field.Root>}

                            {selectedRow?.action === "view" && <Field.Root required>
                                <FieldLabel>Departamento Id</FieldLabel>
                                <Input readOnly defaultValue={selectedRow?.professor.department.id} onChange={handleChange} name="departmentId" />
                            </Field.Root>}

                            {selectedRow?.action === "view" && <Field.Root required>
                                <FieldLabel>Nome do Departamento</FieldLabel>
                                <Input readOnly defaultValue={selectedRow?.professor.department.name} onChange={handleChange} name="departmentName" />
                            </Field.Root>}
                        </Stack>
                    </Drawer.Body>

                    <Drawer.Footer>
                        <Button onClick={() => {
                            setOpen(false)
                        }}>
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
        </Drawer.Root >
    )
}

export default AllocationDrawer