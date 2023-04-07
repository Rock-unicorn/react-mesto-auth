import { Link } from "react-router-dom";
import { UseFormValidation } from "../hooks/UseFormValidation";


export function Register(props) {

    const { values, errors, isValid, handleChange, resetForm } = UseFormValidation({});

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleRegisterSubmit(values.email, values.password);
        resetForm();
    }

    return (
        <section className="register">
            <h2 className="register__title">Регистрация</h2>
            <form onSubmit={handleSubmit} className="register__form form" >
                <input value={values.email || ''} onChange={handleChange} className={errors.email ? "register__input register__input_error" : "register__input"} type="email" placeholder="Email"
                    name="email" id="email" required />
                <span className={errors.email ? "register__error register__error_visible" : "register__error"}>{errors.email}</span>
                <input value={values.password || ''} onChange={handleChange} className={errors.password ? "register__input register__input_error" : "register__input"} type="password" placeholder="Пароль"
                    name="password" id="password" required />
                <span className={errors.password ? "register__error register__error_visible" : "register__error"}>{errors.password}</span>
                <button disabled={!isValid} className={isValid ? "register__button" : "register__button register__button_disabled"} type="submit">Зарегистрироваться</button>
            </form>
            <div className="register__signin">
                <p className="register__signin_text">Уже зарегистрированы?</p>
                <Link to="/sign-in" className="register__signin_link">Войти</Link>
            </div>
        </section>
    )
}