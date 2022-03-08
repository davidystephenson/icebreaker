import { Button, Container, Heading, Input } from '@chakra-ui/react'
import { FormEvent } from 'react'

function App (): JSX.Element {
  function handleSubmit (event: FormEvent): void {
    event.preventDefault()
    console.log('Submitted')
  }
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Heading>Icebreaker</Heading>
        <Input />
        <Button type='submit'>Create Game</Button>
      </form>
    </Container>
  )
}

export default App
