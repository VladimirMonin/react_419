// Level 2 - Главный файл приложения
import { Card } from './components/Card';
import { Cart } from './components/Cart';
import React from 'react';
import type { CartItem } from './interfaces';

// css
import './app.css';

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
        image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        alt: "Яблоко"
    },
    {
        id: 4,
        price: 200,
        title: "Авокадо",
        text: "Кремовое авокадо, богатое полезными жирами.",
        image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        alt: "Авокадо"
    },
    {
        id: 5,
        price: 90,
        title: "Киви",
        text: "Экзотический киви с высоким содержанием витамина C.",
        image: "https://images.unsplash.com/photo-1585059895524-72359e06133a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        alt: "Киви"
    },
    {
        id: 6,
        price: 150,
        title: "Гранат",
        text: "Сочный гранат, полный антиоксидантов.",
        image: "https://i.pinimg.com/736x/a9/1a/35/a91a3575e5000116c2199c8b4e5cfc3b.jpg",
        alt: "Гранат"
    },
    {
        id: 7,
        price: 300,
        title: "Орехи микс",
        text: "Смесь полезных орехов для здорового перекуса.",
        image: "https://images.sellbrite.com/production/32906/MIX-NUT-O-1/017ad337-fcc0-5b4a-b265-2d32fe7282ae.jpg",
        alt: "Орехи"
    },
    {
        id: 8,
        price: 250,
        title: "Греческий йогурт",
        text: "Натуральный греческий йогурт с высоким содержанием белка.",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        alt: "Греческий йогурт"
    },
    {
        id: 9,
        price: 180,
        title: "Овсяные хлопья",
        text: "Цельнозерновые овсяные хлопья для здорового завтрака.",
        image: "https://cdn.100sp.ru/pictures/481657035",
        alt: "Овсяные хлопья"
    },
    {
        id: 10,
        price: 220,
        title: "Семена чиа",
        text: "Суперфуд семена чиа, богатые омега-3 кислотами.",
        image: "https://cdn1.ozone.ru/s3/multimedia-9/c600/6616476621.jpg",
        alt: "Семена чиа"
    }
];

export function App() {
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

    const handleAddToCart = (id: number, title: string, price: number, quantity: number) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + quantity, totalPrice: item.totalPrice + price * quantity }
                        : item
                );
            } else {
                return [...prevItems, { id, title, price, quantity, totalPrice: price * quantity }];
            }
        });
    };

    return (
        <div className="app-container">
            <div className="header">
            <h1>Магазин фруктов</h1>
           

            {/* Управляемый компонент - поле ввода */}
            <input 
                type="text" 
                placeholder="Поиск фруктов..." 
                className="search-input"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <Cart cartItems={cartItems} total={0} />
            </div>
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