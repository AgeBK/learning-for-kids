import React from "react";
import styles from "./User.module.css";

const User = ({ props }) => {
  const { setUserName, userName, setStep1, step1 } = props;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && userName.length > 0) {
      setStep1(true);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setUserName(value[0].toUpperCase() + value.slice(1));
  };

  const user = (
    <div className={styles.container}>
      <input
        className={styles.input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Enter name"
        value={userName}
        autoFocus
        maxLength="10"
      />
      <button
        className={styles.btn}
        onClick={() => userName.length && setStep1(true)}
      >
        Enter
      </button>
    </div>
  );

  return !step1 ? user : null;
};

export default User;
