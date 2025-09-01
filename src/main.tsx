// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import {MainTitle, ShopListComponent, SimpleButton} from './App.tsx'

import {ShopListComponent, products, StandartButton, SipmpleButtonsGroup} from './lesson_4.tsx'
import { CounterButton, LikeDislike, ShowHideText, ControlledInput, ProductFilter} from './lesson_5.tsx';
// Урок 3
// import {UserProfile} from "./lesson_3.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <MainTitle message="hello" />
    <ShopListComponent productList={["Банан", "Апельсин", "Апельсин"]} />
    <SimpleButton />
    <UserProfile /> */}
    <ShopListComponent productList={products} />

    {/* Тест кнопки в разных вариантах */}
    <StandartButton color="warning" icon="basket-fill" title="Купить Хлебушек" btnType='iconButton' />

    <SipmpleButtonsGroup/>
    <LikeDislike />

    <CounterButton />
    <ShowHideText />
    <ControlledInput />
    <ProductFilter />
  </StrictMode>,
)


