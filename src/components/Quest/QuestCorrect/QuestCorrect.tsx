import React from "react"
import "./style.css"
import medal from "../../../assets/medal.png"
import { Question } from "../QuestIntroPage/QuestIntroPage"

type QuestCorrectProps = {
  question: Question
  score: number
  onNext: () => void
}

const QuestCorrect: React.FC<QuestCorrectProps> = ({
                                                     question,
                                                     score,
                                                     onNext,
                                                   }) => {
  return (
    <div className="quest-correct">
      <div className="quest-correct__inner">
        <div className="quest-correct__card">
          <img className="quest-correct__img" src={medal} alt="Медаль." />

          <div className="quest-correct__title">
            Поздравляем с правильно
            <br />
            выполненным заданием!
          </div>
        </div>

        <div className="quest-correct__subtitle">
          Вы отлично справились с загадкой «{question.title}». <br />
        </div>

        <button className="quest-correct__button" onClick={onNext}>
          Продолжить квест
        </button>
      </div>
    </div>
  )
}

export default QuestCorrect
