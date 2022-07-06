import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Spinner } from '@chakra-ui/react'
import { getApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { collection, getFirestore } from 'firebase/firestore'
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import appCheck from './appCheck.json'
import { useAuthContext } from './context/auth'

function Home (): JSX.Element {
  const user = useAuthContext(state => state?.user)
  const loading = useAuthContext(state => state?.loading)
  const error = useAuthContext(state => state?.error)
  const displayName = useAuthContext(state => state?.displayName)
  const handleSignIn = useAuthContext(state => state?.handleSignIn)
  const handleSignOut = useAuthContext(state => state?.handleSignOut)
  const isAuthenticated = useAuthContext(state => state?.isAuthenticated)

  const isLocal = window.location.hostname === 'localhost'
  console.log('isLocal test:', isLocal)
  const app = getApp()
  const db = getFirestore(app)
  const functions = getFunctions(app, 'europe-west1')
  if (isLocal) {
    connectFunctionsEmulator(functions, 'localhost', 5001)
  }
  window.FIREBASE_APPCHECK_DEBUG_TOKEN = true

  const token = isLocal ? appCheck.debug : appCheck.site
  console.log('token test:', token)
  const provider = new ReCaptchaV3Provider(token)
  initializeAppCheck(app, { provider, isTokenAutoRefreshEnabled: true })

  const gamesRef = collection(db, 'games')
  const [games] = useCollectionData(gamesRef)
  console.log('games test:', games)

  const createGame = httpsCallable(functions, 'createGame')

  async function handleCreateGame (): Promise<void> {
    console.log('Creating...')
    await createGame()
    console.log('Created!')
  }

  console.log('user test:', user)

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
  const signOut = isAuthenticated === true && (
    <>
      <Button onClick={handleSignOut}>Sign out</Button>
      {' '}
      {displayName}
      {' '}
      <Button onClick={handleCreateGame}>Create game</Button>
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
