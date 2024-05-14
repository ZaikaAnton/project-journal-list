import "./App.css";

import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import Header from "./components/Header/Header";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalList from "./components/JournalList/JournalList";
import CardButton from "./components/CardButton/CardButton";
import JournalItem from "./components/JournalItem/JournalItem";

import Body from "./layouts/Body/Body";
import JournalForm from "./components/JournalForm/JournalForm";

import { useState } from "react";

const INITIAL_DATA = [
  {
    title: "Обучение frontend",
    text: "Учу, учу, учу",
    date: new Date(),
  },
  {
    title: "React, Redux Toolkit, TypeScript",
    text: "Учу, учу, учу, учу",
    date: new Date(),
  },
];

function App() {
  // Состояние, которое следит за изменением(добавлением к ним) наших исходных данных.
  const [items, setItems] = useState(INITIAL_DATA);

  // Это функция, которая обновляет наши items. То есть мы добавляем в нащ массив с объектами новые данные, которые ввели через все input. Добавляем при помощи spread.
  // И прокидываем ее в качестве props в JotnalForm. Чтоб засабмитить наши новые данные(сохранить item в items).
  const addItem = (item) => {
    setItems((oldItems) => [
      ...oldItems,
      {
        text: item.text,
        title: item.title,
        date: new Date(item.date),
      },
    ]);
  };

  return (
    <>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton />
          <JournalList>
            {items.map((el) => (
              <CardButton>
                <JournalItem title={el.title} text={el.text} date={el.date} />
              </CardButton>
            ))}
          </JournalList>
        </LeftPanel>
        <Body>
          <JournalForm onSubmit={addItem} />
        </Body>
      </div>
    </>
  );
}

export default App;
