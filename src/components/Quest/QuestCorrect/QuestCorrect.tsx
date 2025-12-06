import React from "react";
import "./style.css";
import medal from "../../../assets/medal.png"

const QuestCorrect = () => {
  return (
    <div className="quest-correct">
      <div className="quest-correct__inner">
        <div className="quest-correct__card">
          <img className="quest-correct__img" src={medal} alt="Медаль." />

          <div className="quest-correct__title">
            Поздравляем с правильно<br />выполненным заданием!
          </div>
        </div>

        <div className="quest-correct__subtitle">
          Вы отлично справились с этой загадкой, теперь смело можете приступать к следующей.
        </div>

        <button className="quest-correct__button">
          Продолжить квест
        </button>
      </div>
    </div>
  );
};

export default QuestCorrect;