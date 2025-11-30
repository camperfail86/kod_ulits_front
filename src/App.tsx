import { Route, Routes, Link } from "react-router-dom"
import { LoginPage } from "./components/LoginPage/LoginPage"
import { ProfilePage } from "./components/ProfilePage"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { useAuth } from "./auth/AuthContext"
import {ForgotPassword} from "./components/ForgotPassword/ForgotPassword";
import Registration from "./components/RegistrationAll/Registration/Registration";
import RegistrationOrganizer from "./components/RegistrationAll/RegistrationOrganizer/RegistrationOrganizer";
import RegistrationPLayer from "./components/RegistrationAll/RegistrationPlayer/RegistrationPLayer";

function App() {
    const { user } = useAuth()

    return (
        <div>
            <nav>
                <Link to="/login">Вход</Link>{" | "}
                <Link to="/forgot-password">Забытый пароль</Link>
                {user && <span style={{ marginLeft: 8 }}>({user.email})</span>}
            </nav>

            <Routes>
                <Route path="/" element={<div>Главная</div>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/registration-organizer" element={<RegistrationOrganizer/>}></Route>
                <Route path="/registration-player" element={<RegistrationPLayer/>}></Route>
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    )
}

export default App
