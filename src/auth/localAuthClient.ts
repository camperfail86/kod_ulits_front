import { AuthClient, User } from "./types"

const LOCAL_AUTH_KEY = "auth_user"

const USERS: User[] = [
    { id: "1", email: "test@example.com", name: "Test User" },
]

export class LocalAuthClient implements AuthClient {
    async login(email: string, password: string): Promise<User> {
        const user = USERS.find(u => u.email === email)
        if (!user) throw new Error("Неверный логин или пароль")
        localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(user))
        return user
    }

    async logout(): Promise<void> {
        localStorage.removeItem(LOCAL_AUTH_KEY)
    }

    async getCurrentUser(): Promise<User | null> {
        const raw = localStorage.getItem(LOCAL_AUTH_KEY)
        if (!raw) return null
        try {
            return JSON.parse(raw) as User
        } catch {
            localStorage.removeItem(LOCAL_AUTH_KEY)
            return null
        }
    }
}
