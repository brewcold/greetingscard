export function Word(s: string) {
  const span = document.createElement('span')
  span.innerText = s.trim()
  span.classList.add('word')

  const cleanups = new Set<() => void>()

  const api = {
    el: span,

    onClick(handler: (e: MouseEvent) => void) {
      span.addEventListener('click', handler)
      const off = () => span.removeEventListener('click', handler)
      cleanups.add(off)
      return api
    },

    dispose() {
      for (const off of cleanups) off()
      cleanups.clear()
      span.remove()
    },
  }

  return api
}
