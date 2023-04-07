import successImg from '../images/success.png';
import unsuccessImg from "../images/Unsuccess.png";

export function InfoTooltip(props) {
    return (
        <div className={`popup popup-tooltip ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onOverlayClose} >
            <div className="popup__container" >
                {
                    props.isSuccess
                        ? <div className='popup-tooltip__container'>
                            <img alt='успешная регистрация' className='popup-tooltip__image' src={successImg} />
                            <h2 className='popup-tooltip__header' >Вы успешно зарегистрировались!</h2>
                        </div>

                        : <div className='popup-tooltip__container'>
                            <img alt='Что-то пошло не так' className='popup-tooltip__image' src={unsuccessImg} />
                            <h2 className='popup-tooltip__header' >Что-то пошло не так!
                                Попробуйте ещё раз.</h2>
                        </div>
                }
                <button onClick={props.onClose} className="popup__close-button" type="button" />
            </div>
        </div>
    )
}