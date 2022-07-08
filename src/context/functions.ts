import { httpsCallable } from 'firebase/functions'
import { useCallback } from 'react'
import factory from './factory'
import { useFireContext } from './fire'

interface FunctionsValue {
  call: ({ name }: { name: string }) => Promise<void>
}

function useFunctionsValue (): FunctionsValue {
  const functions = useFireContext(state => state.functions)

  const call = useCallback(async ({ name }: {
    name: string
  }) => {
    const fn = httpsCallable(functions, name)

    await fn()
  }, [functions])

  const value = { call }

  return value
}

export const {
  useContext: useFunctionsContext,
  Provider: FunctionsProvider
} = factory({ useValue: useFunctionsValue })
