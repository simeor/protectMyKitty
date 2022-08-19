import React from "react";
import Logo from "./logo.gif";
import style from "./styles.module.css";

const Navbar = () => {
  return (
    <nav className={style.wrapper}>
      <div className="flex">
        <img src={Logo} width={70} alt="logo" />
        <h2>Protect my kitty</h2>
      </div>
      <div className={style.linkContainer}>
        <p>Demo</p>
        <p>Start</p>
        <p>Results</p>
      </div>
    </nav>
  );
};

export default Navbar;
