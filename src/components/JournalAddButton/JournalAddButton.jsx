import "./JournalAddButton.css";
import CardButton from "../CardButton/CardButton";

function JournalAddButton() {
  return (
    <CardButton className="journal-add">
      <img src="/frame.svg" alt="" />
      Новое воспоминание
    </CardButton>
  );
}

export default JournalAddButton;
