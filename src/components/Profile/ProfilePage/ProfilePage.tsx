import React, { useState } from "react"
import "./style.css"
import user from "../../../assets/person.svg"
import user_l from "../../../assets/user_light.svg"
import stg from "../../../assets/settings.svg"
import exit from "../../../assets/logout.svg"
import { useNavigate } from "react-router-dom"
import { Quest } from "../../Quest/questTypes";

const MOCK_QUESTS: Quest[] = [
  {
    id: "1",
    title: "Ночной Петербург",
    description: "Квест по самым атмосферным местам города.",
    location: "Санкт-Петербург",
    difficulty: "Средний",
    duration: 90,
    price: "1200 ₽",
  },
  {
    id: "2",
    title: "Код Васильевского острова",
    description: "Маршрут по набережным и скрытым дворикам.",
    location: "В.О.",
    difficulty: "Лёгкий",
    duration: 60,
    price: "900 ₽",
  },
  {
    id: "3",
    title: "Тайна стрелки",
    description: "История Ростральных колонн и окрестностей.",
    location: "Стрелка ВО",
    difficulty: "Сложный",
    duration: 120,
    price: "1500 ₽",
  },
]

const ProfilePage = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const navigate = useNavigate()

  const handleLogout = async () => {
    setMenuOpen(false)
    navigate("/login")
  }

  const handleNext = () => {
    if (MOCK_QUESTS.length <= 2) return
    setIndex(prev => {
      const next = prev + 2
      return next >= MOCK_QUESTS.length ? 0 : next
    })
  }

  const handlePrev = () => {
    if (MOCK_QUESTS.length <= 2) return
    setIndex(prev => {
      const next = prev - 2
      return next < 0 ? Math.max(MOCK_QUESTS.length - 2, 0) : next
    })
  }

  const visibleQuests =
    MOCK_QUESTS.length <= 2
      ? MOCK_QUESTS
      : MOCK_QUESTS.slice(index, index + 2)

  const handleStartQuest = (q: Quest) => {
    // navigate(`/game/${q.id}`)
    navigate(`/quest/${q.id}`, { state: { quest: q } })
  }

  return (
    <div className="profile-page">
      {menuOpen && (
        <div
          className="profile-menu-backdrop"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={
          menuOpen ? "profile-menu profile-menu_open" : "profile-menu"
        }
      >
        <div className="profile-menu-header">
          <img width={60} height={60} src={user_l} alt="" />
          <button
            className="profile-menu-close"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="profile-menu-list">
          <button className="profile-menu-item">Настройки профиля</button>
          <button className="profile-menu-item">
            Конфиденциальность и безопасность
          </button>
          <button className="profile-menu-item">Избранные квесты</button>
          <button className="profile-menu-item">Пройденные квесты</button>
        </nav>

        <button className="profile-menu-logout" onClick={handleLogout}>
          Выйти из профиля
          <img
            width={30}
            height={30}
            src={exit}
            alt="Выйти"
            className="profile-menu-logout-icon"
          />
        </button>
      </aside>

      <div className="profile-wrapper">
        <div className="profile-header-row">
          <div className="profile-header-icons">
            <button
              className="profile-icon profile-icon-filter"
              onClick={() => setMenuOpen(true)}
            >
              <img width={45} height={60} src={stg} alt="Настройки." />
            </button>

            <button className="profile-icon profile-icon-user">
              <img width={60} height={60} src={user} alt="Пользователь." />
            </button>
          </div>
        </div>

        <div className="profile-content">
          <h2 className="profile-title">Рекомендованные квесты</h2>

          <div className="profile-carousel">
            <button
              className="profile-arrow profile-arrow-left"
              onClick={handlePrev}
            >
              ‹
            </button>

            <div className="profile-cards">
              {visibleQuests.map(q => (
                <div
                  className="profile-card"
                  key={q.id}
                  onClick={() => handleStartQuest(q)}
                >
                  <div className="profile-card-image">Картинка квеста</div>
                  <div className="profile-card-body">
                    <div className="profile-card-title">{q.title}</div>
                    <div className="profile-card-description">
                      {q.description}
                    </div>

                    <div className="profile-card-bottom">
                      <div className="profile-card-price">
                        <span>Цена квеста: {q.price}</span>
                      </div>
                      <div className="profile-card-rating">
                        <span className="profile-card-rating-star">★</span>
                        <span className="profile-card-rating-value">4.9</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="profile-arrow profile-arrow-right"
              onClick={handleNext}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
