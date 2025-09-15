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

// Интерфейс для товара в корзине
interface CartItemInCart {
    id: number;
    title: string;
    price: { amount: number; currency: string }[];
    quantity: number;
}

// Интерфейс для контекста корзины
interface CartContextType {
    cartItems: CartItemInCart[];
    addToCart: (product: CartItem) => void;
    clearCart: () => void;
}

// Создаем контексты
export const CurrencyContext = createContext<CurrencyContextType | null>(null);
export const CartContext = createContext<CartContextType | null>(null);

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
    
    // Получаем функции корзины из контекста
    const cartContext = useContext(CartContext);
    
    // Находим цену для текущей валюты
    const currentPrice = product.price.find(p => p.currency === currentCurrency);
    
    // Функция добавления в корзину
    const handleAddToCart = () => {
        if (cartContext) {
            cartContext.addToCart(product);
        }
    };
    
    return (
        <div className="card" style={{ width: '18rem', margin: '10px' }}>
            <img src={product.image} className="card-img-top" alt={product.alt} />
            <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.text}</p>
                <p>Текущая цена: {currentPrice?.amount} {currentCurrency}</p>
                <button className="btn btn-primary" onClick={handleAddToCart}>В корзину</button>
                
                
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

// Компонент корзины
export function Cart() {
    // Получаем текущую валюту из контекста
    const currencyContext = useContext(CurrencyContext);
    const currentCurrency = currencyContext?.currency || 'USD';
    
    // Получаем корзину из контекста
    const cartContext = useContext(CartContext);
    
    if (!cartContext) {
        return <div>Корзина не инициализирована</div>;
    }
    
    const { cartItems, clearCart } = cartContext;
    
    // Вычисляем общую стоимость
    const totalAmount = cartItems.reduce((total, item) => {
        const priceInCurrentCurrency = item.price.find(p => p.currency === currentCurrency);
        return total + (priceInCurrentCurrency?.amount || 0) * item.quantity;
    }, 0);
    
    return (
        <div style={{ 
            border: '2px solid #007bff', 
            borderRadius: '8px', 
            padding: '20px', 
            margin: '20px',
            backgroundColor: '#f8f9fa'
        }}>
            <h2>🛒 Корзина</h2>
            
            {cartItems.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <>
                    <div>
                        {cartItems.map(item => {
                            const priceInCurrentCurrency = item.price.find(p => p.currency === currentCurrency);
                            return (
                                <div key={item.id} style={{ 
                                    padding: '10px', 
                                    border: '1px solid #ddd', 
                                    borderRadius: '4px',
                                    margin: '5px 0',
                                    backgroundColor: 'white'
                                }}>
                                    <h4>{item.title}</h4>
                                    <p>Количество: {item.quantity}</p>
                                    <p>Цена за штуку: {priceInCurrentCurrency?.amount} {currentCurrency}</p>
                                    <p><strong>Сумма: {(priceInCurrentCurrency?.amount || 0) * item.quantity} {currentCurrency}</strong></p>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
                        <h3>Общая сумма: {totalAmount} {currentCurrency}</h3>
                        <button 
                            className="btn btn-danger" 
                            onClick={clearCart}
                            style={{ marginTop: '10px' }}
                        >
                            Очистить корзину
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
