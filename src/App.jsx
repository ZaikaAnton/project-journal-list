import "./App.css";

import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import Header from "./components/Header/Header";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalList from "./components/JournalList/JournalList";
import CardButton from "./components/CardButton/CardButton";
import JournalItem from "./components/JournalItem/JournalItem";

import Body from "./layouts/Body/Body";
import JournalForm from "./components/JournalForm/JournalForm";

import Button from "./components/Button/Button";

function App() {
  const data = [
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

  return (
    <>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton />
          <JournalList>
            {/* {[<Button>1</Button>, <Button>2</Button>]} */}
            {data.map((el) => (
              <CardButton>
                <JournalItem title={el.title} text={el.text} date={el.date} />
              </CardButton>
            ))}
            {/* <CardButton>
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
            </CardButton> */}
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
