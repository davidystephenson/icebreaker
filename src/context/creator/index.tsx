import { FC, ReactNode } from 'react'
import { createContext } from 'use-context-selector'

import selectFrom from './selectFrom'

type CreatedProvider <T> = (props: T & { children: ReactNode }) => JSX.Element
type CreatedSelector <T> = <V> (selector: (value: T) => V) => V
interface ContextCreation <T, U> {
  Provider: CreatedProvider<U>
  useContext: CreatedSelector<T>
}
interface WrapperProps <T> {
  value: T
  children: ReactNode
}

export default function contextCreator <T, U> ({
  name,
  initialValue,
  useValue,
  Inside
}: {
  name?: string
  initialValue: T
  useValue: (props: U) => T
  Inside?: FC<WrapperProps<T>>
}): ContextCreation<T, U> {
  const context = createContext(initialValue)

  function Provider (props: U & { children: ReactNode }): JSX.Element {
    const value = useValue({ ...props })

    const content = Inside == null
      ? props.children
      : <Inside value={value}>{props.children}</Inside>

    return (
      <context.Provider value={value}>
        {content}
      </context.Provider>
    )
  }

  const useContext = selectFrom(context)

  const creation = {
    Provider,
    useContext
  }

  return creation
}
