import React, { useRef, useEffect, useState } from 'react';

import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

import { api } from '../utils/api';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  // selectedCard is optional either false or Object
  const [selectedCard, setSelectedCard] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const avatarRef = useRef();

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

  function handleUpdateAvatar(newAvatarUrl) {
    api.patchUserAvatar(newAvatarUrl)
      .then(updatedUser => {
        avatarRef.current.src = updatedUser.avatar;
        closeAllPopups();
      })
      .catch(err => console.error(err))
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);

    setIsEditAvatarPopupOpen(false);

    setIsEditProfilePopupOpen(false);

    setSelectedCard(false);
  }

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

      <PopupWithForm name="gallery-add" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText={'Создать'}>
        <label className="pop-up__form-field">
          <input
            id="picture-name-input"
            type="text"
            name="name"
            className="pop-up__input pop-up__input_type_name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="pop-up__input-error picture-name-input-error"></span>
        </label>
        <label className="pop-up__form-field">
          <input
            id="picture-source-input"
            type="url"
            name="source"
            className="pop-up__input pop-up__input_type_picture-source"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="pop-up__input-error picture-source-input-error"></span>
        </label>

      </PopupWithForm>

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onChangeAvatar={handleUpdateAvatar} />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <div className="page">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          avatarRef={avatarRef}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
