import React from "react"
import { PopupWithForm } from "./PopupWithForm"
import { UseFormValidation } from "../hooks/UseFormValidation";
export function EditAvatarPopup(props) {

    const { values, errors, isValid, handleChange, resetForm } = UseFormValidation({});

    React.useEffect(() => {
        resetForm();
    }, [props.isOpen, resetForm])

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(values);
    }

    return (
        <PopupWithForm isDisabled={!isValid} name='avatar' title='Обновить аватар' buttonName='Обновить аватар' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} onOverlayClose={props.onOverlayClose} >
            <input value={values.avatar || ''} onChange={handleChange} className={errors.avatar ? "form__input form__input_error" : "form__input"} type="url" placeholder="Ссылка на новый аватар"
                name="avatar" id="avatar" required />
            <span className={errors.avatar ? "form__error form__error_visible" : "form__error"}>{errors.avatar}</span>
        </PopupWithForm>
    )
}