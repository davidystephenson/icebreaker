import { Auth, connectAuthEmulator, getAuth, signInAnonymously, signOut, User } from 'firebase/auth'
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
  displayName?: string
  isAuthenticated: boolean
}

function useAuthValue (): AuthValue {
  const auth = useMemo(() => {
    const auth = getAuth()
    if (window.location.hostname === 'localhost') {
      connectAuthEmulator(auth, 'http://localhost:9099')
    }

    return auth
  }, [])

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
  const isAuthenticated = user != null
  const displayName = user?.displayName ?? user?.uid

  const value: AuthValue = {
    auth,
    user,
    loading,
    error,
    handleSignIn,
    handleSignOut,
    isAuthenticated,
    displayName
  }

  return value
}

export const {
  useContext: useAuthContext,
  Provider: AuthProvider
} = factory({ useValue: useAuthValue })
