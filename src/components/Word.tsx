import type { ComponentChildren, ComponentProps } from 'preact'
import type { colors } from '../utils/colors'

type WordProps = {
  theme?: Record<keyof (typeof colors)[number], string>
  children: ComponentChildren
  selected?: boolean
  excluded?: boolean
  hide?: boolean
  onClick?: () => void
} & ComponentProps<'button'>

export function Word({ theme, hide, selected, excluded, onClick, children, ...props }: WordProps) {
  const className = `word ${excluded ? 'excluded' : ''}`
  if (hide) return null
  return (
    <button aria-pressed={selected} style={theme} class={className} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
