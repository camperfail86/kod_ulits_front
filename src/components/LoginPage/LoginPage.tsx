import { FormEvent, useState } from "react"
import { useAuth } from "../../auth/AuthContext"
import "./style.css"
import eyeIcon from "../../assets/svg/eye.svg"
import kod from "../../assets/Код улиц.png"
import eyeIconError from "../../assets/svg/eye_red.svg"
import { Link, useNavigate } from "react-router-dom"

export function LoginPage() {
  const navigate = useNavigate()
  const { login, loading, user } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  if (loading) return <div>Загрузка...</div>
  if (user) return <div>Вы уже вошли как {user.email}</div>

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      await login(email, password)
      navigate("/profile")
    } catch (err: any) {
      setError(err.message || "*Пароль или email неверный")
    }
  }

  return (
    <div className="form-group">
      <img className="form-group_image-login" src={kod} alt="" />
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              placeholder="E-mail"
              className="form_input_email"
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
        {error && <div className="form_error">{error}</div>}
        {!error && (
          <button className="form_enter_button" type="submit">
            Войти
          </button>
        )}
        {error && (
          <button
            type="button"
            onClick={() => {
              navigate("/forgot-password")
            }}
            className="form_enter_button_error"
          >
            Забыли пароль?
          </button>
        )}
        <div className="form_footer">
          <span className="form_footer_text">Нет аккаунта?</span>
          <Link to="/registration" className="form_footer_link">
            Зарегистрироваться
          </Link>
        </div>
      </form>
    </div>
  )
}
