import { Heading, Button } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

function Game (): JSX.Element {
  const [number, setNumber] = useState(0)
  const params = useParams()

  function handleClick (): void {
    const newNumber = number + 1
    setNumber(newNumber)
  }

  return (
    <Heading>{params.gameName} Game
      Players in game: {number}
      <Button onClick={handleClick}>Join</Button>

    </Heading>
  )
}

export default Game
