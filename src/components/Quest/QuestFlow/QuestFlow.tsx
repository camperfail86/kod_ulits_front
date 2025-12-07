import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import "./style.css"
import {
  Quest,
  Question,
  GameSession,
} from "../QuestIntroPage/QuestIntroPage"
import QuestTask from "../QuestTask/QuestTask"
import QuestHint from "../QuestHint/QuestHint"
import QuestCorrect from "../QuestCorrect/QuestCorrect"
import QuestWrong from "../QuestWrong/QuestWrong"
import QuestResult from "../QuestResult/QuestResult"
import QuestReview from "../QuestReview/QuestReview"
import { checkAnswerMock } from "../../../mock/checkAnswerMock"
import { gameSessionMock } from "../../../mock/mock"
import { gameSessionMockTasks } from "../../../mock/tasks"

type Screen = "task" | "hint" | "correct" | "wrong" | "result" | "review"

type LocationState = {
  quest?: Quest
  questions?: Question[]
  gameSession?: GameSession
}

const QuestFlow = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const state = (location.state || {}) as LocationState

  const quest: Quest = state.quest ?? gameSessionMock.quest[0]
  const questions: Question[] =
    state.questions ?? gameSessionMockTasks.questions_id_list
  const gameSession: GameSession =
    state.gameSession ?? gameSessionMockTasks.game_session

  const initialHints =
    gameSession.hints && gameSession.hints > 0 ? gameSession.hints : 3

  // ───────── ВСЕ хуки — БЕЗ условий, до любых return ─────────
  const [screen, setScreen] = useState<Screen>("task")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hintsLeft, setHintsLeft] = useState(initialHints)
  const [score, setScore] = useState(gameSession.score)
  // ────────────────────────────────────────────────────────────

  if (!questions || questions.length === 0) {
    return <div className="quest">Для этого квеста нет вопросов</div>
  }

  const currentQuestion = questions[currentIndex] ?? questions[0]
  const isLastQuestion = currentIndex + 1 >= questions.length

  const handleUseHint = () => {
    if (hintsLeft <= 0) return
    setHintsLeft(prev => prev - 1)
    setScreen("hint")
  }

  const handleSubmitAnswer = async (answer: string) => {
    if (!answer.trim()) {
      setScreen("wrong")
      return
    }

    const result = await checkAnswerMock(
      answer,
      currentQuestion,
      score,
      isLastQuestion
    )

    if (result.game_status === "finished") {
      setScore(result.total_score)
      setScreen("result")
      return
    }

    setScore(result.total_score)

    if (result.correct) {
      setScreen("correct")
    } else {
      setScreen("wrong")
    }
  }

  const goToNextQuestionOrResult = () => {
    if (currentIndex + 1 >= questions.length) {
      setScreen("result")
    } else {
      setCurrentIndex(prev => prev + 1)
      setScreen("task")
    }
  }

  const handleFinishReview = () => {
    navigate("/profile")
  }

  return (
    <div className="quest-flow">
      {screen === "task" && (
        <QuestTask
          quest={quest}
          question={currentQuestion}
          hintsLeft={hintsLeft}
          onUseHint={handleUseHint}
          onSubmitAnswer={handleSubmitAnswer}
        />
      )}

      {screen === "hint" && (
        <QuestHint
          hintsLeft={hintsLeft}
          onSubmitAnswer={handleSubmitAnswer}
          onUseHint={handleUseHint}
          hintText={
            currentQuestion.hint ||
            "Подсказка скоро появится, а пока попробуй прикинуть сам 🙂"
          }
        />
      )}

      {screen === "correct" && (
        <QuestCorrect
          question={currentQuestion}
          score={score}
          onNext={goToNextQuestionOrResult}
        />
      )}

      {screen === "wrong" && (
        <QuestWrong
          hintsLeft={hintsLeft}
          onSubmitAnswer={handleSubmitAnswer}
          onUseHint={handleUseHint}
        />
      )}

      {screen === "result" && (
        <QuestResult time="58:00" onNext={() => setScreen("review")} />
      )}

      {screen === "review" && (
        <QuestReview
          quest={quest}
          questions={questions}
          score={score}
          onFinish={handleFinishReview}
        />
      )}
    </div>
  )
}

export default QuestFlow
