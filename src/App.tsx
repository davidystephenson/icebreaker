import { Container, Heading, Input, FormControl, Button } from '@chakra-ui/react'

function App (): JSX.Element {
  return (
    <Container>
      <Heading>Icebreaker</Heading>
      <FormControl>
        <Input />
        <Button>Create Game</Button>
      </FormControl>
    </Container>
  )
}

export default App
