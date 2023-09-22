import React, { memo } from "react";
import { Button } from "../../containers/Button";
import { Section } from "../../containers/Section";
import { RandomColour } from "../../containers/RandomColour";
import styles from "./User.module.css";

const User = ({ setUserName, userName, setStep1, step1 }) => {
  console.log("User");

  const handleStep1 = (e) => {
    if ((e.key === "Enter" || e.type === "click") && userName.length > 0) {
      setStep1(true);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setUserName(value[0].toUpperCase() + value.slice(1));
  };

  const Header = () => (
    <Section>
      <h2 onClick={() => setStep1(false)}>
        <RandomColour>{userName}</RandomColour>
      </h2>
    </Section>
  );

  const User = () => (
    <Section>
      <input
        onChange={handleChange}
        onKeyDown={handleStep1}
        type="text"
        placeholder="Enter name"
        value={userName}
        autoFocus
        maxLength="10"
        className={styles.input}
      />
      <Button onClick={handleStep1}>Go!!</Button>
    </Section>
  );

  return step1 ? <Header /> : <User />;
};

export default memo(User);
