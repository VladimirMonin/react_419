// Компонент корзины - отображение общей суммы покупок
import React from 'react';

import type { CartItem } from '../interfaces';


export function Cart({ cartItems, total } : { cartItems: CartItem[]; total: number }) {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <div className="cart">
            {/* Если корзина пустая показываем bi bi-cart если есть товар - bi bi-cart-check-fill */}
            {cartItems.length === 0 && <i className="bi bi-cart"></i>}
            {cartItems.length > 0 && <i className="bi bi-cart-check-fill"><span>{totalQuantity}</span></i>}
            {/* Если сумма выше нуля - синтаксический сахар */}
            {totalAmount > 0 && <i className="bi bi-cash"><span>{totalAmount} ₽</span></i>}
        </div>
    );
}