// Lesson 6 - React TypeScript - передача collback функции из родителя в дочерний компонент

// Пример 1. Сделаем простой контейнер и простую кнопку BS5. Передадим callback для отслеживания кликов по кнопке из родителя в дочерний компонент

import React, { useState } from 'react';

// Компонент кнопки
function MyButton(props: { onClick: () => void; }) {
    return (
        <button className="btn btn-primary" onClick={props.onClick}>
            <i className="bi bi-hand-thumbs-up"></i> Нравится
        </button>
    );
}

// Компонент контейнера
export function ButtonContainer() {
    const [count, setCount] = useState(0);
    const handleClick = () => {
        setCount(count + 1);
    }

    return (
        <div>
            <MyButton onClick={handleClick} />
            <MyButton onClick={handleClick} />
            <p>Количество кликов: {count}</p>
        </div>
    );
}

// Пример №2. Сделаем такой же контейнер, тоже с двумя кнопками, но в этот раз кнопки будут увеличивать и уменьшать счетчик лайков

// Компонент кнопки лайк/дизлайк
function LikeDislikeButton(props: { onClick: () => void; icon: string; }) {
    return (
        <button className="btn btn-primary" onClick={props.onClick}>
            <i className={`bi bi-${props.icon}`}></i>
        </button>
    );
}

// Компонент контейнера лайк/дизлайк
export function LikeDislikeContainer() {
    const [likes, setLikes] = useState(0);
    const handleLike = () => {
        setLikes(likes + 1);
    }
    const handleDislike = () => {
        if (likes > 0) {
            setLikes(likes - 1);
        } else {
            setLikes(0);
        }
    }
    return (
        <div>
            <LikeDislikeButton onClick={handleLike} icon="hand-thumbs-up" />
            <LikeDislikeButton onClick={handleDislike} icon="hand-thumbs-down" />
            <p>Количество лайков: {likes}</p>
        </div>
    );
}

// Пример 3. Сделаем такой же контейнер, но в этот раз кнопка дизлайк будет отключатся если счетчик лайков равен 0. А так же мы будем передавать текст кнопки, и возвращать колбеком название покторому был сделан клик.

// Интерфейс пропсов кнопки
interface LikeDislikeButtonProps {
    onClick: (type: string) => void;
    icon: string;
    title: string;
    disabled?: boolean;
}

// Компонент кнопки лайк/дизлайк с текстом и возможностью дизейбла
function LikeDislikeButtonWithText(props: LikeDislikeButtonProps) {
    return (
        <button className="btn btn-primary" onClick={() => props.onClick(props.title)} disabled={props.disabled}>
            <i className={`bi bi-${props.icon}`}></i> {props.title}
        </button>
    );
}

// Компонент контейнера лайк/дизлайк с текстом
export function LikeDislikeContainerWithText() {
    const [likes, setLikes] = useState(0);
    
    const handleClick = (type: string) => {
        if (type === "Like") {
            setLikes(likes + 1);
        } else if (type === "Dislike") {
            setLikes(Math.max(0, likes - 1)); // Гарантируем, что лайки не станут отрицательными
        }
    }

    // Формула прозрачности: чем больше лайков, тем менее прозрачный (более видимый)
    // Минимальная прозрачность 0.3, максимальная 1.0
    const opacity = Math.min(1, 0.2 + (likes * 0.1));
    
    return (
        <div>
            <LikeDislikeButtonWithText onClick={handleClick} icon="hand-thumbs-up" title="Like" />
            <LikeDislikeButtonWithText onClick={handleClick} icon="hand-thumbs-down" title="Dislike" disabled={likes === 0} />
            <p style={{ opacity: opacity }} >Количество лайков: {likes}</p>
        </div>
    );
}

// Пример №4. Муляж каталога товаров. Родительский компонент рендерит список товаров, каждый товар - дочерний компонент. Имеет кнопку "Купить" и получает название, id, и цену товара. Хранит в пропсах количество добавленных товаров в корзину.

// При нажатии на кнопку "Купить" вызывается колбек из родителя, который увеличивает счетчик товаров в корзине. Родительский компонент отображает общее количество товаров в корзине и знает общую сумму покупок.

// Интерфейс пропсов товара
interface ProductProps {
    id: number;
    name: string;
    price: number;
    onBuy: (id: number, price: number) => void;
}

// Компонент товара BS5 карточка
function Product(props: ProductProps) {
    return (
        <div className="card" style={{ width: '18rem', margin: '10px' }}>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">Цена: ${props.price.toFixed(2)}</p>
                <button className="btn btn-primary" onClick={() => props.onBuy(props.id, props.price)}>
                    <i className="bi bi-basket-fill"></i> Купить
                </button>
            </div>
        </div>
    );
}
// Компонент каталога товаров
export function ProductCatalog(props: { products: ProductProps[]; onBuy: (id: number, price: number) => void; }) {
    return (
        <div className="d-flex flex-wrap">
            {props.products.map(product => (
                <Product key={product.id} {...product} onBuy={props.onBuy} />
            ))}
        </div>
    );
}

// Компонент контейнера каталога с корзиной
export function ProductCatalogContainer() {
    const [cartCount, setCartCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const products = [
        { id: 1, name: "Товар 1", price: 10.00 },
        { id: 2, name: "Товар 2", price: 20.00 },
        { id: 3, name: "Товар 3", price: 30.00 },
    ];
    const handleBuy = (id: number, price: number) => {
        setCartCount(cartCount + 1);
        setTotalPrice(totalPrice + price);
        console.log(`Товар с id ${id} добавлен в корзину. Цена: $${price.toFixed(2)}`);
    }

    return (
        <div>
            <h3>Корзина: {cartCount} товаров на сумму ${totalPrice.toFixed(2)}</h3>
            <ProductCatalog products={products} onBuy={handleBuy} />
        </div>
    );
}

