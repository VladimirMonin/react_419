// Компонент корзины - отображение общей суммы покупок
import React from 'react';

import type { CartItem } from '../interfaces';


export function Cart({ cartItems, total } : { cartItems: CartItem[]; total: number }) {
    return (
        <div>
            <h2>Информация о корзине:</h2>
            <p>Всего уникальных товаров в корзине: {cartItems.length}</p>
            <p>Общее количество товаров: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
            <p>Общая сумма: {cartItems.reduce((sum, item) => sum + item.totalPrice, 0)} ₽</p>
        </div>
    )
}   