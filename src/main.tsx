// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {MainTitle, ShopListComponent, SimpleButton} from './App.tsx'

// Урок 3
import {UserProfile} from "./lesson_3.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainTitle message="hello" />
    <ShopListComponent productList={["Банан", "Апельсин", "Апельсин"]} />
    <SimpleButton />
    <UserProfile />

  </StrictMode>,
)


