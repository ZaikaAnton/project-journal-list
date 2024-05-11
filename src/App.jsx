import "./App.css";
import Button from "./components/Button/Button";
import JournalItem from "./components/JournalItem/JournalItem";
import CardButton from "./components/CardButton/CardButton";

function App() {
  const data = [
    {
      title: "Обучение frontend",
      text: "Как же меня это все заебало",
      date: new Date(),
    },
    {
      title: "React, Redux Toolkit, TypeScript",
      text: "Тоже остопиздел уже",
      date: new Date(),
    },
  ];

  return (
    <>
      <h1>Заголовок</h1>
      <p>Какой-то текс</p>
      <Button />
      <CardButton>Новое воспоминание</CardButton>
      <CardButton>
        <JournalItem
          title={data[0].title}
          text={data[0].text}
          date={data[0].date}
        />
      </CardButton>
      <CardButton>
        <JournalItem
          title={data[1].title}
          text={data[1].text}
          date={data[1].date}
        />
      </CardButton>
    </>
  );
}

export default App;
