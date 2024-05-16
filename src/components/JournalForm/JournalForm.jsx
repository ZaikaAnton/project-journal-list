import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useEffect, useReducer } from "react";
import cn from "classnames";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";

function JournalForm({ onSubmit }) {
  // Состояние, которое отвечает за валидность формы
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;

  // Функция, которая при изменение formValidState меняет его обратно в true. (Input при ошибке красятся в красный и через 2сек возвращаются обратно)
  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.text || !isValid.title) {
      timerId = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 2000);
    }
    // Очищение эффекта после рендера. Это нужно чтоб эффект с покраской input не зависал, не исполнялся по многу раз при большом нажатии на кнопку. То есть мы снова менее чем за 2сек нажимаем на кнопку, тут срабатывает этот return чтоб не завершать функцию сверху и тем самым не задваивает эффект.
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  // Если функция готова к Submit, то исполняется эта функция.
  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
    }
  }, [isFormReadyToSubmit]);

  //Функция, которая сабмитит() нашу форму. У ее target хранятся наши value со всех input. И при чем обработчик висит на теге form, а не на компоненте Button. И при это срабатывает при нажаите на Button
  // Функция, которая устанавливает значения наших input
  const addJournalItem = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    dispatchForm({ type: "SUBMIT", payload: formProps });
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
            [styles["invalid"]]: !isValid.title,
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
            [styles["invalid"]]: !isValid.date,
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
          [styles["invalid"]]: !isValid.text,
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
