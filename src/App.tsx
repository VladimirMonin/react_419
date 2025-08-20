// app.tsx
import './App.css'
import React from 'react';

interface AppProps {
    message: string;
}

interface ShopList {
    productList: string[]
    // productList: Array<string>
}

export function SimpleButton(){
    const handleClick = (event: React.MouseEvent) => {
        console.log("Тип события", event.type)
        console.log("Элемент события", event.target)
    }
    
    return (
        <button onClick={handleClick}>Тыц!</button>
    )
}


export function ShopListComponent ( {productList}: ShopList) {
    return (
        <ul className='productList'>
            {productList.map(product => (
                <li>{product}</li>
            ))}
        </ul>
    )
}


export function MainTitle({ message }: AppProps) {
  if (message === "hello") {
    return <h1 className="hello">Приветствую!</h1>
  }
  else if (message === "goodbye") {
    return <h1 className="goodbye">До скорой встречи!</h1>
  }
  return null;
}


// HTML -> TSX
// class - className
// thmlFor
// Компонент не может отдавать несколько тегов