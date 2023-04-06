export function PopupWithForm(props) {
    return (
        <div className={`popup popup-${props.name} ${props.isOpen && 'popup_opened'}`} onClick={props.onOverlayClose}>
            <div className="popup__container">
                <form onSubmit={props.onSubmit} className="form" name={`${props.name}`} noValidate>
                    <h2 className="form__title">{props.title}</h2>
                    {props.children}
                    <button disabled={props.isDisabled} className={props.isDisabled ? "form__save-button form__save-button_disabled" : "form__save-button"} type="submit">{props.buttonName}</button>
                </form>
                <button onClick={props.onClose} className="popup__close-button" type="button"></button>
            </div>
        </div>
    )
}