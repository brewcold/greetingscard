import { render } from 'preact'
import { App } from './App'
import './style.css'
import { Providers } from './components/Providers'

render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById('app')!,
)
