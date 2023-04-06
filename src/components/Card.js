import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `elements__like-button ${isLiked && 'elements__like-button_active'}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleLike() {
        props.onCardLike(props.card);
    }

    function handleDelete() {
        props.onCardDelete(props.card);
    }

    return (
        <li className="elements__item">
            <img onClick={handleClick} className="elements__image" src={props.card.link} alt={props.card.name} />
            <div className="elements__group">
                <h2 className="elements__title">{props.card.name}</h2>
                <div className="elements__like-container">
                    <button onClick={handleLike} className={cardLikeButtonClassName} type="button" aria-label="Лайкнуть фото"></button>
                    <span className="elements__like-counter">{props.card.likes.length}</span>
                </div>
            </div>
            {isOwn && <button onClick={handleDelete} className="elements__delete-button" aria-label="удалить фотографию" />}
        </li>
    )
}