// import styles from "./JournalForm.module.css";
// import Button from "../Button/Button";
// import { useContext, useEffect, useReducer, useRef } from "react";
// import { INITIAL_STATE, formReducer } from "./JournalForm.state";
// import Input from "../Input/Input";
// import cn from "classnames";
// import { UserContext } from "../../context/user.context";

// function JournalForm({ onSubmit }) {
//   const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
//   const { isValid, isFormReadyToSubmit, values } = formState;
//   const titleRef = useRef();
//   const dateRef = useRef();
//   const postRef = useRef();
//   const { userId } = useContext(UserContext);

//   const focusError = (isValid) => {
//     switch (true) {
//       case !isValid.title:
//         titleRef.current.focus();
//         break;
//       case !isValid.date:
//         dateRef.current.focus();
//         break;
//       case !isValid.post:
//         postRef.current.focus();
//         break;
//     }
//   };

//   useEffect(() => {
//     let timerId;
//     if (!isValid.date || !isValid.post || !isValid.title) {
//       focusError(isValid);
//       timerId = setTimeout(() => {
//         dispatchForm({ type: "RESET_VALIDITY" });
//       }, 2000);
//     }
//     return () => {
//       clearTimeout(timerId);
//     };
//   }, [isValid]);

//   useEffect(() => {
//     if (isFormReadyToSubmit) {
//       onSubmit(values);
//       dispatchForm({ type: "CLEAR" });
//     }
//   }, [isFormReadyToSubmit, values, onSubmit]);

//   useEffect(() => {
//     dispatchForm({
//       type: "SET_VALUE",
//       payload: { userId },
//     });
//   }, [userId]);

//   const onChange = (event) => {
//     dispatchForm({
//       type: "SET_VALUE",
//       payload: { [event.target.name]: event.target.value },
//     });
//   };

//   const addJournalItem = (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const formProps = Object.fromEntries(formData);
//     dispatchForm({ type: "SUBMIT", payload: formProps });
//   };

//   return (
//     <form className={styles["journal-form"]} onSubmit={addJournalItem}>
//       {userId}
//       <div>
//         <Input
//           ref={titleRef}
//           type="text"
//           name="title"
//           value={values.title}
//           onChange={onChange}
//           appearence="title"
//           isValid={isValid.title}
//         />
//       </div>

//       <div className={styles["form-row"]}>
//         <label htmlFor="date" className={styles["form-label"]}>
//           <img src="/calendar.svg" alt="Иконка календаря" />
//           <span>Дата</span>
//         </label>
//         <Input
//           ref={dateRef}
//           type="date"
//           name="date"
//           value={values.date}
//           id="date"
//           onChange={onChange}
//           isValid={isValid.date}
//         />
//       </div>

//       <div className={styles["form-row"]}>
//         <label htmlFor="tag" className={styles["form-label"]}>
//           <img src="/folder.svg" alt="Иконка папки" />
//           <span>Метки</span>
//         </label>
//         <Input
//           type="text"
//           name="tag"
//           onChange={onChange}
//           value={values.tag}
//           id="tag"
//         />
//       </div>

//       <textarea
//         ref={postRef}
//         name="post"
//         id=""
//         value={values.post}
//         cols="30"
//         rows="10"
//         onChange={onChange}
//         className={cn(styles["input"], {
//           [styles["invalid"]]: !isValid.post,
//         })}
//       ></textarea>
//       <Button text="Сохранить" onClick={() => console.log("Нажали")} />
//     </form>
//   );
// }

// export default JournalForm;
