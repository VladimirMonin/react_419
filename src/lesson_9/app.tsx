// App tsx для урока 9
import React from 'react';
import { ProductCard, products, CurrencyContext, CartContext, Cart } from './lesson_9_1';
import type { CartItem } from './lesson_9_1';
// Соберем все

// Интерфейс для товара в корзине
interface CartItemInCart {
    id: number;
    title: string;
    price: { amount: number; currency: string }[];
    quantity: number;
}

export function App() {
    // Состояние - выбранная валюта
    const [selectedCurrency, setSelectedCurrency] = React.useState('USD');
    
    // Состояние корзины
    const [cartItems, setCartItems] = React.useState<CartItemInCart[]>([]);

    // Селект с выбором валюты
    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(e.target.value);
    };

    // Функция добавления товара в корзину
    const addToCart = (product: CartItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                // Если товар уже есть в корзине, увеличиваем количество
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Если товара нет в корзине, добавляем его
                return [...prevItems, { 
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: 1 
                }];
            }
        });
    };

    // Функция очистки корзины
    const clearCart = () => {
        setCartItems([]);
    };

    // Объект для контекста валюты
    const currencyContextValue = {
        currency: selectedCurrency,
        setCurrency: setSelectedCurrency
    };

    // Объект для контекста корзины
    const cartContextValue = {
        cartItems,
        addToCart,
        clearCart
    };

    return (
        // Провайдеры контекстов
        <CurrencyContext.Provider value={currencyContextValue}>
            <CartContext.Provider value={cartContextValue}>
                <div className="App">
                    <h1>Магазин фруктов с разными валютами</h1>

                    <select name="currency" id="currency" value={selectedCurrency} onChange={handleCurrencyChange}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="RUB">RUB</option>
                    </select>

                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {products.map(product => (
                            <ProductCard key={product.id} product={product}/>
                        ))}
                    </div>

                    {/* Компонент корзины */}
                    <Cart />
                </div>
            </CartContext.Provider>
        </CurrencyContext.Provider>
    );
}