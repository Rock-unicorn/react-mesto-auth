import { PopupWithForm } from "./PopupWithForm";

export function DeletePlacePopup(props) {
    function handleDelete(e) {
        e.preventDefault();
        props.onDeletePlace(props.card);
    }
    return (
        <PopupWithForm card={props.card} name='delete' title='Вы уверены?' buttonName='Да' isOpen={props.card} onClose={props.onClose} onSubmit={handleDelete} onOverlayClose={props.onOverlayClose} />
    )
}