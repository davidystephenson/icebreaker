import { ChakraProvider, Container, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { AuthProvider } from './context/auth'
import { FireProvider } from './context/fire'
import Router from './Router'

function App (): JSX.Element {
  return (
    <FireProvider>
      <AuthProvider>
        <ChakraProvider>
          <Container>
            <Heading>
              <Link to='/'>Icebreaker</Link>
            </Heading>

            <Router />
          </Container>
        </ChakraProvider>
      </AuthProvider>
    </FireProvider>
  )
}

export default App
