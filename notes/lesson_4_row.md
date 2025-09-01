УРОК №4
ПРИМЕР №4.1
ФАЙЛ: `src/components/Counter.tsx`
КОММЕНТАРИЙ: Создаем "с нуля" самый базовый интерактивный компонент. Демонстрируем импорт `useState`, инициализацию числового состояния, отображение значения в JSX и его обновление через функцию-сеттер в обработчике `onClick`.

```tsx
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', textAlign: 'center' }}>
      <h1>Счетчик: {count}</h1>
      <button onClick={handleIncrement} style={{ marginRight: '8px' }}>+</button>
      <button onClick={handleDecrement}>-</button>
    </div>
  );
}
```

---

ПРИМЕР №4.2
ФАЙЛ: `src/components/Toggler.tsx`
КОММЕНТАРИЙ: Переходим к булеву типу данных. Создаем новый компонент, который по клику на кнопку показывает или скрывает текстовый блок. Здесь мы фокусируемся на условном рендеринге с помощью логического оператора `&&` и инвертировании состояния (`!prevState`).

```tsx
import { useState } from 'react';

export function Toggler() {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px' }}>
      <button onClick={handleToggle}>Показать/Скрыть</button>
      {isVisible && (
        <div style={{ marginTop: '16px', background: '#f0f0f0', padding: '8px' }}>
          <p>Этот текст можно скрыть!</p>
        </div>
      )}
    </div>
  );
}
```

-----

ПРИМЕР №4.3
ФАЙЛ: `src/components/Toggler.tsx`
КОММЕНТАРИЙ: Мы изменяем пример №4.2 из текущего урока. Добавляем в кнопку тернарный оператор, чтобы ее текст динамически менялся (`'Скрыть'` / `'Показать'`) в зависимости от текущего состояния. Это показывает, как одна переменная состояния может управлять несколькими частями интерфейса.

```tsx
import { useState } from 'react';

export function Toggler() {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px' }}>
      <button onClick={handleToggle}>
        {isVisible ? 'Скрыть' : 'Показать'}
      </button>
      {isVisible && (
        <div style={{ marginTop: '16px', background: '#f0f0f0', padding: '8px' }}>
          <p>Этот текст можно скрыть!</p>
        </div>
      )}
    </div>
  );
}
```

---
ПРИМЕР №4.4
ФАЙЛ: `src/components/ControlledInput.tsx`
КОММЕНТАРИЙ: Иллюстрируем важнейший паттерн "управляемый компонент". Создаем `<input>`, чье `value` жестко привязано к состоянию, а `onChange` обновляет это состояние. Под инпутом выводим текущее значение state, чтобы наглядно показать "единый источник правды".

```tsx
import { useState, ChangeEvent } from 'react';

export function ControlledInput() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px' }}>
      <label htmlFor="text-input">Введите текст:</label>
      <input
        id="text-input"
        type="text"
        value={inputValue}
        onChange={handleChange}
        style={{ marginLeft: '8px' }}
      />
      <p style={{ marginTop: '16px', background: '#f0f0f0', padding: '8px' }}>
        Текущее значение в состоянии: <strong>{inputValue}</strong>
      </p>
    </div>
  );
}
```

---

ПРИМЕР №4.5
ФАЙЛ: `src/components/ProfileForm.tsx`
КОММЕНТАРИЙ: Создаем простую форму профиля пользователя с двумя полями. Состояние будет хранить объект `{ firstName: '', lastName: '' }`. Демонстрируем правильное, иммутабельное обновление одного поля объекта с помощью spread-оператора (`...prevUser`), чтобы сохранить старые данные и перезаписать только измененное поле.

```tsx
import { useState, ChangeEvent } from 'react';

export function ProfileForm() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px' }}>
      <form>
        <div style={{ marginBottom: '8px' }}>
          <label>
            Имя:
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              style={{ marginLeft: '8px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label>
            Фамилия:
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              style={{ marginLeft: '8px' }}
            />
          </label>
        </div>
      </form>
      <div style={{ marginTop: '16px', background: '#f0f0f0', padding: '8px' }}>
        <p>Объект состояния:</p>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}
```

---

ПРИМЕР №4.6
ФАЙЛ: `src/pages/ProductPage.tsx`
КОММЕНТАРИЙ: Готовим основу для финального воркшопа. Создаем компонент `ProductPage`, который рендерит статичный список товаров. Данные и все необходимые дочерние компоненты (`CardWrapper`, `Button`, `ProductCard`) определены в одном файле для простоты примера. На этом этапе состояние еще не используется.

