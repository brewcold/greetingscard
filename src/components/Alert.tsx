import type { ReactNode } from 'preact/compat'
import { useEffect } from 'preact/hooks'

type Props = {
  open: boolean
  onClose: () => void
  onExit?: () => void
  component?: () => ReactNode
  msg?: string
}

export function Alert({ open, onClose, onExit, component, msg }: Props) {
  useEffect(() => {
    const t = setTimeout(() => onClose(), 1500)
    return () => {
      clearTimeout(t)
      onExit?.()
    }
  }, [open])

  if (!open) return null
  if (component) return component()
  return <div class="overlay">{msg}</div>
}
