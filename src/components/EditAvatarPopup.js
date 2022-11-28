import { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({ isOpen, onClose, onChangeAvatar }) {
  const currentUser = useContext(CurrentUserContext);
  const [sourceUrl, setSourceUrl] = useState('');

  useEffect(() => {
    setSourceUrl(currentUser.avatar);
  }, [currentUser]);

  function handleChange(event) {
    setSourceUrl(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onChangeAvatar(sourceUrl);
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} name="edit-profile-picture" title="Обновить аватар" isOpen={isOpen} onClose={onClose} buttonText={'Сохранить'}>
      <label className="pop-up__form-field">
        <input
          id="update-profile-picture-input"
          type="url"
          name="source"
          value={sourceUrl}
          onChange={handleChange}
          className="pop-up__input pop-up__input_type_picture-source"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="pop-up__input-error update-profile-picture-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
