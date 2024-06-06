import "./JournalList.css";
import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";
import { useContext, useMemo } from "react";
import { UserContext } from "../../context/userContext";

function JournalList({ items, setItem }) {
  const { userId } = useContext(UserContext);

  // Функция для сортировки отображаемых компонентов.
  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };

  const filteredItems = useMemo(
    () => items.filter((el) => el.userId == userId).sort(sortItems),
    [items, userId]
  );

  // Рендер по условию
  // Если(if)
  if (items.length === 0) {
    return <p>Записей пока нет, добавьте первую</p>;
  }

  // Иначе(else)
  return (
    <>
      {filteredItems.map((el) => (
        <CardButton key={el.id} onClick={() => setItem(el)}>
          <JournalItem title={el.title} text={el.text} date={el.date} />
        </CardButton>
      ))}
    </>
  );
}

export default JournalList;

// children - Это CardButton, а в нем JournalItem
// Переделал, в качестве props приходят items из компонента App.jsx
// setItem - это функция, которая приходит из App.js Она отвечает за передачу данных обратно в форму, при клике на определенную запись.
