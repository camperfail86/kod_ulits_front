import { useState } from "react"
import "./style.css"

type QuestHintProps = {
  hintsLeft: number
  onSubmitAnswer: (answer: string) => void
  onUseHint: () => void
  hintText?: string
}

const QuestHint = ({
                     hintsLeft,
                     onSubmitAnswer,
                     onUseHint,
                     hintText = "Текст подсказки. Сюда потом подставим question.hint.",
                   }: QuestHintProps) => {
  const [answer, setAnswer] = useState("")

  const handleSubmit = () => {
    onSubmitAnswer(answer.trim())
  }

  const handleHintClick = () => {
    if (hintsLeft <= 0) return
    onUseHint()
  }

  return (
    <div className="quest-hint">
      <div className="quest-hint__inner">
        <h1 className="quest-hint__title">Подсказка №1</h1>

        <div className="quest-hint__box">
          <p className="quest-hint__box-text">{hintText}</p>
        </div>

        <div className="quest-hint__form">
          <input
            className="quest-hint__input"
            type="text"
            placeholder="Ввести ответ"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
          />

          <button
            className="quest-hint__submit"
            onClick={handleSubmit}
          >
            Отправить ответ
          </button>

          <button
            className="quest-hint__hint"
            onClick={handleHintClick}
            disabled={hintsLeft <= 0}
          >
            Попросить ещё подсказку
            {hintsLeft >= 0 ? ` (${hintsLeft})` : ""}
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestHint
