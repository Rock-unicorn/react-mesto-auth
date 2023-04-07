import successImg from '../images/success.png';
import unsuccessImg from "../images/Unsuccess.png";

export function InfoTooltip(props) {
    return (
        <div className={`popup popup-tooltip ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onOverlayClose} >
            <div className="popup__container" >
                <div className='popup-tooltip__container'>
                    <img alt={props.successMessage} className='popup-tooltip__image' src={props.isSuccess ? successImg : unsuccessImg} />
                    <h2 className='popup-tooltip__header' >{props.successMessage}</h2>
                </div>
                <button onClick={props.onClose} className="popup__close-button" type="button" />
            </div>
        </div>
    )
}