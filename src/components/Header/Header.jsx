// import styles from "./Header.module.css";
import SelectUser from "../SelectUser/SelectUser";
import Button from "../Button/Button";
import { useState } from "react";
import Logo from "../Logo/Logo";

const logos = ["/logo.svg", "/vite.svg"];

function Header() {
  const [logoIndex, setLogoIndex] = useState(0);

  const toggleLogo = () => {
    setLogoIndex((state) => Number(!state));
    console.log(logoIndex);
  };

  return (
    <>
      <Logo image={logos[logoIndex]} />
      <SelectUser />
      <Button onClickk={toggleLogo}>Сменить логотип</Button>
    </>
  );
}

export default Header;
