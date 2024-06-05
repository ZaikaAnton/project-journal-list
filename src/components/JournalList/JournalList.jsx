import "./JournalList.css";
import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

function JournalList({ items }) {
  const { userId } = useContext(UserContext);
  // Рендер по условию
  // Если(if)
  if (items.length === 0) {
    return <p>Записей пока нет, добавьте первую</p>;
  }
  // Функция для сортировки отображаемых компонентов.
  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };
  // Иначе(else)
  return (
    <>
      {items
        .filter((el) => el.userId == userId)
        .sort(sortItems)
        .map((el) => (
          <CardButton key={el.id}>
            <JournalItem title={el.title} text={el.text} date={el.date} />
          </CardButton>
        ))}
    </>
  );
}

export default JournalList;

// children - Это CardButton, а в нем JournalItem
// Переделал, в качестве props приходят items из компонента App.jsx
