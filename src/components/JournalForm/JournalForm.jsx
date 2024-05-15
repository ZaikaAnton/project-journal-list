import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useState } from "react";

function JournalForm({ onSubmit }) {
  // Состояние, которое отвечает за валидность формы
  const [formValidState, setFormValidState] = useState({
    title: true,
    text: true,
    date: true,
  });

  //Функция, которая сабмитит() нашу форму. У ее target хранятся наши value со всех input. И при чем обработчик висит на теге form, а не на компоненте Button. И при это срабатывает при нажаите на Button
  const addJournalItem = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);

    // Переменная, которая если остается true, то сабмити форму
    let isFromValid = true;

    // Условие на проверку заполнение формы(input под name title)
    if (!formProps.title?.trim().length) {
      setFormValidState((state) => ({ ...state, title: false }));
      isFromValid = false;
    } else {
      setFormValidState((state) => ({ ...state, title: true }));
    }
    if (!formProps.text?.trim().length) {
      setFormValidState((state) => ({ ...state, text: false }));
      isFromValid = false;
    } else {
      setFormValidState((state) => ({ ...state, text: true }));
    }
    if (!formProps.date) {
      setFormValidState((state) => ({ ...state, date: false }));
      isFromValid = false;
    } else {
      setFormValidState((state) => ({ ...state, date: true }));
    }

    // Проверка результата isFormValid, после проверок на валидность всех input (кроме input с name "tag", он не нужен)
    if (!isFromValid) {
      return;
    }
    onSubmit(formProps);
    // console.log(formProps);
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <input
        type="text"
        name="title"
        className={`${styles["input"]} ${
          formValidState.title ? "" : styles["invalid"]
        }`}
      />
      <input
        type="date"
        name="date"
        className={`${styles["input"]} ${
          formValidState.date ? "" : styles["invalid"]
        }`}
      />
      <input type="text" name="tag" className={styles["input"]} />
      <textarea
        name="text"
        id=""
        cols="30"
        rows="10"
        className={`${styles["input"]} ${
          formValidState.text ? "" : styles["invalid"]
        }`}
      ></textarea>
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

// Props onSubmit - содержит функцию addItem из компонента App.jsx. Закидываем ее в функцию сабмита наших данных.
