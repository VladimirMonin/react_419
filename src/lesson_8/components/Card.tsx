// Lesson 7 Level 2 - Создание карточки, которая будет использовать кнопку
import type { CardProps } from '../interfaces';
import { Button } from './Button';
import React from 'react';

export function Card({ id, price, title, text, image, alt, onAddToCart }: CardProps) {
    // Состояние количества товара в карточке
    const [quantity, setQuantity] = React.useState(1);

    const handlePlus = () => {
        setQuantity(quantity + 1);
    }

    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }}

    return (
        <div className='card'>
            <img src={image} alt={alt} className='card-img' />
            <h2 className='card-title'>{title}</h2>
            <p className='card-text'>{text}</p>
            <p className='card-price'>{price} <i className="bi bi-cash"></i></p>
            {/* Флекс контейнер для кнопок */}
            <div className="button-container">
                <Button color="Tomato" icon="bi-dash" onClick={handleMinus} />
                <div className='quantity'>{quantity}</div>
                <Button color="DodgerBlue" icon="bi-plus" onClick={handlePlus} />
                <Button color="ForestGreen" icon="bi-cart-plus" onClick={() => onAddToCart(id, title, price, quantity)} />
            </div>
        </div>
    );
}