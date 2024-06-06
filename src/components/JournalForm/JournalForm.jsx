import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useContext, useEffect, useReducer, useRef } from "react";
import cn from "classnames";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";
import Input from "../Input/Input";
import { UserContext } from "../../context/userContext";

function JournalForm({ onSubmit, data, onDelete }) {
  // Состояние, которое отвечает за валидность формы
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  // Хуки для привязки фокуса к input
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();
  const { userId } = useContext(UserContext);

  // Функция, которая навешивает focus на тот input, который не прошел валидацию
  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
    }
  };

  // Этот диспатч прокидывает наши данные в форму. Если наша data появилась или изменилась. Благодаря этому у нас при клике по записи данные высвечиваются на самой форме.
  useEffect(() => {
    if (!data) {
      dispatchForm({ type: "CLEAR" });
      dispatchForm({ type: "SET_VALUE", payload: { userId } });
    }
    dispatchForm({ type: "SET_VALUE", payload: { ...data } });
  }, [data]);

  // Функция, которая при изменение formValidState меняет его обратно в true. (Input при ошибке красятся в красный и через 2сек возвращаются обратно)
  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.text || !isValid.title) {
      // Тут применяется фокус, если на како-то input валидация не пройдена
      focusError(isValid);
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
      dispatchForm({ type: "CLEAR" });
      dispatchForm({ type: "SET_VALUE", payload: { userId } });
    }
  }, [isFormReadyToSubmit, values, onSubmit, userId]);

  // Эффект, который будет тригириться на изменение userId
  useEffect(() => {
    dispatchForm({ type: "SET_VALUE", payload: { userId } });
  }, [userId]);

  // Функция, которая устанавливает значения в наши Input
  const onChange = (event) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { [event.target.name]: event.target.value },
    });
  };

  //Функция, которая сабмитит() нашу форму. У ее target хранятся наши value со всех input. И при чем обработчик висит на теге form, а не на компоненте Button. И при это срабатывает при нажаите на Button
  // Функция, которая устанавливает значения наших input
  const addJournalItem = (event) => {
    event.preventDefault();
    dispatchForm({ type: "SUBMIT" });
    // console.log(formProps);
  };

  // Функция, которая очищает форму после удаления записи
  const deleteJournalItem = () => {
    onDelete(data.id);
    dispatchForm({ type: "CLEAR" });
    dispatchForm({ type: "SET_VALUE", payload: { userId } });
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      {/* Title */}
      <div className={styles["form-row"]}>
        <Input
          type="text"
          name="title"
          ref={titleRef}
          onChange={onChange}
          value={values.title}
          appearence="title"
          isValid={isValid.title}
        />
        {data?.id && (
          <button
            className={styles.delete}
            type="button"
            onClick={deleteJournalItem}
          >
            Delete
          </button>
        )}
      </div>
      {/* Date */}
      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-label"]}>
          <img src="/calendar.svg" alt="Календарь" />

          <span>Дата</span>
        </label>

        <Input
          type="date"
          name="date"
          id="date"
          ref={dateRef}
          onChange={onChange}
          value={
            values.date ? new Date(values.date).toISOString().slice(0, 10) : ""
          }
          isValid={isValid.date}
        />
      </div>
      {/* Tag */}
      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-label"]}>
          <img src="/folder.svg" alt="Папка" />

          <span>Метки</span>
        </label>

        <Input
          type="text"
          id="tag"
          name="tag"
          onChange={onChange}
          value={values.tag}
        />
      </div>
      {/* Text */}
      <textarea
        name="text"
        id=""
        cols="30"
        rows="10"
        ref={textRef}
        onChange={onChange}
        value={values.text}
        className={cn(styles["input"], {
          [styles["invalid"]]: !isValid.text,
        })}
      ></textarea>
      {/* <Button
        textButtonSave="Сохранить"
        onClickk={() => {
          console.log("Нажали на кнопку Сохранить");
        }}
      /> */}
      <Button
        onClickk={() => {
          console.log("Нажали на кнопку Сохранить");
        }}
      >
        Сохранить
      </Button>
    </form>
  );
}

export default JournalForm;

// Props onSubmit - содержит функцию addItem из компонента App.jsx. Закидываем ее в функцию сабмита наших данных.
// data - это props, который приходят из App.js. Оно содержит в себе selectedItem - а он ссылается на те данные, по которым мы кликнули из списка записей
