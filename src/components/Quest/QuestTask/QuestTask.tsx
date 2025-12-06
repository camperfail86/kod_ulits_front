import "./style.css"
import docs from "../../../assets/svg/docs.svg"
import task from "../../../assets/svg/task.svg"
import key from "../../../assets/svg/key.svg"
import { useLocation } from "react-router-dom";
import {
  GameSessionResponse,
  Quest,
  Question,
} from "../QuestIntroPage/QuestIntroPage";


function QuestTask() {
  // const location = useLocation()
  // const { quest, questions, gameSession } = location.state as {
  //   quest: Quest
  //   questions: Question[]
  //   gameSession: GameSessionResponse["game_session"]
  // }

  return (
    <div className="task-page">
      <div className="task-card">
        <h1 className="task-card__title">
          Задание №1: «Тайна петербургских дворов»
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
              Привет, Герой! Уже слышишь эти аккорды? Это город зовет тебя.
              Такой разный и такой загадочный. Но у нас мало времени!
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
              Найти двор, который соединяется с тремя разными улицами. Участникам
              нужно:
            </p>
            <ol className="task-section__list">
              <li>Найти правильный двор (по описанию в предыдущей загадке).</li>
              <li>
                Посчитать количество арок/входов, ведущих в этот двор с улиц.
              </li>
            </ol>
          </div>
        </section>

        <section className="task-section task-section--code">
          <div className="task-section__icon">
            <img height={50} width={50} src={key} alt="Ключ" />
          </div>
          <div className="task-section__body">
            <h2 className="task-section__title">Код:</h2>
            <p className="task-section__text">
              Полученное число арок будет являться кодом, который откроет вам
              подсказку к следующей загадке. Удачи!
            </p>

            <div className="task-code">
              <input
                className="task-code__input"
                type="text"
                placeholder="Введите код"
              />
              <button className="task-code__button">Ввести код</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default QuestTask;
