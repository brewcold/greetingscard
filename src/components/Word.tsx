import type { ComponentChildren, ComponentProps } from 'preact'
import type { colors } from '../utils/colors'

type WordProps = {
  theme?: Record<keyof (typeof colors)[number], string>
  children: ComponentChildren
  selected?: boolean
  excluded?: boolean
  hide?: boolean
  onClick?: () => void
} & ComponentProps<'span'>

export function Word({ theme, hide, selected, excluded, onClick, children, ...props }: WordProps) {
  const className = `word ${excluded ? 'excluded' : ''} ${selected ? 'selected' : ''}`
  if (hide) return null
  return (
    <span style={theme} class={className} onClick={onClick} {...props}>
      {children}
    </span>
  )
}
