import "./JournalList.css";

function JournalList({ children }) {
  return <div className="journal-list">{children}</div>;
}

export default JournalList;

// children - Это CardButton, а в нем JournalItem
