import { createToaster, Toaster as ChakraToaster, Alert } from "@chakra-ui/react"

export const toaster = createToaster({
    placement: "top-end"
})

const Toaster = () => {
    return (
        <ChakraToaster toaster={toaster}>
            {
                (toast) => (
                    <Alert.Root>
                        <Alert.Indicator />
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
                    </Alert.Root>
                )
            }

        </ChakraToaster >
    )
}

export default Toaster