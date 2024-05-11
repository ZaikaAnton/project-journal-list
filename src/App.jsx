import "./App.css";

import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import Header from "./components/Header/Header";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalList from "./components/JournalList/JournalList";
import CardButton from "./components/CardButton/CardButton";
import JournalItem from "./components/JournalItem/JournalItem";

import Body from "./layouts/Body/Body";
import JournalForm from "./components/JournalForm/JournalForm";

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
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton />
          <JournalList>
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
          </JournalList>
        </LeftPanel>
        <Body>
          <JournalForm />
        </Body>
      </div>
    </>
  );
}

export default App;
