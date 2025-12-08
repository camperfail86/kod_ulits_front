import React, { FormEvent, useState } from "react"
import eyeIcon from "../../../assets/svg/eye.svg"
import { Link, useNavigate } from "react-router-dom"
import "./style.css"
import eyeIconError from "../../../assets/svg/eye_red.svg"

const RegistrationPLayer = () => {
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  console.log("API:", process.env.REACT_APP_API_BASE_URL)
  const navigate = useNavigate()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/

  const isValidDateOfBirth = (value: string) => {
    const match = value.match(dateRegex)
    if (!match) return false

    const day = Number(match[1])
    const month = Number(match[2])
    const year = Number(match[3])

    const date = new Date(year, month - 1, day)
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return false
    }

    const today = new Date()
    if (date > today) return false
    if (year < 1900) return false

    return true
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name || !email || !password) {
      setError("*Заполните все поля")
      return
    }

    if (!emailRegex.test(email)) {
      setError("*Введите корректный E-mail")
      return
    }

    if (!isValidDateOfBirth(dateOfBirth)) {
      setError("*Введите корректную дату рождения - ДД.ММ.ГГГГ")
      return
    }

    if (!/^(?=.*[A-Za-zА-Яа-я])(?=.*\d).{2,}$/.test(password)) {
      setError("*Пароль должен содержать хотя бы 1 символ и 1 цифру")
      return
    }

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            confirm_password: password,
            name,
            date_of_birth: dateOfBirth,
          }),
        }
      )

      const json = await res.json()

      if (!res.ok || json.success === false) {
        throw new Error(json.message || "Ошибка регистрации")
      }

      navigate("/login")
    } catch (e: any) {
      setError(e.message || "Ошибка регистрации")
    }
  }

  return (
    <div className="form-group">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              placeholder="Имя"
              className={"form_input_email"}
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
            />
          </label>
        </div>
        <div>
          <label>
            <input
              placeholder="Дата рождения"
              className={"form_input_email"}
              value={dateOfBirth}
              onChange={e => setDateOfBirth(e.target.value)}
              type="text"
            />
          </label>
        </div>
        <div>
          <label>
            <input
              placeholder="E-mail"
              className={"form_input_email"}
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
            />
          </label>
        </div>
        <div>
          <label>
            <div className="password-wrapper">
              <input
                placeholder="Пароль"
                className={
                  error ? "form_input_password_error" : "form_input_password"
                }
                value={password}
                onChange={e => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                className="password_eye_btn"
                onClick={() => setShowPassword(v => !v)}
              >
                {error ? <img src={eyeIconError} alt="" /> : <img src={eyeIcon} alt="" />}
              </button>
            </div>
          </label>
        </div>
        {error && <div className="error_password_player">{error}</div>}
        <button
          className={error ? "form_enter_button_error" : "form_enter_button"}
          type="submit"
        >
          Создать аккаунт
        </button>
        <div className="form_footer">
          <span className="form_footer_text">Уже есть аккаунт?</span>
          <Link to={"/login"} className="form_footer_link_player">
            Войти
          </Link>
        </div>
      </form>
    </div>
  )
}

export default RegistrationPLayer
