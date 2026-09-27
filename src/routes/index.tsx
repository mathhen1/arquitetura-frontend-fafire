import { Center, Container, Span, Text } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Center>

        <Container minH={"80vh"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>

          <Text color="gray.800" fontWeight="bold" letterSpacing={"wide"} fontSize={"4xl"}>
            {"Bem vindo a HomePage!"}
          </Text>

          <Text color="black" fontWeight="light" fontSize={"xl"}>
            {"Esse projeto foi desenvolvido utilizando "}<Span fontWeight="medium" color={"green.600"}>{"React, Tanstack Router, ChakraUI e Vite!"}</Span>
          </Text>

          <Text fontSize={"lg"}>
            {"Aluno: Matheus Henrique "}
          </Text>

          <Text fontSize={"lg"}>
            {"Curso: Engenharia de Software (2026.1)"}
          </Text>

        </Container>

      </Center>
    </>
  )
}
