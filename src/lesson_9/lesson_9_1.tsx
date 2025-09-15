// Lesson 9 - Знакомство с Хуком useContext
// Этот хук используется для передачи данных через дерево компонентов без необходимости передавать пропсы на промежуточных уровнях.
// Классические примеры: 1. Тема оформления 2. Локализация 3. Авторизация пользователя 4. Валюта
// Напишем серию компонентов с максимально простым функционалом для примера


// Датасет. 3 товара с разными валютами

export const products = [
    {
        id: 1,
        price: [{ amount: 100, currency: 'USD' }, { amount: 6000, currency: 'RUB' }, { amount: 90, currency: 'EUR' }],
        title: "Апельсин",
        text: "Свежий и сочный апельсин, полный витаминов.",
        image: "https://images.unsplash.com/photo-1547514701-42782101795e?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        alt: "Апельсин"
    },
    {
        id: 2,
        price: [{ amount: 80, currency: 'USD' }, { amount: 4800, currency: 'RUB' }, { amount: 70, currency: 'EUR' }],
        title: "Банан",
        text: "Спелый банан, богатый калием и энергией.",
        image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        alt: "Банан"
    },
    {
        id: 3,
        price: [{ amount: 120, currency: 'USD' }, { amount: 7200, currency: 'RUB' }, { amount: 110, currency: 'EUR' }],
        title: "Яблоко",
        text: "Свежее яблоко, хрустящее и сладкое.",
        image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        alt: "Яблоко"
    }
];

// Импорт хука контекста
import { useContext, createContext } from 'react';

// Интерфейс для типа валютного контекста
interface CurrencyContextType {
    currency: string;
    setCurrency: (currency: string) => void;
}

// Создаем контекст
export const CurrencyContext = createContext<CurrencyContextType | null>(null);

// Интерфейс для товара
export interface CartItem {
    id: number;
    title: string;
    price: { amount: number; currency: string }[];
    image: string;
    alt: string;
    text: string;
}

// Карточка товара
export function ProductCard({ product }: { product: CartItem }) {
    // Получаем текущую валюту из контекста
    const currencyContext = useContext(CurrencyContext);
    const currentCurrency = currencyContext?.currency || 'USD';
    
    // Находим цену для текущей валюты
    const currentPrice = product.price.find(p => p.currency === currentCurrency);
    
    return (
        <div className="card" style={{ width: '18rem', margin: '10px' }}>
            <img src={product.image} className="card-img-top" alt={product.alt} />
            <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.text}</p>
                <p>Текущая цена: {currentPrice?.amount} {currentCurrency}</p>
                <button className="btn btn-primary">В корзину</button>
                
                
                {/* Выпадашка смены валюты */}
                <select value={currentCurrency} onChange={(e) => currencyContext?.setCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="RUB">RUB</option>
                </select>
            </div>
        </div>
    );
};
