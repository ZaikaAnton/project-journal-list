import "./App.css";

import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import Header from "./components/Header/Header";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalList from "./components/JournalList/JournalList";

import Body from "./layouts/Body/Body";
import JournalForm from "./components/JournalForm/JournalForm";
import { useLocalStorage } from "./hooks/useLocalStorage.hook";

// import { UserContext } from "./context/userContext";
import { UserContextProvider } from "./context/userContext";
import { useState } from "react";

// Функция, которая перебирает наши items и приводит их в нужный нам вид
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

  // Это состояние, которое хранит выбранный элемент. Тот элемент по которому мы кликнули из списка записей.
  const [selectedItem, setSelectedItem] = useState(null);

  // Это функция, которая обновляет наши items. То есть мы добавляем в нащ массив с объектами новые данные, которые ввели через все input. Добавляем при помощи spread.
  // И прокидываем ее в качестве props в JotnalForm. Чтоб засабмитить наши новые данные(сохранить item в items).
  const addItem = (item) => {
    const getNextId = (items) => {
      if (items && Array.isArray(items) && items.length > 0) {
        return Math.max(...items.map((i) => i.id)) + 1;
      }
      return 1;
    };

    if (!item.id) {
      setItems([
        ...mapItems(items),
        {
          // text: item.text,
          // title: item.title,
          ...item,
          date: new Date(item.date),
          id: getNextId(items),
        },
      ]);
    } else {
      setItems([
        ...mapItems(items).map((i) => {
          if (i.id === item.id) {
            return {
              ...item,
            };
          }
          return i;
        }),
      ]);
    }
  };

  // Функция, которая удаляет запись
  const deleteItem = (id) => {
    setItems([...items.filter((i) => i.id !== id)]);
  };

  return (
    <>
      <UserContextProvider>
        <div className="app">
          <LeftPanel>
            <Header />
            <JournalAddButton clearForm={() => setSelectedItem(null)} />
            <JournalList items={mapItems(items)} setItem={setSelectedItem} />
          </LeftPanel>
          <Body>
            <JournalForm
              onSubmit={addItem}
              onDelete={deleteItem}
              data={selectedItem}
            />
          </Body>
        </div>
      </UserContextProvider>
    </>
  );
}

export default App;
