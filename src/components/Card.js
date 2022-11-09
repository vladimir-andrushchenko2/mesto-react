function Card({ card, onCardClick }) {
  const { link, name } = card;

  return (
    <li className="gallery__item card">
      <img className="card__picture" src={link} alt="default" onClick={() => onCardClick(card)} />
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
  )
}

export default Card;
