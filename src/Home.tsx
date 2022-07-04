import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Spinner } from '@chakra-ui/react'
import { useAuthContext } from './context/auth'

function Home (): JSX.Element {
  const user = useAuthContext(state => state?.user)
  const loading = useAuthContext(state => state?.loading)
  const error = useAuthContext(state => state?.error)
  const displayName = useAuthContext(state => state?.displayName)
  const handleSignIn = useAuthContext(state => state?.handleSignIn)
  const handleSignOut = useAuthContext(state => state?.handleSignOut)
  const isAuthenticated = useAuthContext(state => state?.isAuthenticated)

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
