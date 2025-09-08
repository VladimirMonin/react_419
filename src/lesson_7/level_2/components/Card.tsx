// Lesson 7 Level 2 - Создание карточки, которая будет использовать кнопку
import type { CardProps } from '../interfaces';
import { Button } from './Button';

export function Card({ title, text, image, alt }: CardProps) {
    return (
        <div className='card'>
            <img src={image} alt={alt} className='card-img' />
            <h2 className='card-title'>{title}</h2>
            <p className='card-text'>{text}</p>
            <Button text="Купить" color="green" />
        </div>
    );
}