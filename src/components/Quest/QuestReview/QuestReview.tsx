import React, { useState } from "react"
import "./style.css"
import heart from "../../../assets/heart.png"
import cup from "../../../assets/cup.png"
import { Quest, Question } from "../QuestIntroPage/QuestIntroPage"

type QuestReviewProps = {
  quest: Quest
  questions: Question[]
  score: number
  onFinish: () => void
}

const QuestReview: React.FC<QuestReviewProps> = ({
                                                   quest,
                                                   questions,
                                                   score,
                                                   onFinish,
                                                 }) => {
  const [rating, setRating] = useState<number | null>(null)
  const [text, setText] = useState("")

  const handleSubmit = () => {
    const payload = {
      questId: quest.game_id,
      score,
      rating,
      review: text.trim(),
      questionsCount: questions.length,
    }

    console.log("Quest review:", payload)
    onFinish()
  }

  return (
    <div className="quest-review">
      <div className="quest-review__inner">
        <div className="quest-review__title">
          Поздравляем вас с успешным прохождением квеста «{quest.title}»!
        </div>

        <div className="quest-review__heart-wrap">
          <img className="quest-completed__img" src={heart} alt="Сердце." />
        </div>

        <div className="quest-review__score">
        </div>

        <div className="quest-review__text-wrapper">
          <div className="quest-review__text">
            Оцените, пожалуйста, наш квест.
            <br />
            Нам будет очень приятно!
          </div>
        </div>

        <div className="quest-review__input-wrap">
          <input
            className="quest-review__input"
            type="text"
            placeholder="Напишите свой отзыв о квесте"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>

        <button
          className="quest-review__button"
          onClick={handleSubmit}
          disabled={!rating && !text.trim()}
        >
          Отправить отзыв
        </button>
      </div>
    </div>
  )
}

export default QuestReview
