import { Heading } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

function Game (): JSX.Element {
  const params = useParams()
  console.log('params test:', params)
  return <Heading>{params.gameName} Game</Heading>
}

export default Game
