import React from "react";
import styles from "./RandomColour.module.css";

export const RandomColour = ({ children }) => {
  const hexDigits = "0123456789abcdef";
  let colour = "#";
  for (var i = 0; i < 6; i++) {
    colour += hexDigits[Math.floor(Math.random() * 16)];
  }
  return (
    <span style={{ color: colour }} className={styles.shadow}>
      {children}
    </span>
  );
};
