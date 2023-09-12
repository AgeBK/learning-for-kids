import React from "react";
import styles from "./User.module.css";

const User = ({ props }) => {
  const { setUserName, userName, setStep1, step1 } = props;

  const user = (
    <div className={styles.container}>
      <input
        className={styles.input}
        onChange={(e) => setUserName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && setStep1(true)}
        type="text"
        placeholder="Enter name"
        value={userName}
        autoFocus
      />
      <button className={styles.btn} onClick={() => setStep1(true)}>
        Enter
      </button>
    </div>
  );

  return !step1 ? user : null;
};

export default User;
