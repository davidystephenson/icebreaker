import { FormControl, Input, Button } from '@chakra-ui/react'
import { useState, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'

function Home (): JSX.Element {
  const [message, setMessage] = useState('')
  const [input, setInput] = useState('')
  const [gamesList, setGamesList] = useState(['first', 'second', 'third'])
  function makeItem (gameName: string, index: number): JSX.Element {
    const gameLink = `/game/${gameName}`
    const paragraph = (
      <p key={index}>
        <Link to={gameLink}>{gameName}</Link>
      </p>
    )
    return paragraph
  }
  const gameItems = gamesList.map(makeItem)

  function handleChange (event: ChangeEvent<HTMLInputElement>): void {
    setInput(event.target.value)
    setMessage(event.target.value)
  }

  function handleClick (): void {
    setInput('')
  }
  function handleSubmit (event: FormEvent): void {
    event.preventDefault()
    setMessage('Submitted')
    const addedGamesList = [...gamesList, input]
    setGamesList(addedGamesList)
    setInput('')
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Input onChange={handleChange} value={input} />
        </FormControl>

        <Button type='submit'>Create Game</Button>
        <Button type='button' onClick={handleClick}>Reset</Button>
      </form>
      {message}
      {gameItems}
    </>
  )
}

export default Home
