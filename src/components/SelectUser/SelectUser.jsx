// import styles from "./SelectUser.module.css";

import { useContext } from "react";
import { UserContext } from "../../context/userContext";

function SelectUser() {
  const { userId, setUserId } = useContext(UserContext);
  const changeUser = (event) => {
    setUserId(event.target.value);
  };
  return (
    <select name="user" id="user" value={userId} onChange={changeUser}>
      <option value="1">Anton</option>
      <option value="2">Alina</option>
    </select>
  );
}

export default SelectUser;
