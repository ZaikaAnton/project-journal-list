import styles from "./JournalForm.module.css";
import { useState } from "react";
import Button from "../Button/Button";

function JournalForm() {
  // Состояние, которое следит за нашем имзменение в Input
  const [inputData, setInputData] = useState("");

  // Функция обработчика события при изменение тега input // Еще не забываем к тегу формы input - Добавить атрибут value чтоб поле было контролируемым.
  const inputChange = (event) => {
    setInputData(event.target.value);
    console.log(inputData);
  };

  //Функция, которая сабмитит() нашу форму. У ее target хранятся наши value со всех input. И при чем обработчик висит на теге form, а не на компоненте Button. И при это срабатывает при нажаите на Button
  const addJournalItem = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <input type="title" name="text" />
      <input type="date" name="date" />
      <input type="text" name="tag" value={inputData} onChange={inputChange} />
      <textarea name="post" id="" cols="30" rows="10"></textarea>
      <Button
        textButtonSave="Сохранить"
        onClickk={() => {
          console.log("Нажали на кнопку Сохранить");
        }}
      />
    </form>
  );
}

export default JournalForm;
