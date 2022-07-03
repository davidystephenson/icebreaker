import { Context, useContextSelector } from 'use-context-selector'

export default function selectFrom <T> (
  context: Context<T>
): <U> (selector: (state: T) => U) => U {
  function useSelect <U> (selector: (state: T) => U): U {
    return useContextSelector(context, selector)
  }

  return useSelect
}
