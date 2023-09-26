import React from "react";
import styles from "./ImageList.module.css";

function ImageList({data}) {
  if (data.length > 0) {
    return (
      <ul className={styles.list}>
        {data.map(({ id, urls: { thumb }, alt_description }) => {
          return (
            <li className={styles.listItem} key={id}>
              <img src={thumb} alt={alt_description} />
            </li>
          );
        })}
      </ul>
    );
  }
  return null;
}

export default ImageList;
