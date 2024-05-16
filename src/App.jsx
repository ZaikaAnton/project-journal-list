import "./App.css";

import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import Header from "./components/Header/Header";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalList from "./components/JournalList/JournalList";

import Body from "./layouts/Body/Body";
import JournalForm from "./components/JournalForm/JournalForm";
import { useLocalStorage } from "./hooks/useLocalStorage.hook";

function mapItems(items) {
  if (!items) {
    return [];
  }
  return items.map((i) => ({
    ...i,
    date: new Date(i.date),
  }));
}

function App() {
  // Кастомный хук, который следит изменением начальных данных, и добавляет новые в items и в localStorage
  const [items, setItems] = useLocalStorage("data");

  // // Функция, которая берет хранилище из localStorage под меткой "data". И если в data что-то есть, то добавляет это что-то в нашу переменную items
  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("data"));
  //   if (data) {
  //     setItems(data.map((item) => ({ ...item, date: new Date(item.date) })));
  //   }
  //   // console.log("Это сам localStorage(data)", data);
  // }, []);

  // // Функция, которая следит за изменение переменной items и если они изменились и длина items > 0, то добавляет эти данных в localStorage в ячейку data (Поэтому при перезагрузке страницы, записи не пропадают)
  // useEffect(() => {
  //   if (items.length) {
  //     localStorage.setItem("data", JSON.stringify(items));
  //   }
  //   // console.log("Это переменная items", items);
  // }, [items]);

  // Это функция, которая обновляет наши items. То есть мы добавляем в нащ массив с объектами новые данные, которые ввели через все input. Добавляем при помощи spread.
  // И прокидываем ее в качестве props в JotnalForm. Чтоб засабмитить наши новые данные(сохранить item в items).
  const addItem = (item) => {
    setItems([
      ...mapItems(items),
      {
        text: item.text,
        title: item.title,
        date: new Date(item.date),
        id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
      },
    ]);
  };

  return (
    <>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton />
          <JournalList items={mapItems(items)} />
        </LeftPanel>
        <Body>
          <JournalForm onSubmit={addItem} />
        </Body>
      </div>
    </>
  );
}

export default App;

// {
// "id": 1,
// "title": "Обучение frontend",
// "text": "Учу, учу, учу",
// "date": "2024/05/16"
// },
// {
// "id": 2,
// "title": "React, Redux Toolkit, TypeScript",
// "text": "Учу, учу, учу, учу",
// "date": "2024/05/16"
// }
