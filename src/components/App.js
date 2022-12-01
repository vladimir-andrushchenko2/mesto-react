import React, { useEffect, useState } from 'react';

import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import { api } from '../utils/api';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = React.useState([]);

  function handleAddPlaceSubmit(name, link) {
    api.postCard(name, link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.error(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    function updateCards(updatedCard) {
      setCards(cards.map(card => card._id === updatedCard._id ? updatedCard : card));
    }

    if (!isLiked) {
      api.putCardLike(card._id)
        .then(updateCards)
        .catch(err => console.error(err));
    } else {
      api.deleteCardLike(card._id)
        .then(updateCards)
        .catch(err => console.error(err));
    }
  }

  function handleCardDelete(cardToDelete) {
    api.deleteCard(cardToDelete._id)
      .then(msg => {
        setCards(cards.filter(card => card._id !== cardToDelete._id))
      })
      .catch(err => console.error(err));
  }

  // onClick={() => handleCardClick(card)}
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser({ name, about }) {
    api.patchUserInfo(name, about)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(err => console.error(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api.patchUserAvatar(avatar)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(err => console.error(err))
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);

    setIsEditAvatarPopupOpen(false);

    setIsEditProfilePopupOpen(false);

    setSelectedCard(null);
  }

  React.useEffect(() => {
    api.getInitialCards()
      .then(initialCards => {
        setCards(initialCards);
      })
      .catch(err => console.error(err));

  }, [])

  useEffect(() => {
    api.getUserInfo()
      .then(user => {
        setCurrentUser(user);
      }).catch(err => console.error(err))
  }, [])

  useEffect(() => {
    function closePopUpOnEsc({ key }) {
      if (key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closePopUpOnEsc);

    return () => {
      document.removeEventListener('keydown', closePopUpOnEsc);
    }
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <PopupWithForm name="delete-card" title="Вы уверены?" buttonText={'Да'} />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <div className="page">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
