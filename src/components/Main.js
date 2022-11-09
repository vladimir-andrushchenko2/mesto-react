import React from 'react';

import { api } from '../utils/api';

function Main({ onEditProfile, onAddPlace, onEditAvatar }) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([{ name, about, avatar, _id }, initialCards]) => {
        setCards(initialCards);

        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
      })
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__picture-container">
          <img
            className="profile__picture"
            src={userAvatar}
            alt="заставка профиля"
          />
          <div className="profile__picture-overlay" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__title">
          <h1 className="profile__title-text">{userName}</h1>
          <button
            type="button"
            className="button profile__modify-button"
            aria-label="Изменить профиль"
            onClick={onEditProfile}
          ></button>
        </div>

        <p className="profile__subtitle">{userDescription}</p>

        <button
          type="button"
          className="button profile__add-button"
          aria-label="Добавить место"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="gallery">
        <ul className="gallery__items">
          {cards.map(({ link, name, _id }) => (
            <li key={_id} className="gallery__item card">
              <img className="card__picture" src={link} alt="default" />
              <button type="button" className="button card__delete-button"></button>
              <div className="card__info">
                <h2 className="card__caption">{name}</h2>
                <div className="">
                  <button
                    type="button"
                    className="button card__like-button"
                  ></button>
                  <div className="card__likes"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
