import React from "react";
import styles from "./RandomColour.module.css";

export const RandomColour = ({ children }) => {
  const getColour = () => {
    const hexChars = "0123456789abcdef";
    let colour = "#";
    for (var i = 0; i < 6; i++) {
      colour += hexChars[Math.floor(Math.random() * 16)];
    }
    return colour;
  };

  return (
    <>
      {[...children.toString()].map((val, ind) => (
        <span
          style={{ color: getColour() }}
          className={styles.shadow}
          key={ind}
        >
          {val}
        </span>
      ))}
    </>
  );
};
