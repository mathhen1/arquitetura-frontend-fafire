import { createRoot } from 'react-dom/client'
import './index.css'

import { routeTree } from './routeTree.gen.ts'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import Toaster from './components/Toaster.tsx'

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <ChakraProvider value={defaultSystem}>
    <RouterProvider router={router} />
    <Toaster />
  </ChakraProvider>
)
