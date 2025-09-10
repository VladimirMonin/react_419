// Level 2 - Интерфейсы для пропсов

export interface ButtonProps {
    text?: string;
    color: string;
    icon?: string; // ? - необязательный пропс
    // Callback - чтобы узнать в какой карточке было нажатие
    onClick?: () => void; // ? - необязательный пропс
}

export interface CardProps {
    id: number;
    price: number;
    title: string;
    text: string;
    image: string;
    alt: string;
    onAddToCart: (id: number, title: string, price: number, quantity: number) => void;
}

export interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    totalPrice: number;
}

export interface CartProps {
    items: CartItem[];
    total: number;
}