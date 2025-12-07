import { AuthClient, User } from "./types"

export class ApiAuthClient implements AuthClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/+$/, "")
  }

  private saveTokens(data: any) {
    if (!data || !data.tokens) return
    const tokens = data.tokens
    if (tokens.access_token) {
      localStorage.setItem("access_token", tokens.access_token)
    }
    if (tokens.refresh_token) {
      localStorage.setItem("refresh_token", tokens.refresh_token)
    }
  }

  async login(email: string, password: string): Promise<User> {
    const res = await fetch(`${this.baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const json = await res.json()

    if (!res.ok || json.success === false) {
      throw new Error(json.message || "Ошибка входа")
    }

    const data = json.data
    this.saveTokens(data)
    const user = data.user as User
    localStorage.setItem("user", JSON.stringify(user))
    return user
  }

  async getCurrentUser(): Promise<User | null> {
    const raw = localStorage.getItem("user")
    if (!raw) return null
    try {
      const user = JSON.parse(raw) as User
      return user
    } catch {
      localStorage.removeItem("user")
      return null
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem("user")
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
  }
}
