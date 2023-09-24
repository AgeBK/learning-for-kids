import React from "react";
import styles from "./Loading.module.css";

const Loading = () => (
  <div className={styles.loaderCont}>
    <div className={styles.loader}></div>
  </div>
);

export default Loading;
