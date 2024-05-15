import React, { useContext } from "react";
import sun from "../Assets/images/icon-sun.svg";
import moon from "../Assets/images/icon-moon.svg";
import Styles from "../Assets/css/app.module.css";
import { DataContext } from "../Context/ContextAPI";

const Header = () => {
  const { lightmode, setLightMode } = useContext(DataContext);

  return (
    <header>
      <h1 className={Styles.title}>TODO</h1>
      {lightmode ? (
        <img src={moon} alt="" onClick={() => setLightMode(false)} />
      ) : (
        <img src={sun} alt="" onClick={() => setLightMode(true)} />
      )}
    </header>
  );
};

export default Header;
