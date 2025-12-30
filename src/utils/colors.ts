import { useEffect, useMemo, useReducer } from 'preact/hooks'

export const colors: { backgroundColor: string; color: string }[] = [
  {
    backgroundColor: '#ffffff',
    color: '#444',
  },

  {
    backgroundColor: 'crimson',
    color: '#eee',
  },
  {
    backgroundColor: '#4a33e2',
    color: '#ffdd00',
  },
  {
    backgroundColor: '#02f4d8ff',
    color: '#ff008c',
  },
  {
    backgroundColor: '#16181a',
    color: '#fff',
  },
]

export const useRandomColors: () => [Record<keyof (typeof colors)[number], string>, () => void] = () => {
  const [n, refresh] = useReducer(n => n + 1, 0)
  const reset = () => refresh(n + 1)
  const color = useMemo(() => colors[n % colors.length], [n])

  useEffect(() => {
    sessionStorage.setItem('greetingscard2026-color-theme', JSON.stringify(color))
  }, [n])

  return [color, reset]
}
