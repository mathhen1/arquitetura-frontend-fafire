import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    HStack,
    Link,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";

import type { ReactNode } from "react";

import {
    Link as RouterLink, createRootRoute, Outlet
} from '@tanstack/react-router'

const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "Allocations", to: "/allocations" },
    { label: "Courses", to: "/courses" },
    { label: "Departments", to: "/departments" },
    { label: "Professors", to: "/professors" },
] as const;

const Header = () => {
    return (
        <>
            <Box
                as="header"
                position="sticky"
                top="0"
                zIndex="sticky"
                borderBottomWidth="1px"
                backgroundColor={"white"}
            >
                <Container maxW="7xl">
                    <Flex align={"center"} justify={"space-between"} h={16} gap={"4"}>

                        <Link
                            as={RouterLink}
                            href="/"
                            _hover={{ textDecoration: "none" }}
                            display="flex"
                            alignItems="center"
                            gap="2"
                        >
                            <Flex
                                boxSize="8"
                                align="center"
                                justify="center"
                                rounded="md"
                                bg="teal.500"
                                color="white"
                                fontWeight="bold"
                            >
                                F
                            </Flex>
                            <Heading size="md" letterSpacing="tight">
                                Fafire Allocation
                            </Heading>
                        </Link>
                        <HStack
                            as="nav"
                            display={{ base: "none", md: "flex" }}
                        >
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.to}
                                    as={RouterLink}
                                    href={link.to}
                                    fontSize="sm"
                                    fontWeight="medium"
                                    _hover={{ color: "teal.500", textDecoration: "none" }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </HStack>
                    </Flex>
                </Container>
            </Box>
        </>
    )
}

const Footer = () => {
    return (
        <Box>
            <Container maxW="7xl" display={"flex"} flexDirection={"column"}>
                <SimpleGrid columns={{ base: 1, md: 3 }} columnWidth={"max-content"} alignSelf={"center"}>
                    <FooterColumn title="Fafire Allocation">
                        <Text fontSize="sm">
                            Realizando a conexão com o Backend desenvolvido na disciplina de Arquitetura Backend, construi um CRUD utilizando conceitos praticos de Frontend com React, TanstackRouter, ChakraUI e Vite.
                        </Text>
                    </FooterColumn>

                    <FooterColumn title="Navegação">
                        {NAV_LINKS.map((link) => (
                            <FooterLink key={link.to} to={link.to}>
                                {link.label}
                            </FooterLink>
                        ))}
                    </FooterColumn>

                    <FooterColumn title="Contato">
                        <Text fontSize="sm">
                            contato@fafire.dev
                        </Text>
                        <Text fontSize="sm">
                            Recife, PE
                        </Text>
                    </FooterColumn>
                </SimpleGrid>
            </Container>
        </Box >
    )
}

const FooterColumn = ({ title, children }: { title: string, children: ReactNode }) => {
    return (
        <>
            <Stack align="flex-start" justifySelf={"center"}>
                <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    letterSpacing="wide"
                >
                    {title}
                </Text>
                {children}
            </Stack>
        </>
    )
}

const FooterLink = ({ to, children }: { to: string, children: ReactNode }) => {
    return (
        <Link as={RouterLink} href={to} fontSize="sm" color="gray.500" _hover={{ color: "teal.500", textDecoration: "none" }}>
            {children}
        </Link>
    )
}

const NotFoundComponent = () => {

    return (
        <Stack align="flex-start" py="10">
            <Heading>
                Página não encontrada
            </Heading>
            <Text>
                O endereço acessado não existe ou foi removido.
            </Text>
            <Button as={RouterLink} colorScheme={"teal"}>
                Voltar ao inicio
            </Button>
        </Stack>
    )
}

const RootComponent = () => {
    return <Flex direction={"column"}>
        <Box>
            <Header />
            <Container minH={"100vh"}>
                <Outlet />
            </Container>
            <Footer />
        </Box>
    </Flex>
}


export const Route = createRootRoute({
    component: RootComponent,
    notFoundComponent: NotFoundComponent
})