// lesson 7 level 1 - Все в одном компоненте

import React, { useState } from 'react';

export function AppLevel1() {
  const [count, setCount] = useState(0);

    return (
    <div>
        <h1>Счетчик: {count}</h1>
        <button onClick={() => setCount(count + 1)} style={{ backgroundColor: 'lightgreen', padding: '10px', marginRight: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Увеличить</button>
        <button onClick={() => setCount(count - 1)} className="btn-level-1">Уменьшить</button>
    </div>
    );
}

// Управляемый компонент - поле ввода
export function ControlledInputLevel1() {
    const [inputValue, setInputValue] = useState('');

const emojiMapping = {
        // Русский алфавит
        "а": "🍎", // арбуз
        "б": "🍌", // банан
        "в": "🍇", // виноград
        "г": "🍄", // гриб
        "д": "🏠", // дом
        "е": "🦔", // ёж
        "ё": "🦔", // ёж
        "ж": "🪲", // жук
        "з": "🦓", // зебра
        "и": "🎯", // игра
        "й": "🧸", // йо-йо
        "к": "🐱", // кот
        "л": "🦁", // лев
        "м": "🐭", // мышь
        "н": "🦏", // носорог
        "о": "🍊", // апельсин
        "п": "🐧", // пингвин
        "р": "🐟", // рыба
        "с": "🐘", // слон
        "т": "🐅", // тигр
        "у": "🦆", // утка
        "ф": "🦩", // фламинго
        "х": "🍞", // хлеб
        "ц": "🌸", // цветок
        "ч": "🫖", // чайник
        "ш": "🧸", // шар
        "щ": "🪥", // щётка
        "ъ": "🔤", // твёрдый знак
        "ы": "🧀", // сыр
        "ь": "🔤", // мягкий знак
        "э": "⚡", // электричество
        "ю": "🌀", // юла
        "я": "🥚", // яйцо
        
        // Английский алфавит
        "a": "🍎", // apple
        "b": "🍌", // banana
        "c": "🐱", // cat
        "d": "🐕", // dog
        "e": "🐘", // elephant
        "f": "🐸", // frog
        "g": "🍇", // grapes
        "h": "🏠", // house
        "i": "🍦", // ice cream
        "j": "🕹️", // joystick
        "k": "🔑", // key
        "l": "🦁", // lion
        "m": "🐭", // mouse
        "n": "🌙", // night
        "o": "🍊", // orange
        "p": "🐧", // penguin
        "q": "👑", // queen
        "r": "🌈", // rainbow
        "s": "⭐", // star
        "t": "🐅", // tiger
        "u": "☂️", // umbrella
        "v": "🌋", // volcano
        "w": "🐋", // whale
        "x": "❌", // x-mark
        "y": "💛", // yellow
        "z": "🦓", // zebra
    }

    const mappedValue = inputValue.split('').map(char => emojiMapping[char.toLowerCase()] || char).join('');

    if (mappedValue !== inputValue) {
        setInputValue(mappedValue);
    }
    return (
        <div style={{ marginTop: '20px' }}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введите текст"
                className="form-control"
            />
            <p>Вы ввели: {inputValue}</p>
        </div>
    );
}