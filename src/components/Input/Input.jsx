import { forwardRef } from "react";
import styles from "./Input.module.css";
import cn from "classnames";

const Input = forwardRef(function Input(
  { className, isValid = true, appearence, ...props },
  ref
) {
  return (
    <input
      {...props}
      ref={ref}
      className={cn(className, styles["input"], {
        [styles["invalid"]]: !isValid,
        [styles["input-title"]]: appearence === "title",
      })}
    />
  );
});

export default Input;

{
  /* <input
  type="text"
  name="title"
  ref={titleRef}
  onChange={onChange}
  value={values.title}
  className={cn(styles["input-title"], {
    [styles["invalid"]]: !isValid.title,
  })}
/>; */
}
// Props 1) className = это логика применения стилей(), 2) isValid = пришел из JournalForm, через него мы сможем выбрать нужный нам input,
// 3) appearence = это вид нашего input, у нас есть ["input-title"] и ["input"] 4) props - Это все остальное 5) ref - Это рефы, которые мы создали в JournalForm
