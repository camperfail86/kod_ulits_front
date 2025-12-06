// QuestResult.jsx
import React from "react";
import "./style.css";

const QuestResult = ({ time } : any) => {
  time = "58:00" // хардкод
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

        <button className="quest-result__button">Оценить квест</button>
      </div>
    </div>
  );
};

export default QuestResult;
