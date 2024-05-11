import { useState } from "react";
import "./Button.css";

function Button() {
  const [textButtonSave, setTextButtonSave] = useState("Сохранить");

  const clicked = () => {
    setTextButtonSave("Выполнено");
    console.log("Нажали на кнопку 'Сохранить'");
  };

  return (
    <button onClick={clicked} className="button accent">
      {textButtonSave}
    </button>
  );
}

export default Button;
