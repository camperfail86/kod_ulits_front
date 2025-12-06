import React from "react"
import "./style.css"

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div className="profile-wrapper">
        <div className="profile-header-row">
          <div className="profile-header-text">Личный кабинет пользователя</div>

          <div className="profile-header-icons">
            <button className="profile-icon profile-icon-filter">
              <span className="profile-icon-filter-line" />
              <span className="profile-icon-filter-line" />
              <span className="profile-icon-filter-line" />
            </button>

            <button className="profile-icon profile-icon-user">
              <span className="profile-icon-user-inner" />
            </button>
          </div>
        </div>

        <div className="profile-content">
          <h2 className="profile-title">Рекомендованные квесты</h2>

          <div className="profile-carousel">
            <button className="profile-arrow profile-arrow-left">‹</button>

            <div className="profile-cards">
              <div className="profile-card">
                <div className="profile-card-image">Картинка квеста</div>
                <div className="profile-card-body">
                  <div className="profile-card-title">Название квеста 1</div>
                  <div className="profile-card-description">
                    Описание квеста
                  </div>

                  <div className="profile-card-bottom">
                    <div className="profile-card-price">
                      <span>Цена квеста:</span>
                    </div>
                    <div className="profile-card-rating">
                      <span className="profile-card-rating-star">★</span>
                      <span className="profile-card-rating-value">4.9</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-card">
                <div className="profile-card-image">Картинка квеста</div>
                <div className="profile-card-body">
                  <div className="profile-card-title">Название квеста 2</div>
                  <div className="profile-card-description">
                    Описание квеста
                  </div>

                  <div className="profile-card-bottom">
                    <div className="profile-card-price">
                      <span>Цена квеста:</span>
                    </div>
                    <div className="profile-card-rating">
                      <span className="profile-card-rating-star">★</span>
                      <span className="profile-card-rating-value">4.9</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="profile-arrow profile-arrow-right">›</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

