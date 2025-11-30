import { ReactElement } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"

type ProtectedRouteProps = {
    children: ReactElement
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading } = useAuth()

    if (loading) return <div>Загрузка...</div>
    if (!user) return <Navigate to="/login" replace />

    return children
}
