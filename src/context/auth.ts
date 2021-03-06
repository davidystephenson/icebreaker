import { Auth, signInAnonymously, signOut, User } from 'firebase/auth'
import { useCallback, useMemo } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import factory from './factory'
import { useFireContext } from './fire'

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
  const auth = useFireContext(state => state.auth)
  const handleSignIn = useCallback(async () => await signInAnonymously(auth), [auth])
  const handleSignOut = useCallback(async () => await signOut(auth), [auth])

  const [user, loading, error] = useAuthState(auth)
  const isAuthenticated = useMemo(() => user != null, [user])
  const displayName = useMemo(() => user?.displayName ?? user?.uid, [user])

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
