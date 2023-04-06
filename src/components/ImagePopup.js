export function ImagePopup(props) {
    return (
        <div className={`popup popup-photo ${props.card ? 'popup_opened' : ''}`} onClick={props.onOverlayClose} >
            <div className="popup-photo__container">
                <figure className="popup-photo__figure">
                    <img alt={`${props.card ? props.card.name : ''}`} className="popup-photo__image" src={`${props.card ? props.card.link : ''}`} />
                    <figcaption className="popup-photo__figcaption">{`${props.card ? props.card.name : ''}`}</figcaption>
                    <button onClick={props.onClose} className="popup__close-button popup-photo__close-button" type="button"></button>
                </figure>
            </div>
        </div>
    )
}