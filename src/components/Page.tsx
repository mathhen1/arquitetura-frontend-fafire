import { Box, Button, Container, Heading, Text } from "@chakra-ui/react"
import type { ReactNode } from "react"

type PageProps = {
    children: ReactNode,
    title: string,
    subtitle: string,
    action?: {
        label: string,
        onClick?: () => void
    }
}
const Page = (props: PageProps) => {
    return (
        <Container>
            <Box>
                <div>
                    <Heading>
                        {props.title}
                    </Heading>
                    {props.subtitle && <Text>{props.subtitle}</Text>}
                </div>

                {props.action && (
                    <Button onClick={props.action.onClick}>
                        {props.action.label}
                    </Button>
                )}
            </Box>

            <Box>
                {props.children}
            </Box>
        </Container>
    )
}

export default Page