import "./LeftPanel.css";

function LeftPanel({ children }) {
  return <div className="left-panel">{children}</div>;
}

export default LeftPanel;

// тут children - это все то что лежит в LeftPanel (Она содержит Header, JournalAddButton, JournalList, CardButton, JournalItem )
