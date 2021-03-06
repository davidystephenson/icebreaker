import { ChakraProvider, Container, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { AuthProvider } from './context/auth'
import { FireProvider } from './context/fire'
import { FunctionsProvider } from './context/functions'
import Router from './Router'

function App (): JSX.Element {
  return (
    <FireProvider>
      <AuthProvider>
        <FunctionsProvider>
          <ChakraProvider>
            <Container>
              <Heading>
                <Link to='/'>Icebreaker</Link>
              </Heading>

              <Router />
            </Container>
          </ChakraProvider>
        </FunctionsProvider>
      </AuthProvider>
    </FireProvider>
  )
}

export default App
