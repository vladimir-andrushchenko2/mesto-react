import profilePicturePlaceholder from '../images/profile-picture-placeholder.jpg';

function Main() {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__picture-container">
          <img
            className="profile__picture"
            src={profilePicturePlaceholder}
            alt="заставка профиля"
          />
          <div className="profile__picture-overlay"></div>
        </div>
        <div className="profile__title">
          <h1 className="profile__title-text"></h1>
          <button
            type="button"
            className="button profile__modify-button"
            aria-label="Изменить профиль"
          ></button>
        </div>

        <p className="profile__subtitle"></p>

        <button
          type="button"
          className="button profile__add-button"
          aria-label="Изменить профиль"
        ></button>
      </section>

      <section className="gallery">
        <ul className="gallery__items"></ul>
      </section>
    </main>
  );
}

export default Main;
