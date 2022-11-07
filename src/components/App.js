

import Header from './Header';
import Main from './Main';

function App() {
  return (
    <>
      <div className="pop-up pop-up_type_delete-card">
        <div className="pop-up__container">
          <button
            type="button"
            className="button pop-up__close-btn"
            aria-label="Закрыть"
          ></button>
          <form
            name="deleteCardForm"
            action="/"
            method="delete"
            className="pop-up__form"
            noValidate
          >
            <h2 className="pop-up__header">Вы уверены?</h2>
            <input
              type="submit"
              className="pop-up__save-button pop-up__save-button_type_delete"
              value="Да"
            />
          </form>
        </div>
      </div>

      <div className="pop-up pop-up_type_profile">
        <div className="pop-up__container">
          <button
            type="button"
            className="button pop-up__close-btn"
            aria-label="Закрыть"
          ></button>
          <form
            name="profileForm"
            action="/"
            method="get"
            className="pop-up__form"
            noValidate
          >
            <h2 className="pop-up__header">Редактировать профиль</h2>
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
          </form>
        </div>
      </div>

      <div className="pop-up pop-up_type_gallery-add">
        <div className="pop-up__container">
          <button
            type="button"
            className="button pop-up__close-btn"
            aria-label="Закрыть"
          ></button>
          <form
            name="galleryAddCardForm"
            action="/"
            method="get"
            className="pop-up__form"
            noValidate
          >
            <h2 className="pop-up__header">Новое место</h2>
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
          </form>
        </div>
      </div>

      <div className="pop-up pop-up_type_edit-profile-picture">
        <div className="pop-up__container">
          <button
            type="button"
            className="button pop-up__close-btn"
            aria-label="Закрыть"
          ></button>
          <form
            name="galleryAddCardForm"
            action="/"
            method="get"
            className="pop-up__form"
            noValidate
          >
            <h2 className="pop-up__header">Обновить аватар</h2>
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
          </form>
        </div>
      </div>

      <div className="pop-up pop-up_type_show-card pop-up_darker-background">
        <div className="pop-up__container">
          <button
            type="button"
            className="button pop-up__close-btn"
            aria-label="Закрыть"
          ></button>
          <img className="pop-up__image" src="#" alt="" />
          <p className="pop-up__image-caption"></p>
        </div>
      </div>

      <div className="page">
        <Header />
        <Main />


        <footer className="footer">
          <p className="footer__text">&copy; 2022 Mesto Russia</p>
        </footer>
      </div>

      <template id="card">
        <li className="gallery__item card">
          <img className="card__picture" src="#" alt="default image" />
          <button type="button" className="button card__delete-button"></button>
          <div className="card__info">
            <h2 className="card__caption"></h2>
            <div className="">
              <button
                type="button"
                className="button card__like-button"
              ></button>
              <div className="card__likes"></div>
            </div>
          </div>
        </li>
      </template>
    </>
  );
}

export default App;
