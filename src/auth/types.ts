export type User = {
    id: string
    email: string
    name: string
}

export interface AuthClient {
    login(email: string, password: string): Promise<User>
    logout(): Promise<void>
    getCurrentUser(): Promise<User | null>
}
