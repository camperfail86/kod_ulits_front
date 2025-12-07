import React, { useEffect, useState } from "react"
import "./style.css"
import user from "../../../assets/person.svg"
import user_l from "../../../assets/user_light.svg"
import stg from "../../../assets/settings.svg"
import exit from "../../../assets/logout.svg"
import { useNavigate } from "react-router-dom"
import { Quest } from "../../Quest/questTypes"

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8080"

const ProfilePage = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [quests, setQuests] = useState<Quest[]>([])
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        setError(null)
        const res = await fetch(`${API_BASE}/api/get_quests`)
        const json = await res.json()

        if (!res.ok || json.success === false) {
          throw new Error(json.message || "Не удалось загрузить квесты")
        }

        const searching = json.searching_quests || []

        const mapped: Quest[] = searching.map((q: any) => ({
          id: String(q.game_id),
          title: q.title,
          // ВАЖНО: бэк присылает dascription
          description: q.dascription ?? q.description ?? "",
          location: q.location || "",
          difficulty: q.difficulty || "",
          duration: q.duration || 0,
          price: "0 ₽", // пока цены нет в апи, можно захардкодить/посчитать
        }))

        setQuests(mapped)
      } catch (e: any) {
        setError(e.message || "Ошибка загрузки квестов")
      }
    }

    load()
  }, [])

  const handleLogout = async () => {
    setMenuOpen(false)
    navigate("/login")
  }

  const handleNext = () => {
    if (quests.length <= 2) return
    setIndex(prev => {
      const next = prev + 2
      return next >= quests.length ? 0 : next
    })
  }

  const handlePrev = () => {
    if (quests.length <= 2) return
    setIndex(prev => {
      const next = prev - 2
      return next < 0 ? Math.max(quests.length - 2, 0) : next
    })
  }

  const visibleQuests =
    quests.length <= 2 ? quests : quests.slice(index, index + 2)

  const handleStartQuest = (q: Quest) => {
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

          {error && <div className="profile-error">{error}</div>}

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
