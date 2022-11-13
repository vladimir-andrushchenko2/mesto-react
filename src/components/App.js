import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  // selectedCard is optional either false or Object
  const [selectedCard, setSelectedCard] = useState(false);


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

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);

    setIsEditAvatarPopupOpen(false);

    setIsEditProfilePopupOpen(false);

    setSelectedCard(false);

    document.removeEventListener('keydown', closePopUpOnEsc);
  }

  function closePopUpOnEsc({ key }) {
    if (key === 'Escape') {
      closeAllPopups();
    }
  }

  useEffect(() => {
    const isOpen = isAddPlacePopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || selectedCard;

    if (isOpen) {
      document.addEventListener('keydown', closePopUpOnEsc);
    }
    // because when I use useCallback on closePopUpOnEsc,
    // and then in turn useCallback on closeAllPopUps and define closeAllPopups as dependancy
    // it complains that closePopUpOnEsc was used before definition
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditAvatarPopupOpen, isAddPlacePopupOpen, isEditProfilePopupOpen, selectedCard])

  return (
    <>
      <PopupWithForm name="delete-card" title="Вы уверены?" buttonText={'Да'} />

      <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} buttonText={'Сохранить'}>
        <label className="pop-up__form-field">
          <input
            id="title-input"
            type="text"
            name="title"
            className="pop-up__input pop-up__input_type_title"
            placeholder="Ваше имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="pop-up__input-error title-input-error"></span>
        </label>
        <label className="pop-up__form-field">
          <input
            id="subtitle-input"
            type="text"
            name="subtitle"
            className="pop-up__input pop-up__input_type_subtitle"
            placeholder="О Вас"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="pop-up__input-error subtitle-input-error"></span>
        </label>
      </PopupWithForm>

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

      <PopupWithForm name="edit-profile-picture" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText={'Сохранить'}>
        <label className="pop-up__form-field">
          <input
            id="update-profile-picture-input"
            type="url"
            name="source"
            className="pop-up__input pop-up__input_type_picture-source"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="pop-up__input-error update-profile-picture-input-error"></span>
        </label>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <div className="page">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />

        <Footer />
      </div>
    </>
  );
}

export default App;
