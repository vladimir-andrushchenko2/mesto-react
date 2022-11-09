function PopupWithForm({ title, name, children, isOpen, onClose }) {
  return (
    <div className={`pop-up pop-up_type_${name} ${isOpen ? 'pop-up_opened' : ''}`}
      onClick={onClose}>
      <div className="pop-up__container">
        <button
          type="button"
          className="button pop-up__close-btn"
          aria-label="Закрыть"
        // onClick={onClose}
        ></button>
        <form
          className="pop-up__form"
          name={name}
          noValidate
        >
          <h2 className="pop-up__header">{title}</h2>
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
