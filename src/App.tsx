import { Container, Heading } from '@chakra-ui/react'
import { Routes, Route, Link } from 'react-router-dom'
import Game from './Game'
import Home from './Home'

function App (): JSX.Element {
  return (
    <Container>
      <Heading><Link to='/'>Iceebreaker</Link></Heading>
      <Routes>
        <Route
          path='/' element={
            <Home />
          }
        />
        <Route path='/game/:gameName' element={<Game />} />
      </Routes>
    </Container>
  )
}

export default App
