import "./style.css"
import { useLocation, useNavigate, useParams } from "react-router-dom"

export type Quest = {
  avatar: string | null
  description: string
  difficulty: string
  duration: number
  end_datetime: string | null
  game_id: string
  genre: string
  is_active: boolean
  location: string
  max_members: number
  organizer: string
  start_datetime: string
  title: string
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
  questions?: Question[]
  gameSession?: GameSession
}

function QuestIntroPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { quest, questions, gameSession } = (location.state || {}) as LocationState

  if (!quest) {
    return <div className="quest">Квест не найден или данные не переданы</div>
  }

  const handleStart = () => {
    navigate(`/quest/${id}/flow`, {
      state: {
        quest,
        questions,
        gameSession,
      },
    })
  }

  const imageUrl =
    quest.avatar ||
    (Array.isArray(questions) && questions[0]?.image_url) ||
    null

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

        <div className="quest__button-wrapper">
          <button onClick={handleStart} className="quest__start-button">
            Начать прохождение квеста
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestIntroPage
