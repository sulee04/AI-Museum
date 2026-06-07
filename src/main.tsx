import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/globals.css'
import App from '@/App'

async function preloadAssets() {
  const fontReady = document.fonts?.ready ?? Promise.resolve()
  await fontReady
}

preloadAssets().finally(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
