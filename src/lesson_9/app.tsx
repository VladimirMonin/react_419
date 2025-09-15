// App tsx для урока 9
import React from 'react';
import { ProductCard, products, CurrencyContext } from './lesson_9_1';
// Соберем все

export function App() {
    // Состояние - выбранная валюта
    const [selectedCurrency, setSelectedCurrency] = React.useState('USD');

    // Селект с выбором валюты
    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(e.target.value);
    };

    // Объект для контекста. Можно строкой, но передача сеттера позволяет внутри менять состояние. Т.е. двухсторонняя связь!
    const currencyContextValue = {
        currency: selectedCurrency,
        setCurrency: setSelectedCurrency
    };

    return (
        // Радиовышка. Всем кто внутри - транслируем выбранную валюту
        <CurrencyContext.Provider value={currencyContextValue}>
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
            </div>
        </CurrencyContext.Provider>
    );
}