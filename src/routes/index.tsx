import { Center, Container, Span, Text } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Center>

        <Container minH={"100vh"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>

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

          <Container display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} gap={2}>

            <Text fontWeight="semibold" mt={3}>
              {"Sobre o Projeto (Informações básicas)"}
            </Text>

            <Text fontSize={"sm"} fontWeight="semibold">
              {"Entidades: Professor, Curso, Departamento, Alocação."}
            </Text>

            <Text fontSize={"sm"} width={"1/2"} fontWeight="semibold">
              {"--> API RestFul desenvolvida com Spring Boot (Java) no Backend."}
            </Text>

            <Text fontSize={"sm"} width={"1/2"} fontWeight="semibold">
              {"--> SPA desenvolvida com React, Tanstack Router e Vite pro Frontend."}
            </Text>

            <Text fontSize={"sm"} width={"1/2"} fontWeight="semibold">
              {"--> Curso e Departamento são entidades independentes. Professor faz conexão com Departamento, e depende dele pra ser criado. Alocação precisa de Professor e Curso."}
            </Text>

          </Container>

        </Container>

      </Center>
    </>
  )
}
