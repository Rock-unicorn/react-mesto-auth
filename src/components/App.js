import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
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
import { Register } from './Register.js';
import { Login } from './Login.js';
import { ProtectedRouteElement } from './ProtectedRoute.js';
import { InfoTooltip } from './InfoTooltip.js';
import * as auth from '../utils/auth.js';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isDeletePlacePopupOpen, setIsDeleteAvatarPopupOpen] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null)
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('')
    const [userEmeil, setUserEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then(([userData, initialCards]) => {
                    setCurrentUser(userData);
                    setCards(initialCards);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`)
                })
        }
    }, [loggedIn])

    useEffect(() => {
        if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isDeletePlacePopupOpen || selectedCard || isInfoTooltipOpen) {
            function handleEscClose(e) {
                if (e.key === 'Escape') {
                    closeAllPopup();
                }
            }
            document.addEventListener('keydown', handleEscClose);

            return () => {
                document.removeEventListener('keydown', handleEscClose);
            }
        }
    }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isDeletePlacePopupOpen, selectedCard, isInfoTooltipOpen])

    useEffect(() => {
        handleTokenCheck();
    }, [])

    const handleTokenCheck = () => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.checkToken(jwt).then(res => {
                setLoggedIn(true);
                setUserEmail(res.data.email);
                navigate('/', { replace: true });
            })
                .catch((err) => console.log(err));
        }
    }

    const handleRegisterSubmit = (email, password) => {
        auth.register(email, password)
            .then((res) => {
                setIsSuccess(true);
                setSuccessMessage('Вы успешно зарегистрировались!')
                setIsInfoTooltipOpen(true);
                navigate('/sign-in', { replace: true });
            })
            .catch(err => {
                setIsSuccess(false);
                setSuccessMessage('Что-то пошло не так! Попробуйте ещё раз.')
                setIsInfoTooltipOpen(true);
                console.log(err.message);
            })
    }

    const handleLoginSubmit = (email, password) => {
        auth.authorize(email, password).then((data) => {
            setLoggedIn(true);
            setUserEmail(email);
            navigate('/', { replace: true });
        })
            .catch((err) => {
                setIsSuccess(false);
                setSuccessMessage('Что-то пошло не так! Попробуйте ещё раз.')
                setIsInfoTooltipOpen(true);
                console.log(err.message);
            })
    }

    function handleSignOut() {
        localStorage.removeItem('jwt');
        setUserEmail('');
        setLoggedIn(false);
        navigate('/sign-in', { replace: true });
    }

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
        if (e.target.classList.contains('popup')) {
            closeAllPopup();
        }
    }

    function closeAllPopup() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsDeleteAvatarPopupOpen(null);
        setSelectedCard(null);
        setIsInfoTooltipOpen(false);
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
                <Header loggedIn={loggedIn} email={userEmeil} handleSignOut={handleSignOut} />
                <Routes>
                    <Route path='*' element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
                    <Route path='sign-up' element={<Register handleRegisterSubmit={handleRegisterSubmit} />} />
                    <Route path='sign-in' element={<Login handleLoginSubmit={handleLoginSubmit} />} />
                    <Route path='/' element={<ProtectedRouteElement
                        element={Main}
                        loggedIn={loggedIn}
                        cards={cards}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeletePlaceClick} />} />
                </Routes>
                <Footer />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopup} onOverlayClose={handleOverlayClick} onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopup} onOverlayClose={handleOverlayClick} onUpdateAvatar={handleUpdateAvatar} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopup} onOverlayClose={handleOverlayClick} onAddPlace={handleAddPlaceSubmit} />
                <DeletePlacePopup card={isDeletePlacePopupOpen} onClose={closeAllPopup} onOverlayClose={handleOverlayClick} onDeletePlace={handleDeleteCard} />
                <ImagePopup card={selectedCard} onClose={closeAllPopup} onOverlayClose={handleOverlayClick} />
                <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopup} onOverlayClose={handleOverlayClick} isSuccess={isSuccess} successMessage={successMessage} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
