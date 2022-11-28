import React, { useContext } from 'react';

import Card from './Card';

import { api } from '../utils/api';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);

  const [cards, setCards] = React.useState([]);

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

  React.useEffect(() => {
    api.getInitialCards()
      .then(initialCards => {
        setCards(initialCards);
      })
      .catch(err => console.error(err));

  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__picture-container">
          <img
            className="profile__picture"
            src={currentUser.avatar}
            alt="заставка профиля"
          />
          <div className="profile__picture-overlay" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__title">
          <h1 className="profile__title-text">{currentUser.name}</h1>
          <button
            type="button"
            className="button profile__modify-button"
            aria-label="Изменить профиль"
            onClick={onEditProfile}
          ></button>
        </div>

        <p className="profile__subtitle">{currentUser.about}</p>

        <button
          type="button"
          className="button profile__add-button"
          aria-label="Добавить место"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="gallery">
        <ul className="gallery__items">
          {cards.map(card =>
            <Card
              card={card}
              onCardClick={onCardClick}
              key={card._id}
              onCardLike={handleCardLike}
            />)}
        </ul>
      </section>
    </main>
  );
}

export default Main;
