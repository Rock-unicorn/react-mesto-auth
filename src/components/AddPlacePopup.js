import React from "react"
import { PopupWithForm } from "./PopupWithForm"
import { UseFormValidation } from "../hooks/UseFormValidation"
export function AddPlacePopup(props) {

    const { values, errors, isValid, handleChange, resetForm } = UseFormValidation({});

    React.useEffect(() => {
        resetForm();
    }, [props.isOpen, resetForm])

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace(values);
    }

    return (
        <PopupWithForm
            name='add'
            title='Новое место'
            buttonName='Создать'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit} 
            isDisabled={!isValid} 
            onOverlayClose={props.onOverlayClose} >
            
            <input value={values.name || ''} onChange={handleChange} className={errors.name ? "form__input form__input_error" : "form__input"} type="text" placeholder="Название" name="name" id="element-name" required minLength="2" maxLength="30" />
            <span className={errors.name ? "form__error form__error_visible" : "form__error"}>
                {errors.name}
            </span>
            <input value={values.link || ''} onChange={handleChange} className={errors.link ? "form__input form__input_error" : "form__input"} type="url" placeholder="Ссылка на картинку" name="link" id="element-link" required />
            <span className={errors.link ? "form__error form__error_visible" : "form__error"}>
                {errors.link}
            </span>
        </PopupWithForm>
    )
}