function ImagePopup() {
  return (
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
  );
}

export default ImagePopup;