```tsx
import React from 'react';

// --- Вспомогательные компоненты (из Урока 3) ---

interface CardWrapperProps {
  children: React.ReactNode;
}

function CardWrapper({ children }: CardWrapperProps) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: '250px'
    }}>
      {children}
    </div>
  );
}

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

function Button({ onClick, children }: ButtonProps) {
    return (
        <button onClick={onClick} style={{ width: '100%', padding: '8px', cursor: 'pointer' }}>
            {children}
        </button>
    );
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        console.log(`Товар ${product.name} (ID: ${product.id}) добавлен в корзину.`);
    };

    return (
        <CardWrapper>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h3 style={{ margin: '8px 0' }}>{product.name}</h3>
            <p style={{ margin: '0 0 12px 0', fontWeight: 'bold' }}>{product.price} руб.</p>
            <Button onClick={handleAddToCart}>В корзину</Button>
        </CardWrapper>
    );
}

// --- Данные ---

const allProducts: Product[] = [
  { id: 1, name: 'Ноутбук', price: 85000, image: '[https://i.pravatar.cc/300?u=1](https://i.pravatar.cc/300?u=1)' },
  { id: 2, name: 'Смартфон', price: 60000, image: '[https://i.pravatar.cc/300?u=2](https://i.pravatar.cc/300?u=2)' },
  { id: 3, name: 'Наушники', price: 12000, image: '[https://i.pravatar.cc/300?u=3](https://i.pravatar.cc/300?u=3)' },
  { id: 4, name: 'Умные часы', price: 25000, image: '[https://i.pravatar.cc/300?u=4](https://i.pravatar.cc/300?u=4)' },
  { id: 5, name: 'Клавиатура', price: 7000, image: '[https://i.pravatar.cc/300?u=5](https://i.pravatar.cc/300?u=5)' },
];

// --- Основной компонент страницы ---

export function ProductPage() {
  return (
    <div>
      <h1>Каталог товаров</h1>
      <input
        type="text"
        placeholder="Найти товар..."
        style={{ padding: '8px', margin: '8px', width: 'calc(100% - 32px)' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {allProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

---

ПРИМЕР №4.7
ФАЙЛ: `src/pages/ProductPage.tsx`
КОММЕНТАРИЙ: Модифицируем пример №4.6. Добавляем `useState` для хранения поискового запроса. Поле ввода становится управляемым. Перед рендерингом списка мы создаем новый, отфильтрованный массив товаров на основе текущего состояния `searchQuery` и отображаем именно его.

```tsx
import React, { useState, ChangeEvent } from 'react';

// --- Вспомогательные компоненты (из Урока 3) ---

interface CardWrapperProps {
  children: React.ReactNode;
}

function CardWrapper({ children }: CardWrapperProps) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: '250px'
    }}>
      {children}
    </div>
  );
}

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

function Button({ onClick, children }: ButtonProps) {
    return (
        <button onClick={onClick} style={{ width: '100%', padding: '8px', cursor: 'pointer' }}>
            {children}
        </button>
    );
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        console.log(`Товар ${product.name} (ID: ${product.id}) добавлен в корзину.`);
    };

    return (
        <CardWrapper>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h3 style={{ margin: '8px 0' }}>{product.name}</h3>
            <p style={{ margin: '0 0 12px 0', fontWeight: 'bold' }}>{product.price} руб.</p>
            <Button onClick={handleAddToCart}>В корзину</Button>
        </CardWrapper>
    );
}

// --- Данные ---

const allProducts: Product[] = [
  { id: 1, name: 'Ноутбук', price: 85000, image: '[https://i.pravatar.cc/300?u=1](https://i.pravatar.cc/300?u=1)' },
  { id: 2, name: 'Смартфон', price: 60000, image: '[https://i.pravatar.cc/300?u=2](https://i.pravatar.cc/300?u=2)' },
  { id: 3, name: 'Наушники', price: 12000, image: '[https://i.pravatar.cc/300?u=3](https://i.pravatar.cc/300?u=3)' },
  { id: 4, name: 'Умные часы', price: 25000, image: '[https://i.pravatar.cc/300?u=4](https://i.pravatar.cc/300?u=4)' },
  { id: 5, name: 'Клавиатура', price: 7000, image: '[https://i.pravatar.cc/300?u=5](https://i.pravatar.cc/300?u=5)' },
];

// --- Основной компонент страницы ---

export function ProductPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Каталог товаров</h1>
      <input
        type="text"
        placeholder="Найти товар..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ padding: '8px', margin: '8px', width: 'calc(100% - 32px)' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```
