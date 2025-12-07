import { useState } from "react"
import "./style.css"
import wrongIcon from "../../../assets/krest.svg"

type QuestWrongProps = {
  hintsLeft: number
  onSubmitAnswer: (answer: string) => void
  onUseHint: () => void
}

const QuestWrong = ({ hintsLeft, onSubmitAnswer, onUseHint }: QuestWrongProps) => {
  const [answer, setAnswer] = useState("")

  const handleSubmit = () => {
    onSubmitAnswer(answer.trim())
  }

  const handleHintClick = () => {
    if (hintsLeft <= 0) return
    onUseHint()
  }

  return (
    <div className="quest-wrong">
      <div className="quest-wrong__inner">
        <div className="quest-wrong__icon-wrap">
          <div className="quest-wrong__icon-bg">
            <img src={wrongIcon} alt="Неверный ответ" className="quest-wrong__icon" />
          </div>
        </div>

        <p className="quest-wrong__text">
          Вы ввели неправильный ответ, попробуйте ещё раз!
          Или вы можете воспользоваться подсказкой.
        </p>

        <div className="quest-wrong__form">
          <input
            className="quest-wrong__input"
            type="text"
            placeholder="Введите ответ"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
          />

          <button
            className="quest-wrong__submit"
            onClick={handleSubmit}
          >
            Отправить ответ
          </button>

          <button
            className="quest-wrong__hint"
            onClick={handleHintClick}
            disabled={hintsLeft <= 0}
          >
            Попросить подсказку{hintsLeft >= 0 ? ` (${hintsLeft})` : ""}
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestWrong
