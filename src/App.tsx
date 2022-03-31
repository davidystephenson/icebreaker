import { ChangeEvent, FormEvent, useState } from 'react'
import { Container, Heading, Input, FormControl, Button } from '@chakra-ui/react'

function App (): JSX.Element {
  const [message, setMessage] = useState('clear')
  console.log('message', message)
  const [gamesList, setGamesList] = useState(['first', 'second', 'third'])
  function makeItem (game: string, index: number): JSX.Element {
    const paragraph = <p key={index}>{game}</p>
    return paragraph
  }
  const gameItems = gamesList.map(makeItem)

  function handleChange (event: ChangeEvent<HTMLInputElement>): void {
    console.log('event', event)
    console.log('event.target', event.target)
    console.log('event.target.value', event.target.value)
    setMessage(event.target.value)
  }

  function handleSubmit (event: FormEvent): void {
    event.preventDefault()
    console.log('Submitted')
    setMessage('Submitted')
    const addedGamesList = [...gamesList, message]
    setGamesList(addedGamesList)
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
      {gameItems}
    </Container>
  )
}

export default App
