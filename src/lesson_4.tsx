// Lesson 4. Разные способы работы с Props 
// Props - это то что принимает компонент на вход
import {printHello, cosoleLogHello} from './lesson_4'

export function SimpleButton(text: string) {
    return (
        <button>{text}</button>
    )}

export function SimpleButton2(props: {text: string}) {
    return (
        <button>{props.text}</button>
        
    )}


interface SimpleButtonProps {
    text: string
    
}

export function SimpleButton3 ({text} : SimpleButtonProps) {
    return (
        <button>{text}</button>
    )
}

export const products = ["Бананы", "Апельсины", "Ананасы", "Коньяк"]

export function ShopListItem({product}: {product: string}) {
    return (
        <li>{product}</li>
        
    )
    
}

export function ShopListComponent({productList}: {productList: string[]}) {
    return (
        <ul className="productList">
            {productList.map((product, index) => (
                <ShopListItem key={index} product={product} />))}
        </ul>)}


// Основные цвета BS5 - dark, warning, danger, ifno, primary, success

// ButtonProps
// color: string
// icon: string
// title: string
// btnType: string 

export type BSColors = "dark" | "warning" | "danger" | "info" | "primary" | "success"


export interface ButtonProps {
    BGcolor: BSColors
    textColor: BSColors
    icon: string
    title: string
    btnType: "textButton" | "iconButton"
    onClick: () => void

}

export function StandartButton(props: ButtonProps) {
    let content;
    if (props.btnType === "textButton") {
        content = props.title
        
    } else {
        content = <i className={`bi bi-${props.icon}`}></i>
        
    }
    return (
        <button onClick={props.onClick} className={`btn btn-${props.BGcolor} text-${props.textColor}`}>
            {content}
        </button>
        
    )}

// Группа кнопок в BS5 базовой карточки из документации https://bootstrap-5.ru/docs/5.3/components/card/
export function SipmpleButtonsGroup(){
    return (
<div className="card">
    <div className="card-body">
        <h5 className="card-title">Набор кнопок</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">На самом деле это один компонент кнопки!</h6>
        <p className="card-text">Небольшой пример переиспользуемости компонента <code>StandartButton</code> с разными параметрами <code>Props</code></p>
        
        {/* Контейнер для кнопок с flex выравниванием BS5 классами */}

        <div className="d-flex gap-2 flex-wrap justify-content-center">
            <StandartButton BGcolor="dark" icon="eye-fill" title="Посмотреть" btnType="iconButton" textColor="danger" onClick={printHello}/>
            <StandartButton BGcolor="warning" icon="basket-fill" title="Добавить в корзину" btnType="iconButton" textColor="" onClick={printHello}/>
            <StandartButton BGcolor="danger" icon="heart-fill" title="Отложить в избранное" btnType="iconButton" textColor="" onClick={printHello}/>
            <StandartButton BGcolor="info" icon="share" title="Поделится" btnType="iconButton" textColor="dark" onClick={printHello}/>
            <StandartButton BGcolor="dark" icon="eye-fill" title="Посмотреть" btnType="textButton" textColor="danger" onClick={printHello}/>
        </div>

        {/* <StandartButton color="dark" icon="shop" title="Купить хлебушек" btnType="iconButton"/> */}
   
    </div>
</div>
    )
}