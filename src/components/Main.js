import React, { useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import pencilAvatar from '../images/edit_avatar.png';
import { Card } from './Card';

export function Main(props) {
    const currentUser = React.useContext(CurrentUserContext)
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar">
                    <img className="profile__avatar-image" src={currentUser.avatar} alt="Аватар пользователя" />
                    <div onClick={props.onEditAvatar} className="profile__overlay">
                        <img className="profile__avatar-edit" src={pencilAvatar} alt="Иконка редактирования" />
                    </div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <p className="profile__profession">{currentUser.about}</p>
                    <button onClick={props.onEditProfile} className="profile__info-change-button" type="button" aria-label="Изменить профиль"></button>
                </div>
                <button onClick={props.onAddPlace} className="profile__add-button" type="button"></button>
            </section>
            <section className="elements">
                <ul className="elements__items">
                    {props.cards.map((card) => (
                        <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                    ))}
                </ul>
            </section>
        </main>
    )
}