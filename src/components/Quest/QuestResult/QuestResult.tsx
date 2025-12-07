import "./style.css"

type QuestResultProps = {
  time: string
  onNext: () => void
}

const QuestResult = ({ time, onNext }: QuestResultProps) => {
  return (
    <div className="quest-result">
      <div className="quest-result__inner">
        <div className="quest-result__title">
          Результат прохождения квеста
        </div>

        <div className="quest-result__time-wrapper">
          <div className="quest-result__time-box">
            <span className="quest-result__time">{time}</span>
          </div>
        </div>

        <button className="quest-result__button" onClick={onNext}>
          Оценить квест
        </button>
      </div>
    </div>
  )
}

export default QuestResult
