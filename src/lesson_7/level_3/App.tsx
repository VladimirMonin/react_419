// Level 2 - Главный файл приложения
import { Card } from './components/Card';
import { Cart } from './components/Cart';
import React from 'react';
import type { CartItem } from './interfaces';

// css
import './level_2.css';

const fruitData = [
    {
        id: 1,
        price: 100,
        title: "Апельсин",
        text: "Свежий и сочный апельсин, полный витаминов.",
        image: "https://images.unsplash.com/photo-1547514701-42782101795e?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        alt: "Апельсин"
    },
    {
        id: 2,
        price: 80,
        title: "Банан",
        text: "Спелый банан, богатый калием и энергией.",
        image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        alt: "Банан"
    },
    {
        id: 3,
        price: 120,
        title: "Яблоко",
        text: "Свежее яблоко, хрустящее и сладкое.",
        image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        alt: "Яблоко"
    }
];

export function AppLevel3() {
    {/* Состояние поля ввода - для фильтрации товаров */}
    const [searchTerm, setSearchTerm] = React.useState('');

    // Состояние для будущей корзины общая сумма покупок
    // Массив объектов, где есть id, title, price, quantity и totalPrice
    const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredFruits = fruitData.filter(fruit =>
        fruit.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddToCart = (id: number, title: string, price: number) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + price }
                        : item
                );
            } else {
                return [...prevItems, { id, title, price, quantity: 1, totalPrice: price }];
            }
        });
    };

    return (
        <div className="app-container">
            <h1>Магазин фруктов</h1>
            <Cart cartItems={cartItems} total={0} />

            {/* Управляемый компонент - поле ввода */}
            <input 
                type="text" 
                placeholder="Поиск фруктов..." 
                className="search-input"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            
            {/* Карточки фруктов */}
            <div className="card-container">
                {filteredFruits.map((fruit) => (
                    <Card
                        key={fruit.id}
                        id={fruit.id}
                        price={fruit.price}
                        title={fruit.title}
                        text={fruit.text}
                        image={fruit.image}
                        alt={fruit.alt}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>
        </div>
    );
}