import { FormEvent } from 'react'
import { Container, Heading, Input, FormControl, Button } from '@chakra-ui/react'

function App (): JSX.Element {
  function handleSubmit (event: FormEvent): void {
    event.preventDefault()
    console.log('Submitted')
  }
  return (
    <Container>
      <Heading>Icebreaker</Heading>

      <form onSubmit={handleSubmit}>
        <FormControl>
          <Input />
        </FormControl>

        <Button type='submit'>Create Game</Button>
      </form>
    </Container>
  )
}

export default App
