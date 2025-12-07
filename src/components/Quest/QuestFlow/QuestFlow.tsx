import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
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

type Screen = "task" | "hint" | "correct" | "wrong" | "result" | "review"

type LocationState = {
  quest?: Quest
  questions?: Question[]
  gameSession?: GameSession
}

const API_BASE =
  process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8080"

const QuestFlow = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { quest, questions, gameSession } =
    (location.state || {}) as LocationState

  const [usedHint, setUsedHint] = useState(false)
  const [screen, setScreen] = useState<Screen>("task")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hintsLeft, setHintsLeft] = useState(gameSession?.hints ?? 0)
  const [score, setScore] = useState(gameSession?.score ?? 0)

  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [finishTime, setFinishTime] = useState<number | null>(null)
  const [answerLoading, setAnswerLoading] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setElapsedSeconds(prev => prev + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  if (!quest || !questions || !questions.length || !gameSession) {
    return <div className="quest">Квест не найден или данные не переданы</div>
  }

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex + 1 >= questions.length

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`
  }

  const handleUseHint = () => {
    if (!currentQuestion.bool_hint || hintsLeft <= 0) return
    // локально уменьшаем, бек потом тоже может это учитывать
    setHintsLeft(prev => prev - 1)
    setUsedHint(true)
    setScreen("hint")
  }

  // const handleSubmitAnswer = async (answer: string) => {
  //   const trimmed = answer.trim()
  //   if (!trimmed) {
  //     setScreen("wrong")
  //     return
  //   }
  //
  //   setAnswerLoading(true)
  //
  //   try {
  //     const res = await fetch(`${API_BASE}/api/check_answer`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         answer: trimmed,
  //         game_session_id: gameSession.id,
  //         question_id: currentQuestion.id,
  //       }),
  //     })
  //
  //     const data = await res.json()
  //     console.log("check_answer response:", data)
  //
  //     // если бэк вернул ошибку
  //     if (!res.ok || data.success === false) {
  //       console.error("check_answer error:", data)
  //       setScreen("wrong")
  //       return
  //     }
  //
  //     // по спецификации бэка:
  //     // finished: { status, game_status: 'finished', total_score, hints, ... }
  //     // active:   { status, game_status: 'active', total_score, hints, correct, question_score, ... }
  //
  //     if (typeof data.total_score === "number") {
  //       setScore(data.total_score)
  //     }
  //     if (typeof data.hints === "number") {
  //       setHintsLeft(data.hints)
  //     }
  //
  //     if (data.game_status === "finished") {
  //       setFinishTime(elapsedSeconds)
  //       setScreen("result")
  //       return
  //     }
  //
  //     if (data.correct) {
  //       setScreen("correct")
  //     } else {
  //       setScreen("wrong")
  //     }
  //   } catch (e) {
  //     console.error("Ошибка /api/check_answer:", e)
  //     setScreen("wrong")
  //   } finally {
  //     setAnswerLoading(false)
  //   }
  // }

  const handleSubmitAnswer = async (answer: string) => {
    const trimmed = answer.trim()
    if (!trimmed) {
      setScreen("wrong")
      return
    }

    const payload = {
      answer: trimmed,
      game_session_id: gameSession.id,
      question_id: currentQuestion.id,
      end_question_bool: isLastQuestion,
      hint: usedHint,
    }

    console.log("check_answer payload:", payload)

    setAnswerLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/check_answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      console.log("check_answer response:", data)

      if (!res.ok || data.success === false) {
        setScreen("wrong")
        return
      }


      if (typeof data.total_score === "number") setScore(data.total_score)
      if (typeof data.hints === "number") setHintsLeft(data.hints)

      if (data.game_status === "finished") {
        setFinishTime(elapsedSeconds)
        setScreen("result")
        return
      }

      if (data.correct) {
        setScreen("correct")
      } else {
        setScreen("wrong")
      }
    } catch (e) {
      console.error("Ошибка /api/check_answer:", e)
      setScreen("wrong")
    } finally {
      setAnswerLoading(false)
    }
  }



  const goToNextQuestionOrResult = () => {
    if (currentIndex + 1 >= questions.length) {
      setFinishTime(prev => prev ?? elapsedSeconds)
      setScreen("result")
    } else {
      setCurrentIndex(prev => prev + 1)
      setScreen("task")
      setUsedHint(false)
    }
  }

  const handleFinishReview = () => {
    navigate("/profile")
  }

  const timeForResult = formatTime(finishTime ?? elapsedSeconds)

  return (
    <div className="quest-flow">
      {screen === "task" && (
        <QuestTask
          quest={quest}
          question={currentQuestion}
          hintsLeft={hintsLeft}
          onUseHint={handleUseHint}
          onSubmitAnswer={handleSubmitAnswer}
          // если в пропах QuestTask нет loading — просто убери эту строку
          // loading={answerLoading}
        />
      )}

      {screen === "hint" && (
        <QuestHint
          hintsLeft={hintsLeft}
          onSubmitAnswer={handleSubmitAnswer}
          onUseHint={handleUseHint}
          hintText={currentQuestion.hint ?? "Подсказка отсутствует"}
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
        <QuestResult time={timeForResult} onNext={() => setScreen("review")} />
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
