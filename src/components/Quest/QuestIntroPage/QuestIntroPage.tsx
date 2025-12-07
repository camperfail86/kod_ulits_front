import "./style.css"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useState } from "react"

export type Quest = {
  avatar?: string | null
  description: string
  difficulty?: string
  duration?: number
  end_datetime?: string | null
  game_id?: string
  genre?: string
  is_active?: boolean
  location: string
  max_members?: number
  organizer?: string
  start_datetime?: string
  title: string
  id?: string
}

export type Question = {
  bool_hint: boolean
  description: string
  game_id: string
  hint: string | null
  id: string
  image_url: string | null
  penalty: number
  score: number
  title: string
}

export type GameSession = {
  hints: number
  id: string
  registration_id: string
  score: number
  start_datetime: string
  status: string
}

type LocationState = {
  quest?: Quest
}

const API_BASE =
  process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8080"

function QuestIntroPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { quest } = (location.state || {}) as LocationState

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!quest) {
    return <div className="quest">Квест не найден или данные не переданы</div>
  }

  const handleStart = async () => {
    try {
      setLoading(true)
      setError(null)

      // 1. Регистрируем команду на игру
      const regRes = await fetch(`${API_BASE}/api/post_registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game_name: quest.title,
          // бэк теперь сам создаёт команду, если её нет
          team_name: "Моя команда",
        }),
      })

      const regJson = await regRes.json()

      if (!regRes.ok || regJson.success === false) {
        throw new Error(regJson.message || "Не удалось зарегистрировать команду")
      }

      const registrationId: string | undefined = regJson.registration_id
      if (!registrationId) {
        throw new Error("registration_id не вернулся с /api/post_registration")
      }

      // 2. Стартуем игру и получаем сессию + вопросы
      const startRes = await fetch(`${API_BASE}/api/start_game`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registration_id: registrationId }),
      })

      const startJson = await startRes.json()

      if (!startRes.ok || startJson.success === false) {
        throw new Error(startJson.message || "Не удалось начать игру")
      }

      const gs = startJson.game_session
      const questions: Question[] = startJson.questions_id_list || []

      if (!gs || !questions.length) {
        throw new Error("Не удалось получить вопросы квеста")
      }

      const gameSession: GameSession = {
        id: gs.id,
        hints: gs.hints,
        score: gs.score,
        status: gs.status,
        start_datetime: gs.start_datetime,
        registration_id: gs.registration_id,
      }

      // 3. Переходим в QuestFlow с реальными данными с бэка
      navigate(`/quest/${id}/flow`, {
        state: {
          quest,
          questions,
          gameSession,
        },
      })
    } catch (e: any) {
      console.error("Ошибка запуска квеста:", e)
      setError(e.message || "Ошибка запуска квеста")
    } finally {
      setLoading(false)
    }
  }

  const imageUrl = quest.avatar || null

  return (
    <div className="quest">
      <div className="quest__inner">
        <h1 className="quest__title">{quest.title}</h1>

        <div className="quest__image-wrapper">
          {imageUrl ? (
            <img src={imageUrl} alt={quest.title} className="quest__image" />
          ) : (
            <div className="quest__image-placeholder" />
          )}
        </div>

        <div className="quest__image-caption__wrapper">
          <div className="quest__image-caption">Фотография квеста</div>
        </div>

        <section className="quest__section">
          <h2 className="quest__section-title">Описание квеста</h2>
          <p className="quest__text">{quest.description}</p>
        </section>

        {error && <div className="quest__error">{error}</div>}

        <div className="quest__button-wrapper">
          <button
            onClick={handleStart}
            className="quest__start-button"
            disabled={loading}
          >
            {loading ? "Запуск квеста..." : "Начать прохождение квеста"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestIntroPage
