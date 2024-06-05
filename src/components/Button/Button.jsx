import "./Button.css";

function Button({ children, onClickk }) {
  return (
    <button className="button accent" onClick={onClickk}>
      {children}
    </button>
  );
}

export default Button;

// textButtonSave - этот props приходит с JournalForm и имеет этот атрибут.
// onClickk - эта функция обработчика события onClick. Она тоже приходит с JournalForm. При это в JournalForm onClickk - объявлена в качестве атрибута и перекинута как props
