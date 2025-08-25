// lesson_3.tsx
// Пример однонаправленного потока данных в React

// Интерфейс для пропса
interface UserAvatarProps {
    src: string;
    alt: string;
}


// Дочерний компонент принимает props
export function UserAvatar(props: UserAvatarProps) {
    return(
        <div>
            {/* Используем данные props */}
            <img src={props.src} alt={props.alt} style={{ width:100, height:100, borderRadius: "50"}} />
        </div>
    )
}

// Родительский компонент который передает props
export function UserProfile() {
    const UserData = {
        altText: "Аватар Пользователя",
        avatarUrl: "https://i.pravatar.cc/150"
    }

    return(
        <div>
            <h1>Профиль Пользователя</h1>
            {/* Передаем данные в дочерний компонент через props */}
            <UserAvatar src={UserData.avatarUrl} alt={UserData.altText}/>
        </div>
    )}