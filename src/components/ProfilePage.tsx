import { useAuth } from "../auth/AuthContext"

export function ProfilePage() {
    const { user, logout } = useAuth()

    if (!user) return null

    return (
        <div>
            <h1>Профиль</h1>
            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
            <p>Имя: {user.name}</p>
            <button onClick={logout}>Выйти</button>
        </div>
    )
}
