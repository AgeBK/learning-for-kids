import React from "react";
import Maths from "./components/Maths";
import { Section } from "./containers/Section";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.contInner}>
        <Section>
          <h1 className={styles.header}>Learning for kids</h1>
        </Section>
        <main>
          <Maths />
          {/* <Spelling /> */}
        </main>
      </div>
    </div>
  );
}

export default App;
