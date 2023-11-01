import { useState } from "react";
import Learning from "./components/Learning";
import { Section } from "./containers/Section";
import styles from "./App.module.css";

function App() {
  const [spellingBG, setSpellingBG] = useState(false);

  return (
    <div className={`${styles.container} ${spellingBG ? styles.spelling : ""}`}>
      <article className={styles.contInner}>
        <Section>
          <h1 className={styles.header}>Learning for kids</h1>
        </Section>
        <main>
          <Learning setSpellingBG={setSpellingBG} />
        </main>
      </article>
    </div>
  );
}

export default App;
