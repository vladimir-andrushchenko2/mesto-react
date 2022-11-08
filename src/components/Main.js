import profilePicturePlaceholder from '../images/profile-picture-placeholder.jpg';

function Main() {
  function handleEditProfileClick() {
    document.querySelector('.pop-up_type_profile').classList.add('pop-up_opened');
  }

  function handleEditAvatarClick() {
    document.querySelector('.pop-up_type_edit-profile-picture').classList.add('pop-up_opened');
  }

  function handleAddPlaceClick() {
    document.querySelector('.pop-up_type_gallery-add').classList.add('pop-up_opened');
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__picture-container">
          <img
            className="profile__picture"
            src={profilePicturePlaceholder}
            alt="заставка профиля"
          />
          <div className="profile__picture-overlay" onClick={handleEditAvatarClick}></div>
        </div>
        <div className="profile__title">
          <h1 className="profile__title-text"></h1>
          <button
            type="button"
            className="button profile__modify-button"
            aria-label="Изменить профиль"
            onClick={handleEditProfileClick}
          ></button>
        </div>

        <p className="profile__subtitle"></p>

        <button
          type="button"
          className="button profile__add-button"
          aria-label="Изменить профиль"
          onClick={handleAddPlaceClick}
        ></button>
      </section>

      <section className="gallery">
        <ul className="gallery__items"></ul>
      </section>
    </main>
  );
}

export default Main;
