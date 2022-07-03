import { Auth, getAuth, signInAnonymously, signOut, User } from 'firebase/auth'
import { useCallback, useMemo } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import factory from './factory'

interface AuthValue {
  auth: Auth
  user?: User | null
  loading: boolean
  error?: Error
  handleSignIn: () => void
  handleSignOut: () => void
}

function useAuthValue (): AuthValue {
  const auth = useMemo(() => getAuth(), [])
  const handleSignIn = useCallback(async () => {
    try {
      await signInAnonymously(auth)
    } catch (error) {
      console.error(error)
    }
  }, [auth])

  const handleSignOut = useCallback(async () => {
    await signOut(auth)
  }, [auth])
  const [user, loading, error] = useAuthState(auth)

  const value: AuthValue = {
    auth,
    user,
    loading,
    error,
    handleSignIn,
    handleSignOut
  }

  return value
}

export const {
  useContext: useAuthContext,
  Provider: AuthProvider
} = factory({ useValue: useAuthValue })
