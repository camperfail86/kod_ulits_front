import { createContext, useContext, useState, ReactNode } from "react"

type User = {
  id: string
  email: string
  username: string
  role: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (params: { email: string; password: string; name: string }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_URL = "http://127.0.0.1:8080"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const handleAuthSuccess = (data: any) => {
    setUser(data.user)
    localStorage.setItem("access_token", data.tokens.access_token)
    localStorage.setItem("refresh_token", data.tokens.refresh_token)
  }

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Ошибка входа")
      }
      handleAuthSuccess(json.data)
    } finally {
      setLoading(false)
    }
  }

  const register = async ({
                            email,
                            password,
                            name,
                          }: {
    email: string
    password: string
    name: string
  }) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          confirm_password: password,
          name,
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Ошибка регистрации")
      }
      handleAuthSuccess(json.data)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
