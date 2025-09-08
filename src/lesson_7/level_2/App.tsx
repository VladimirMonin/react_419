// Level 2 - Главный файл приложения
import { Card } from './components/Card';
import React from 'react';

// css
import './level_2.css';

const fruitData = [
    {
        title: "Апельсин",
        text: "Свежий и сочный апельсин, полный витаминов.",
        image: "https://images.unsplash.com/photo-1547514701-42782101795e?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        alt: "Апельсин"
    },
    {
        title: "Банан",
        text: "Спелый банан, богатый калием и энергией.",
        image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        alt: "Банан"
    },
    {
        title: "Яблоко",
        text: "Свежее яблоко, хрустящее и сладкое.",
        image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        alt: "Яблоко"
    }
];

export function AppLevel2() {
    {/* Состояние */}
            const [searchTerm, setSearchTerm] = React.useState('');
    
            const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

            const filteredFruits = fruitData.filter(fruit =>
                fruit.title.toLowerCase().includes(searchTerm.toLowerCase())
            );

    return (
        <div className="app-container">
            <h1>Магазин фруктов</h1>

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
                {filteredFruits.map((fruit, index) => (
                    <Card
                        key={index}
                        title={fruit.title}
                        text={fruit.text}
                        image={fruit.image}
                        alt={fruit.alt}
                    />
                ))}
            </div>
        </div>
    );
}