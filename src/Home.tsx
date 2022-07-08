import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Spinner, Link } from '@chakra-ui/react'
import { collection, DocumentData, query, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore'
import { useMemo } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Link as ReactLink } from 'react-router-dom'

import { useAuthContext } from './context/auth'
import { useFireContext } from './context/fire'
import useCall from './use/call'

interface Game extends DocumentData {
  name: string
}

function Home (): JSX.Element {
  const user = useAuthContext(state => state?.user)
  const loading = useAuthContext(state => state?.loading)
  const error = useAuthContext(state => state?.error)
  const displayName = useAuthContext(state => state?.displayName)
  const handleSignIn = useAuthContext(state => state?.handleSignIn)
  const handleSignOut = useAuthContext(state => state?.handleSignOut)
  const isAuthenticated = useAuthContext(state => state?.isAuthenticated)
  const db = useFireContext(state => state.db)

  console.log('user test:', user)

  const gamesQuery = useMemo(() => {
    console.warn('New user:', user)
    const gameConverter = {
      toFirestore (game: Game): DocumentData {
        return game
      },
      fromFirestore (
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): Game {
        const data = snapshot.data(options)

        return { name: data.name }
      }
    }
    const gamesRef = collection(db, 'games').withConverter(gameConverter)

    return query(gamesRef)
  }, [db, user])
  const [games] = useCollectionData(gamesQuery)
  console.log('games test:', games)

  const { label: createLabel, run: handleCreateGame } = useCall({
    name: 'createGame',
    start: 'Creating...',
    end: 'Created!'
  })

  if (loading !== false) {
    return <Spinner />
  }

  if (error != null) {
    return (
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle>{error.message}</AlertTitle>
        <AlertDescription>{error.stack}</AlertDescription>
      </Alert>
    )
  }

  const signIn = isAuthenticated === false && <Button onClick={handleSignIn}>Create account</Button>

  const gameItems = games?.map(game => {
    return (
      <li key={game.name}>
        <Link as={ReactLink} to={`/game/${game.name}`}>
          {game.name}
        </Link>
      </li>
    )
  })
  const gamesList = <ol>{gameItems}</ol>
  const signOut = isAuthenticated === true && (
    <>
      <Button onClick={handleSignOut}>Sign out</Button>
      {' '}
      {displayName}
      {' '}
      <Button onClick={handleCreateGame}>Create game {createLabel}</Button>
      {gamesList}
    </>
  )

  return (
    <>
      {signIn}
      {signOut}
    </>
  )
}

export default Home
