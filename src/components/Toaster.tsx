import { createToaster, Toaster as ChakraToaster, Alert, CloseButton } from "@chakra-ui/react"

export const toaster = createToaster({
    placement: "top-start"
})

const Toaster = () => {
    return (
        <ChakraToaster toaster={toaster}>
            {
                (toast) => (
                    <Alert.Root>
                        <Alert.Indicator />
                        <Alert.Content>
                            {toast.title && (
                                <Alert.Title>
                                    {toast.title}
                                </Alert.Title>
                            )}
                            {toast.description && (
                                <Alert.Description>
                                    {toast.description}
                                </Alert.Description>
                            )}
                        </Alert.Content>
                        <CloseButton pos="relative" top="-2" insetEnd="-2"
                            onClick={() => toaster.dismiss()} />
                    </Alert.Root>
                )
            }

        </ChakraToaster >
    )
}

export default Toaster