import { memo } from "react";
import { Button } from "../../containers/Button";
import { Section } from "../../containers/Section";
import { RandomColour } from "../../containers/RandomColour";
import styles from "./User.module.css";

function User({ setUserName, userName, setStep1, step1 }) {
  const handleStep1 = (e) => {
    if ((e.key === "Enter" || e.type === "click") && userName.length > 0) {
      setStep1(true);
    }
  };

  const handleChange = ({ target: { value } }) =>
    value
      ? setUserName(value[0].toUpperCase() + value.slice(1))
      : setUserName("");

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
        id="inputUserName"
        className={styles.input}
        aria-label="Enter name"
      />
      <Button onClick={handleStep1}>Go!!</Button>
    </Section>
  );

  return step1 ? <Header /> : <User />;
}

export default memo(User);
