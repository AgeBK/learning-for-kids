import React from "react";
import styles from "./Button.module.css";

export const Button = ({ children, css, onClick }) => (
  <button className={`${styles.button} ${styles[css]}`} onClick={onClick}>
    {children}
  </button>
);
