import "./CardButton.css";

function CardButton({ children, className }) {
  const cl = "card-button" + (className ? " " + className : "");

  return <button className={cl}>{children}</button>;
}

export default CardButton;

// В качестве children приходит компонент JournalItem
// className - это пропс, который пришел из JournalAddButton. В себе он хранит название атрибута, а оно ссылается на стиль JournalAddButton.css
