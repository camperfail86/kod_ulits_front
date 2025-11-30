import "./style.css"
import {FormEvent, useState} from "react";
import {Link} from "react-router-dom";

export function ForgotPassword() {
    const [email, setEmail] = useState("")

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
    }

    return (
        <div className="form-group_fp">
            <h2 className="form-group_fp-title">Сброс пароля</h2>
            <div className="form-group_fp-description">Введите ваш электронный адрес и мы вышлем вам инструкции по получению нового пароля.</div>
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <label className="label_fp">E-mail
                        <input
                            placeholder="Введите ваш электронный адрес"
                            className={"form_input_email"}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                        />
                    </label>
                </div>
                <button className="form_enter_button_fp" type="submit">Отправить на почту</button>
                <div className="form_footer">
                    <Link to={"/login"} type="button" className="form_footer_link">
                        Вернуться
                    </Link>
                </div>
            </form>
        </div>
    )
}
