import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { PopupWithForm } from "./PopupWithForm";
import { UseFormValidation } from "../hooks/UseFormValidation";

export function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const { values, errors, isValid, handleChange, resetForm } = UseFormValidation({});



    React.useEffect(() => {
        if (currentUser) {
            resetForm(currentUser, {}, true);
        }
    }, [currentUser, resetForm, props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser(values);
    }


    return (
        <PopupWithForm isDisabled={!isValid} name='edit' title='Редактировать профиль' buttonName='Сохранить' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} onOverlayClose={props.onOverlayClose} >
            <input value={values.name || ''} onChange={handleChange} className={errors.name ? "form__input form__input_error" : "form__input"} type="text" placeholder="Имя" name="name" id="name" required minLength="2" maxLength="40" />
            <span className={errors.name ? "form__error form__error_visible" : "form__error"}>{errors.name}</span>
            <input value={values.about || ''} onChange={handleChange} className={errors.about ? "form__input form__input_error" : "form__input"} type="text" placeholder="О себе"
                name="about" id="about" required minLength="2" maxLength="200" />
            <span className={errors.about ? "form__error form__error_visible" : "form__error"}>{errors.about}</span>
        </PopupWithForm>
    )
}