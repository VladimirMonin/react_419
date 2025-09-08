// Lesson 7 Level 2
import type { ButtonProps } from '../interfaces';

// { text, color }: ButtonProps) - деструктуризация пропсов с указанием типа
// (bntProps: ButtonProps) - Простой способ указания типа пропсов без деструктуризации
export function Button({ text, color, onClick }: ButtonProps) {
    
    return (
        <button
            style={{ backgroundColor: color, padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            onClick={onClick}
        >
            {text}
        </button>
    );
}