УРОК №3.1
ПРИМЕР №3.1.1
ФАЙЛ: `src/main.tsx`
КОММЕНТАРИЙ: Подготовка окружения. Сначала в терминале выполняется команда `npm install bootstrap bootstrap-icons react-bootstrap`. Затем в главный файл `main.tsx` добавляются импорты стилей Bootstrap.

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

ПРИМЕР №3.1.2

ФАЙЛ: src/components/StandartButton.tsx

КОММЕНТАРИЙ: Создаем базовый компонент StandartButton. Определяем интерфейс ButtonProps с цветом фона и заголовком. Используем классы Bootstrap для стилизации.

```tsx
export type BSColors = "dark" | "warning" | "danger" | "info" | "primary" | "success"

export interface ButtonProps {
    BGcolor: BSColors
    title: string
}

export function StandartButton(props: ButtonProps) {
    return (
        <button className={`btn btn-${props.BGcolor}`}>
            {props.title}
        </button>
    )
}
```

---

ПРИМЕР №3.1.3

ФАЙЛ: `src/components/StandartButton.tsx`

КОММЕНТАРИЙ: Мы изменяем пример №3.1.2 из текущего урока. Расширяем интерфейс ButtonProps, добавляя btnType и icon. Внедряем условный рендеринг: в зависимости от btnType компонент будет отображать либо текстовый заголовок, либо иконку.

```tsx
export type BSColors = "dark" | "warning" | "danger" | "info" | "primary" | "success"

export interface ButtonProps {
    BGcolor: BSColors
    icon: string
    title: string
    btnType: "textButton" | "iconButton"
}

export function StandartButton(props: ButtonProps) {
    let content;
    if (props.btnType === "textButton") {
        content = props.title
    } else {
        content = <i className={`bi bi-${props.icon}`}></i>
    }

    return (
        <button className={`btn btn-${props.BGcolor}`}>
            {content}
        </button>
    )
}
```

---
ПРИМЕР №3.1.4
ФАЙЛ: `src/utils/handlers.ts`
КОММЕНТАРИЙ: Мы изменяем пример №3.1.3 из текущего урока. Для добавления интерактивности сначала создадим отдельный файл с простыми функциями-обработчиками. Это хорошая практика — выносить логику из компонентов.

```tsx
export function printHello() {
    alert("Кнопка была нажата!");
}

export function consoleLogClick() {
   console.log("Обработчик сработал, событие в консоли.");
}
```

---

ФАЙЛ: src/components/StandartButton.tsx

КОММЕНТАРИЙ: Теперь модифицируем сам компонент StandartButton. Импортируем обработчики, добавляем в интерфейс props свойство onClick типа () => void и привязываем его к соответствующему атрибуту тега <button>.

```tsx
import { printHello, consoleLogClick } from '../utils/handlers';

export type BSColors = "dark" | "warning" | "danger" | "info" | "primary" | "success"

export interface ButtonProps {
    BGcolor: BSColors
    icon: string
    title: string
    btnType: "textButton" | "iconButton"
    onClick: () => void
}

export function StandartButton(props: ButtonProps) {
    let content;
    if (props.btnType === "textButton") {
        content = props.title
    } else {
        content = <i className={`bi bi-${props.icon}`}></i>
    }

    return (
        <button onClick={props.onClick} className={`btn btn-${props.BGcolor}`}>
            {content}
        </button>
    )
}
```

---

ПРИМЕР №3.1.5

ФАЙЛ: `src/components/SimpleButtonsGroup.tsx`

КОММЕНТАРИЙ: Финальная сборка. Создаем компонент-витрину SimpleButtonsGroup, который импортирует и многократно использует наш StandartButton. Здесь мы наглядно демонстрируем, как один и тот же компонент может выглядеть и вести себя по-разному благодаря props.

```tsx
import { StandartButton } from './StandartButton';
import { printHello, consoleLogClick } from '../utils/handlers';

export function SimpleButtonsGroup() {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Набор кнопок</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">На самом деле это один компонент кнопки!</h6>
                <p className="card-text">Пример переиспользуемости компонента <code>StandartButton</code> с разными параметрами <code>Props</code>.</p>
                
                <div className="d-flex gap-2 flex-wrap justify-content-center">
                    <StandartButton BGcolor="dark" icon="eye-fill" title="Посмотреть" btnType="iconButton" onClick={consoleLogClick} />
                    <StandartButton BGcolor="warning" icon="basket-fill" title="В корзину" btnType="iconButton" onClick={printHello} />
                    <StandartButton BGcolor="danger" icon="heart-fill" title="В избранное" btnType="iconButton" onClick={printHello} />
                    <StandartButton BGcolor="info" icon="share" title="Поделиться" btnType="iconButton" onClick={consoleLogClick} />
                    <StandartButton BGcolor="success" icon="check-lg" title="Применить" btnType="textButton" onClick={printHello} />
                </div>
            </div>
        </div>
    )
}
```
