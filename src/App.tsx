import { ChangeEvent, FormEvent, useState } from 'react'
import { Container, Heading, Input, FormControl, Button } from '@chakra-ui/react'
import { Routes, Route, Link } from 'react-router-dom'
import Game from './Game'

function App (): JSX.Element {
  const [message, setMessage] = useState('')
  const [input, setInput] = useState('')
  const [gamesList, setGamesList] = useState(['first', 'second', 'third'])
  function makeItem (game: string, index: number): JSX.Element {
    const paragraph = <p key={index}>{game}</p>
    return paragraph
  }
  const gameItems = gamesList.map(makeItem)

  function handleChange (event: ChangeEvent<HTMLInputElement>): void {
    setInput(event.target.value)
    setMessage(event.target.value)
  }

  function handleSubmit (event: FormEvent): void {
    event.preventDefault()
    setMessage('Submitted')
    const addedGamesList = [...gamesList, input]
    setGamesList(addedGamesList)
    setInput('')
  }

  function handleClick (): void {
    setInput('')
  }

  return (
    <Container>
      <Heading><Link to='/'>Iceebreaker</Link></Heading>


      <form onSubmit={handleSubmit}>
        <FormControl>
          <Input onChange={handleChange} value={input} />
        </FormControl>

        <Button type='submit'>Create Game</Button>
        <Button type='button' onClick={handleClick}>Reset</Button>
      </form>
      {message}
      {gameItems}
      <Routes>
        <Route path='/game' element={<Game />} />
      </Routes>
      <Link to='game'>Game page</Link>
    </Container>
  )
}

export default App
