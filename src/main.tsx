import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const queryParams = new URLSearchParams(window.location.search);

if (!queryParams.has('register')) {
  window.location.href = '/src/plataforma.html';
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
