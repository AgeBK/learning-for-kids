import React from "react";
import { Section } from "../../containers/Section";
// import styles from "./User.module.css";

const User = ({ props }) => {
  const { setUserName, userName, setStep1, step1, RandomColour } = props;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && userName.length > 0) {
      setStep1(true);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setUserName(value[0].toUpperCase() + value.slice(1));
  };

  const Header = (
    <Section>
      <h2 onClick={() => setStep1(false)}>
        <RandomColour>{userName}</RandomColour>
      </h2>
    </Section>
  );

  const User = (
    <Section>
      <input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Enter name"
        value={userName}
        autoFocus
        maxLength="10"
      />
      <button onClick={() => userName.length && setStep1(true)}>Enter</button>
    </Section>
  );

  return step1 ? Header : User;
};

export default User;
