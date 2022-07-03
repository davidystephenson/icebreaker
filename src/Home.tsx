import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Spinner } from '@chakra-ui/react'
import { useAuthContext } from './context/auth'

function Home (): JSX.Element {
  const user = useAuthContext(state => state?.user)
  const loading = useAuthContext(state => state?.loading)
  const error = useAuthContext(state => state?.error)
  const handleSignIn = useAuthContext(state => state?.handleSignIn)
  const handleSignOut = useAuthContext(state => state?.handleSignOut)

  console.log('loading test:', loading)
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

  return (
    <>
      <Button onClick={handleSignIn}>Sign in</Button>
      <Button onClick={handleSignOut}>Sign out</Button>
    </>
  )
}

export default Home
