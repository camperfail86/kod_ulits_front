import { Route, Routes, Link } from "react-router-dom"
import { LoginPage } from "./components/LoginPage/LoginPage"
import ProfilePage from "./components/Profile/ProfilePage/ProfilePage"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { useAuth } from "./auth/AuthContext"
import {ForgotPassword} from "./components/ForgotPassword/ForgotPassword";
import Registration from "./components/RegistrationAll/Registration/Registration";
import RegistrationOrganizer from "./components/RegistrationAll/RegistrationOrganizer/RegistrationOrganizer";
import RegistrationPLayer from "./components/RegistrationAll/RegistrationPlayer/RegistrationPLayer";
import QuestIntroPage from "./components/Quest/QuestIntroPage/QuestIntroPage";
import QuestTask from "./components/Quest/QuestTask/QuestTask";
import QuestFlow from "./components/Quest/QuestFlow/QuestFlow";
import QuestCompleted from "./components/Quest/QuestCompleted/QuestCompleted";
import QuestResult from "./components/Quest/QuestResult/QuestResult";
import QuestReview from "./components/Quest/QuestReview/QuestReview";
import QuestCorrect from "./components/Quest/QuestCorrect/QuestCorrect";
import Start from "./components/Start/Start";

function App() {
    const { user } = useAuth()

    return (
        <div>
            <nav>
                {/*<Link to="/login">Вход</Link>{" | "}*/}
                {/*<Link to="/quest-task">Задача</Link>{" | "}*/}
                {/*<Link to="/quest-result">Результат квеста</Link>{" | "}*/}
                {/*<Link to="/quest-review">Оставьте отзыв</Link>{" | "}*/}
                {/*<Link to="/quest-intro">Прохождение квеста</Link>*/}
            </nav>

            <Routes>
                <Route path="/start" element={<Start/>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/registration-organizer" element={<RegistrationOrganizer/>}></Route>
                <Route path="/registration-player" element={<RegistrationPLayer/>}></Route>
                <Route path="/quest-intro" element={<QuestIntroPage/>}></Route>
                {/*<Route path="/quest-completed" element={<QuestCompleted/>}></Route>*/}
                {/*<Route path="/quest-task" element={<QuestTask />} />*/}
                <Route path="/quest-flow" element={<QuestFlow />} />
                {/*<Route path="/quest-result" element={<QuestResult />} />*/}
                {/*<Route path="/quest-review" element={<QuestReview/>} />*/}
                {/*<Route path="/quest-correct" element={<QuestCorrect />} />*/}
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
