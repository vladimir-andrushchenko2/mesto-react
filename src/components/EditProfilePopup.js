import PopupWithForm from './PopupWithForm'

function EditProfilePopup({ isOpen, onClose }) {
  return (<PopupWithForm name="profile" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} buttonText={'Сохранить'}>
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
  </PopupWithForm>);
}

export default EditProfilePopup;
