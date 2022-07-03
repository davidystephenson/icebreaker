import { ChakraProvider, Container, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { AuthProvider } from './context/auth'

import Router from './Router'

function App (): JSX.Element {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Container>
          <Heading>
            <Link to='/'>Icebreaker</Link>
          </Heading>

          <Router />
        </Container>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
