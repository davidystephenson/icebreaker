import { useCallback, useState } from 'react'
import { useFunctionsContext } from '../context/functions'

interface Call {
  label?: string
  run: () => Promise<void>
}

interface Props {
  name: string
  start: string
  end: string
}

export default function useCall ({ name, start, end }: Props): Call {
  const call = useFunctionsContext(state => state?.call)
  const [label, setLabel] = useState<string>()

  const run = useCallback(async () => {
    setLabel(start)

    await call?.({ name })

    setLabel(end)

    setTimeout(() => setLabel(undefined), 2000)
  }, [call])

  const value = { label, run }

  return value
}
