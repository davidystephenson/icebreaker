import { FC, ReactNode } from 'react'
import { createContext } from 'use-context-selector'

import selectFrom from './selectFrom'

type CreatedProvider <Props> = (props: Props & { children: ReactNode }) => JSX.Element
type CreatedSelector <Value> = <Selected> (selector: (value: Value) => Selected) => Selected
interface ContextCreation <Value, Props> {
  Provider: CreatedProvider<Props>
  useContext: CreatedSelector<Value>
}
type CreatedContext <Value, Initial, Props> = ContextCreation<Value | Initial, Props>
interface WrapperProps <Value> {
  value: Value
  children: ReactNode
}
interface FactoryProps <Value, Props> {
  useValue: (props: Props) => Value
  Inside?: FC<WrapperProps<Value>>
}
interface CreatorProps <Value, Initial, Props> extends FactoryProps<Value, Props> {
  initialValue: Initial
}

function contextCreator <Value, Initial, Props> ({
  initialValue,
  useValue,
  Inside
}: CreatorProps<Value, Initial, Props>): CreatedContext<Value, Initial, Props> {
  const context = createContext<Value | Initial>(initialValue)

  function Provider (props: Props & { children: ReactNode }): JSX.Element {
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

export default function creatorFactory <Initial> ({ initialValue }: {
  initialValue: Initial
}): <Value, Props> (props: FactoryProps<Value, Props>) => CreatedContext<Value, Initial, Props> {
  function factory <Value, Props> (props: FactoryProps<Value, Props>): CreatedContext<Value, Initial, Props> {
    const creatorProps = { ...props, initialValue }
    const createdContext = contextCreator<Value, Initial, Props>(creatorProps)

    return createdContext
  }

  return factory
}
