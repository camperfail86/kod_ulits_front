import { Route, Routes, Link } from "react-router-dom"
import { LoginPage } from "./components/LoginPage/LoginPage"
import ProfilePage from "./components/Profile/ProfilePage/ProfilePage"
import { ProtectedRoute } from "./components/ProtectedRoute"
import {ForgotPassword} from "./components/ForgotPassword/ForgotPassword";
import Registration from "./components/RegistrationAll/Registration/Registration";
import RegistrationOrganizer from "./components/RegistrationAll/RegistrationOrganizer/RegistrationOrganizer";
import RegistrationPLayer from "./components/RegistrationAll/RegistrationPlayer/RegistrationPLayer";
import QuestIntroPage from "./components/Quest/QuestIntroPage/QuestIntroPage";
import QuestFlow from "./components/Quest/QuestFlow/QuestFlow";
import Start from "./components/Start/Start";

function App() {
    return (
        <div>
            <nav>
            </nav>

            <Routes>
                <Route path="/" element={<Start/>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/registration-organizer" element={<RegistrationOrganizer/>}></Route>
                <Route path="/registration-player" element={<RegistrationPLayer/>}></Route>
                <Route path="/quest-intro" element={<QuestIntroPage/>}></Route>
                <Route path="/quest-flow" element={<QuestFlow />} />
                <Route path="/quest/:id" element={<QuestIntroPage />} />
                <Route path="/quest/:id/flow" element={<QuestFlow />} />
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
