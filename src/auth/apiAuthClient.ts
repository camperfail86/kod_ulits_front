import { AuthClient, User } from "./types"

export class ApiAuthClient implements AuthClient {
    constructor(private baseUrl: string) {}

    async login(email: string, password: string): Promise<User> {
        const res = await fetch(`${this.baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        })
        if (!res.ok) throw new Error("Неверный логин или пароль")
        const data = await res.json()
        return data.user as User
    }

    async logout(): Promise<void> {
        await fetch(`${this.baseUrl}/auth/logout`, {
            method: "POST",
            credentials: "include",
        })
    }

    async getCurrentUser(): Promise<User | null> {
        const res = await fetch(`${this.baseUrl}/auth/me`, {
            method: "GET",
            credentials: "include",
        })
        if (!res.ok) return null
        const data = await res.json()
        return data.user as User
    }
}
