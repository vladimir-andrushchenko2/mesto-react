import React from 'react';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  // selectedCard is optional either false or Object
  const [selectedCard, setSelectedCard] = React.useState(false);

  function isLeftClickOnClosingElements({ target, button }) {
    return button === 0 &&
      (target.classList.contains('pop-up') ||
        target.classList.contains('pop-up__close-btn'));
  }

  // onClick={() => handleCardClick(card)}
  function handleCardClick(card) {
    setSelectedCard(card);

    document.addEventListener('keydown', closeAllPopups);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);

    document.addEventListener('keydown', closeAllPopups);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);

    document.addEventListener('keydown', closeAllPopups);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);

    document.addEventListener('keydown', closeAllPopups);
  }

  function closeAllPopups(event) {
    if (event.key === 'Escape' || isLeftClickOnClosingElements(event)) {
      setIsAddPlacePopupOpen(false);

      setIsEditAvatarPopupOpen(false);

      setIsEditProfilePopupOpen(false);

      setSelectedCard(false);

      document.removeEventListener('keydown', closeAllPopups);
    }
  }

  return (
    <>
      <PopupWithForm name="delete-card" title="Вы уверены?">
        <input
          type="submit"
          className="pop-up__save-button pop-up__save-button_type_delete"
          value="Да"
        />
      </PopupWithForm>

      <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
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
        <input
          type="submit"
          className="pop-up__save-button"
          value="Сохранить"
        />
      </PopupWithForm>

      <PopupWithForm name="gallery-add" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
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
        <input
          type="submit"
          className="pop-up__save-button"
          value="Сохранить"
        />
      </PopupWithForm>

      <PopupWithForm name="edit-profile-picture" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
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
        <input
          type="submit"
          className="pop-up__save-button"
          value="Сохранить"
        />
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
