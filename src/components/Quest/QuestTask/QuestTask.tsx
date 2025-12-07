import "./style.css"
import docs from "../../../assets/svg/docs.svg"
import task from "../../../assets/svg/task.svg"
import key from "../../../assets/svg/key.svg"
import { useState } from "react"
import { Quest, Question } from "../QuestIntroPage/QuestIntroPage"

type QuestTaskProps = {
  quest: Quest
  question: Question
  hintsLeft: number
  onUseHint: () => void
  onSubmitAnswer: (answer: string) => void
}

function QuestTask({
                     quest,
                     question,
                     hintsLeft,
                     onUseHint,
                     onSubmitAnswer,
                   }: QuestTaskProps) {
  const [answer, setAnswer] = useState("")

  const handleSubmit = () => {
    const value = answer.trim()
    onSubmitAnswer(value)
  }

  const handleHintClick = () => {
    if (hintsLeft <= 0) return
    onUseHint()
  }

  return (
    <div className="task-page">
      <div className="task-card">
        <h1 className="task-card__title">
          Задание: «{question.title || quest.title}»
        </h1>

        <div className="task-card__map-main">
          <div className="task-card__map" />
          <div className="task-card__map-caption">Локация</div>
        </div>

        <section className="task-section">
          <div className="task-section__icon">
            <img height={50} width={50} src={docs} alt="Документ" />
          </div>
          <div className="task-section__body">
            <h2 className="task-section__title">Легенда:</h2>
            <p className="task-section__text">
              {question.description ||
                "Привет, герой! Город приготовил для тебя новое испытание."}
            </p>
          </div>
        </section>

        <section className="task-section">
          <div className="task-section__icon">
            <img height={50} width={50} src={task} alt="Задача" />
          </div>
          <div className="task-section__body">
            <h2 className="task-section__title">Задача:</h2>
            <p className="task-section__text">
              Найди правильное место и введи код, который получится в результате
              выполнения задания.
            </p>
          </div>
        </section>

        <section className="task-section" style={{ margin: "0" }}>
        <div className="task-section__icon">
          <img height={50} width={50} src={key} alt="Ключ" />
        </div>
          <div className="task-section__body">
            <h2 className="task-section__title">Код:</h2>
            <p className="task-section__text">
              Введи код, который ты получил, выполнив задание.
            </p>
          </div>
          </section>

        <section className="task-section task-section--code">
          <div className="task-section__body">
            <section className="task-section task-section--answer">
              <div className="task-section__body task-section__body--full">
                <div className="task-answer">
                  <input
                    className="task-answer__input"
                    type="text"
                    placeholder="Введите ответ"
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                  />
                  <button
                    className="task-answer__submit"
                    onClick={handleSubmit}
                  >
                    Отправить
                  </button>
                  <button
                    className="task-answer__hint"
                    onClick={handleHintClick}
                    disabled={hintsLeft <= 0}
                  >
                    Попросить подсказку
                    {typeof hintsLeft === "number" ? ` (${hintsLeft})` : ""}
                  </button>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  )
}

export default QuestTask
