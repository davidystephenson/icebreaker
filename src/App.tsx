import { ChangeEvent, FormEvent, useState } from 'react'
import { Container, Heading, Input, FormControl, Button } from '@chakra-ui/react'

function App (): JSX.Element {
  const [message, setMessage] = useState('clear')

  function handleChange (event: ChangeEvent): void {
    setMessage('Changed')
  }

  function handleSubmit (event: FormEvent): void {
    event.preventDefault()
    console.log('Submitted')
    setMessage('Submitted')
  }

  return (
    <Container>
      <Heading>Icebreaker</Heading>

      <form onSubmit={handleSubmit}>
        <FormControl>
          <Input onChange={handleChange} />
        </FormControl>

        <Button type='submit'>Create Game</Button>
      </form>
      {message}
    </Container>
  )
}

export default App
