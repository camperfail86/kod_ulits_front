import React from "react";
import "./style.css";
import heart from "../../../assets/heart.png"
import cup from "../../../assets/cup.png";

const QuestReview = () => {
  return (
    <div className="quest-review">
      <div className="quest-review__inner">
        <div className="quest-review__title">
          Поздравляем вас с успешным прохождением квеста!
        </div>

        <div className="quest-review__heart-wrap">
          <img className="quest-completed__img" src={heart} alt="Сердце." />
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
          />
        </div>

        <button className="quest-review__button">Отправить отзыв</button>
      </div>
    </div>
  );
};

export default QuestReview;
