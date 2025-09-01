// Lesson 5 - Знакомство с Хуком состояние в React (Смотри конспект №4)

// 1. Импортируем useState из React
import React, { useState } from 'react';

// 2. Создание функционального компонента "Кнопка с счетчиком" В точку входа у нас подлкючены BS5 и иконки и мы можем тут использовать эти классы!)

export function CounterButton() {
    // 3. Инициализация состояния с помощью useState
    // count - текущее значение состояния
    // setCount - функция для обновления состояния
    // useState(0) - начальное значение состояния (0)
    const [count, setCount] = useState(0);

    // 4. Функция для обработки клика по кнопке
    const handleClick = () => {
        // Обновляем состояние, увеличивая count на 1
        setCount(count + 1);
    }

    // 5. Создаем компонент с кнопкой и отображением счетчика
    let button = (
        <button className="btn btn-primary" onClick={handleClick}>
            <i className="bi bi-hand-thumbs-up"></i> Нравится {count}
        </button>
    );

    return button;
}

// Делаем похожую вещь. Компонент с двумя кнопками палец вверх и вниз и счетчиком лайков между ними.
export function LikeDislike() {
    const [likes, setLikes] = useState(0);

    const handleLike = () => {
        setLikes(likes + 1);
    }

    const handleDislike = () => {
        // Лайки не могут быть меньше 0
        if (likes > 0) {
            setLikes(likes - 1);
        }
        else {
            setLikes(0);
        }
    }

    return (
        <div>
            <button className="btn btn-danger" onClick={handleDislike}>
                <i className="bi bi-hand-thumbs-down"></i>
            </button>
            <span style={{ margin: '0 10px' }}>{likes}</span>
            <button className="btn btn-success" onClick={handleLike}>
                <i className="bi bi-hand-thumbs-up"></i> 
            </button>
            
        </div>
    );
}

// Посмотрим как можно работать с булевыми состояниями меняя текст кнопки через тернарник а так же показывая или скрывая блок текста по клику на кнопку (через &&)

export function ShowHideText() {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div>
            <button className="btn btn-info" onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? 'Скрыть' : 'Показать'} текст
            </button>
            {isVisible && <p>Вот и скрытый текст!</p>}
        </div>
    );
}

// Паттерн "Управяемый компонент" на примере поля ввода и перехвата ввода onChange
export function ControlledInput() {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    // Описываем функцию которая проверяет на наличие буквы "р" в поле ввода.toLowerCase() если она там есть - делаем фокус рамку bs5 danger, если нет ничего не делаем
    const hasR = inputValue.toLowerCase().includes('р');
    const inputClass = hasR ? 'form-control is-invalid' : 'form-control';

    return (
        <div>
            <input type="text" value={inputValue} onChange={handleChange} className={inputClass} placeholder="Введите текст" />
            <p>Текущий ввод: {inputValue}</p>
        </div>
    );
}


// Мы делаем следующий пример. Фильтрация списка продуктов по вводу в поле ввода.



export function ProductFilter() {
    const [filter, setFilter] = useState('');
    const allProducts = ['Яблоко', 'Банан', 'Апельсин', 'Груша', 'Персик', 'Манго', 'Киви', 'Ананас'];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    }

    // Фильтруем продукты по вводу в поле ввода. toLowerCase() для регистронезависимого поиска
    const filteredProducts = allProducts.filter(product =>
        product.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <input type="text" value={filter} onChange={handleChange} className="form-control" placeholder="Фильтр продуктов" />
            <ul className="list-group mt-2">
                {filteredProducts.map((product, index) => (
                    <li key={index} className="list-group-item">{product}</li>
                ))}
            </ul>
        </div>
    );
}