import React, {FormEvent, useState} from 'react';
import eyeIcon from "../../../assets/svg/eye.svg";
import {Link} from "react-router-dom";
import "./style.css"
import eyeIconError from "../../../assets/svg/eye_red.svg";

const RegistrationOrganizer = () => {
    const [error, setError] = useState<string | null>(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [FIO, setFIO] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)

      if (!password) {
        setError("*Пароль должен содержать хотя бы 1 символ и 1 цифру");
      }
        // try {
        //     // await login(email, password) дата рождения, Имя
        //
        // } catch (e: any) {
        //     setError("*Пароль должен содержать хотя бы 1 символ и 1 цифру")
        // }
    }
    return (
        <div>
            <div className="form-group">
                <form className="form" onSubmit={handleSubmit}>
                    <div>
                        <label>
                            <input
                                placeholder="ФИО"
                                className={"form_input_email"}
                                value={FIO}
                                onChange={e => setFIO(e.target.value)}
                                type="text"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                placeholder="Реквизиты банковского счета"
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
                                    className={error ? "form_input_password_error" : "form_input_password"}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    type="password"
                                />
                                <button
                                    type="button"
                                    className="password_eye_btn"
                                    onClick={() => setShowPassword(v => !v)}
                                >
                                  {error ? <img src={eyeIconError} alt=""/> : <img src={eyeIcon} alt=""/>}
                                </button>
                            </div>
                        </label>
                    </div>
                    {error && <div className="error_password_organizer">{error}</div>}
                    <button className={error ? "form_enter_button_error" : "form_enter_button"} type="submit">Создать аккаунт</button>
                    <div className="form_footer">
                        <span className="form_footer_text">Уже есть аккаунт?</span>
                        <Link to={"/login"} type="button" className="form_footer_link_player">
                            Войти
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationOrganizer;