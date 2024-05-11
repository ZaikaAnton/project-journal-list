import "./Body.css";

function Body({ children }) {
  return <div className="body">{children}</div>;
}

export default Body;

// тут children - Это все то, что (лежит в компоненте Body) В качестве children сюда попадает JournalForm
