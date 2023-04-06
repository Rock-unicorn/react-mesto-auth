import React, { useEffect } from 'react';
import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';
import { ImagePopup } from './ImagePopup.js';
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { EditProfilePopup } from './EditProfilePopup.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { AddPlacePopup } from './AddPlacePopup.js';
import { DeletePlacePopup } from './DeletePlacePopup.js';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isDeletePlacePopupOpen, setIsDeleteAvatarPopupOpen] = React.useState(null);
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState('');
    const [cards, setCards] = React.useState([]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, initialCards]) => {
                setCurrentUser(userData);
                setCards(initialCards);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            })
    }, [])

    useEffect(() => {
        if(isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isDeletePlacePopupOpen || selectedCard) {
            function handleEscClose(e) {
                if(e.key === 'Escape') {
                    closeAllPopup();
                }
            }
            document.addEventListener('keydown', handleEscClose);

            return () => {
                document.removeEventListener('keydown', handleEscClose);
            }
        }
    }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isDeletePlacePopupOpen, selectedCard])

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleDeletePlaceClick(card) {
        setIsDeleteAvatarPopupOpen(card);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (isLiked) {
            api.deleteLike(card._id).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`)
                });
        } else {
            api.addLike(card._id).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`)
                });
        }
    }

    function handleDeleteCard(card) {
        api.deleteCard(card._id).then(() => {
            setCards((state) => state.filter(c => c._id != card._id));
            setIsDeleteAvatarPopupOpen(null);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        });
    }

    function handleOverlayClick(e) {
        if(e.target.classList.contains('popup')) {
            closeAllPopup();
        }
    }

    function closeAllPopup() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsDeleteAvatarPopupOpen(null);
        setSelectedCard(null);
    }

    function handleUpdateUser(data) {
        api.changeProfile(data).then((res) => {
            setCurrentUser(res);
            closeAllPopup();
        })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            })
    }

    function handleUpdateAvatar(data) {
        api.changeProfileAvatar(data).then((res) => {
            setCurrentUser(res);
            closeAllPopup();
        })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            })
    }

    function handleAddPlaceSubmit(data) {
        api.createNewCard(data).then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopup();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    cards={cards}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeletePlaceClick} />
                <Footer />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopup} onOverlayClose={handleOverlayClick} onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopup} onOverlayClose={handleOverlayClick} onUpdateAvatar={handleUpdateAvatar} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopup} onOverlayClose={handleOverlayClick} onAddPlace={handleAddPlaceSubmit} />
                <DeletePlacePopup card={isDeletePlacePopupOpen} onClose={closeAllPopup} onOverlayClose={handleOverlayClick} onDeletePlace={handleDeleteCard} />
                <ImagePopup card={selectedCard} onClose={closeAllPopup} onOverlayClose={handleOverlayClick} />
            </div>
        </CurrentUserContext.Provider>

    );
}

export default App;
