import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useState, useEffect } from "react";
import cn from "classnames";

const INITIAL_STATE = {
  title: true,
  text: true,
  date: true,
};

function JournalForm({ onSubmit }) {
  // Состояние, которое отвечает за валидность формы
  const [formValidState, setFormValidState] = useState(INITIAL_STATE);

  // Функция, которая при изменение formValidState меняет его обратно в true. (Input при ошибке красятся в красный и через 2сек возвращаются обратно)
  useEffect(() => {
    let timerId;
    if (!formValidState.date || !formValidState.text || !formValidState.title) {
      timerId = setTimeout(() => {
        setFormValidState(INITIAL_STATE);
      }, 2000);
    }
    // Очищение эффекта после рендера. Это нужно чтоб эффект с покраской input не зависал, не исполнялся по многу раз при большом нажатии на кнопку. То есть мы снова менее чем за 2сек нажимаем на кнопку, тут срабатывает этот return чтоб не завершать функцию сверху и тем самым не задваивает эффект.
    return () => {
      clearTimeout(timerId);
    };
  }, [formValidState]);

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
      {/* Title */}
      <div>
        <input
          type="text"
          name="title"
          className={cn(styles["input-title"], {
            [styles["invalid"]]: !formValidState.title,
          })}
        />
      </div>
      {/* Date */}
      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-label"]}>
          <img src="/calendar.svg" alt="Календарь" />

          <span>Дата</span>
        </label>

        <input
          type="date"
          name="date"
          id="date"
          className={cn(styles["input"], {
            [styles["invalid"]]: !formValidState.date,
          })}
        />
      </div>
      {/* Tag */}
      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-label"]}>
          <img src="/folder.svg" alt="Папка" />

          <span>Метки</span>
        </label>

        <input type="text" id="tag" name="tag" className={styles["input"]} />
      </div>
      {/* Text */}
      <textarea
        name="text"
        id=""
        cols="30"
        rows="10"
        className={cn(styles["input"], {
          [styles["invalid"]]: !formValidState.text,
        })}
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
