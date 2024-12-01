import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes } from './routes.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes/>
    </BrowserRouter>
  </StrictMode>,
)