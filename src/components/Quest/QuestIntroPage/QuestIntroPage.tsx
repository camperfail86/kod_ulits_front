import "./style.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { gameSessionMock } from "../../../mock/mock"
import { gameSessionMockTasks } from "../../../mock/tasks"

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

export type GameSessionResponse = {
  game_session: {
    hints: number
    id: string
    registration_id: string
    score: number
    start_datetime: string
    status: string
  }
  questions_id_list: Question[]
  status: string
}

export function fetchQuests(): Promise<Quest[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(gameSessionMock.quest)
    }, 300)
  })
}

export function fetchQuestsTasks(): Promise<GameSessionResponse> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(gameSessionMockTasks)
    }, 300)
  })
}

function QuestIntroPage() {
  const [quest, setQuest] = useState<Quest | null>(null)
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [gameSession, setGameSession] =
    useState<GameSessionResponse["game_session"] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([fetchQuests(), fetchQuestsTasks()])
      .then(([questsList, tasksResponse]) => {
        setQuest(questsList[0])
        setQuestions(tasksResponse.questions_id_list)
        setGameSession(tasksResponse.game_session)
      })
      .catch(e => {
        setError(e as Error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <div className="quest">Загрузка квеста...</div>
  }

  if (error || !quest || !questions || !gameSession) {
    return <div className="quest">Ошибка загрузки квеста</div>
  }

  const handleStart = () => {
    navigate("/quest-flow", {
      state: {
        quest,
        questions,
        gameSession,
      },
    })
  }

  return (
    <div className="quest">
      <div className="quest__inner">
        <h1 className="quest__title">{quest.title}</h1>

        <div className="quest__image-wrapper">
          <div className="quest__image-placeholder" />
        </div>

        <div className="quest__image-caption__wrapper">
          <div className="quest__image-caption">Фотография квеста</div>
        </div>

        <section className="quest__section">
          <h2 className="quest__section-title">Описание квеста</h2>
          <p className="quest__text">{quest.description}</p>
        </section>

        <section className="quest__section">
          <h2 className="quest__section-title">Район проведения квеста</h2>
          <div className="quest__map-wrapper">
            <div className="quest__map-placeholder" />
          </div>
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
