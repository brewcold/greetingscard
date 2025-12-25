import { Word } from '../Word'

export function replaceInputWithWord(input: HTMLInputElement) {
  const name = input.value.trim() || '익명'
  const { el } = Word(name)
  el.classList.add('username-word')
  el.dataset.selected = 'true'
  input.replaceWith(el)
  return el
}
