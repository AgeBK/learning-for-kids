import React from "react";
import styles from "./App.module.css";
import Maths from "./components/Maths";
import Spelling from "./components/Spelling";
import Timer from "./components/Timer";
import Records from "./components/Records";

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.contInner}>
        <header className={styles.subCont}>
          <h1 className={styles.header}>Learning for kids</h1>
        </header>
        <main>
          <Maths />
          {/* <Timer /> */}
          <Spelling />
          {/* <Records /> */}
        </main>
      </div>
    </div>
  );
}

export default App;
