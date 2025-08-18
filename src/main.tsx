import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainTitle from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainTitle message="goodbye" />
    <MainTitle message="goodbye" />
    <MainTitle message="goodbye" />
    <MainTitle message="goodbye" />
    <MainTitle message="goodbye" />
    <MainTitle message="goodbye" />
  </StrictMode>,
)
