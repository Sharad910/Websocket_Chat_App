import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Context from '@/context/username'
export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Context>
      <Component {...pageProps} />
      </Context>
    </ChakraProvider>
    )
    
}
