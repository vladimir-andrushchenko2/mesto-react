function ImagePopup({ card, onClose }) {
  return (
    <div className={`pop-up pop-up_type_show-card pop-up_darker-background ${card ? 'pop-up_opened' : ''}`} onClick={onClose}>
      <div className="pop-up__container">
        <button
          type="button"
          className="button pop-up__close-btn"
          aria-label="Закрыть"
        ></button>
        <img className="pop-up__image" src={`${card ? card.link : '#'}`} alt="" />
        <p className="pop-up__image-caption">{card ? card.name : ''}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
