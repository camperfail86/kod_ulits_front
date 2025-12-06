import React from "react";
import "./style.css";
import cup from "../../../assets/cup.png"

const QuestCompleted = () => {
  return (
    <div className="quest-completed">
      <div className="quest-completed__inner">
        <div className="quest-completed__card">
          <img className="quest-completed__img" src={cup} alt="Кубок." />

          <div className="quest-completed__title">
            Поздравляем с правильно<br />выполненным заданием!
          </div>
        </div>

        <div className="quest-completed__subtitle">
          Вы отлично справились с последней загадкой, теперь можете узнать ваш
          результат!
        </div>

        <button className="quest-completed__button">
          Завершить квест
        </button>
      </div>
    </div>
  );
};

export default QuestCompleted;
