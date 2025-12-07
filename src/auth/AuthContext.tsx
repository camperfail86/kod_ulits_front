import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react"
import { AuthClient, User } from "./types"

type AuthContextValue = {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

type AuthProviderProps = {
    client: AuthClient
    children: ReactNode
}

export function AuthProvider({ client, children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    client
      .getCurrentUser()
      .then(u => {
        if (active) setUser(u)
      })
      .catch(err => {
        console.error("getCurrentUser error:", err)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [client])

    const handleLogin = async (email: string, password: string) => {
        const u = await client.login(email, password)
        setUser(u)
    }

    const handleLogout = async () => {
        await client.logout()
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{ user, loading, login: handleLogin, logout: handleLogout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used within AuthProvider")
    return ctx
}
