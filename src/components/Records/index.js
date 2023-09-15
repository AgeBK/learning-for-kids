import React, { useState, useEffect } from "react";
import styles from "./Records.module.css";

function Records({ position }) {
  console.log("Records");

  // const [data, setData] = useState([]);
  const [mathRecords, setMathRecords] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [orderByDate, setOrderByDate] = useState(false);
  let records = [...mathRecords];
  let top10Results = [];

  console.log(position);

  useEffect(() => {
    console.log("Records UE data");
    const records = JSON.parse(localStorage.getItem("learning-for-kids")) || [];
    console.log(records);
    setMathRecords(records);
  }, []);

  if (orderByDate) {
    records = records.sort((a, b) =>
      Number(new Date(a.date)) - Number(new Date(b.date)) < 0 ? 1 : -1
    );
  } else {
    records = records.sort((a, b) => (a.position - b.position < 0 ? -1 : 1));
  }

  top10Results = [...records].filter((_, ind) => ind < 10);
  console.log(top10Results);
  let data = showAll ? records : top10Results;

  const FormatDate = ({ date }) => {
    const today = Date().split(" ").slice(1, 4);
    const fmtDate = `${today[1]} ${today[0]} ${today[2]}`;

    const dtArr = date.split(",");
    if (fmtDate === `${dtArr[2]} ${dtArr[1]} ${dtArr[3]}`) {
      return (
        <div className={styles.today}>
          {`${dtArr[2]} ${dtArr[1]} ${dtArr[3]}`}
        </div>
      );
    }
    return `${dtArr[2]} ${dtArr[1]} ${dtArr[3]}`;
  };

  return (
    <section className={styles.subCont}>
      <h3 className={styles.hdr}>Records</h3>
      <div className={styles.allTotal}>{<>Total: {data.length} </>}</div>
      <button className={styles.btn} onClick={() => setShowAll(!showAll)}>
        {/*// TODO:  */}
        {showAll ? "Top 10 " : "Show all"}
      </button>
      <div className={styles.recordContainer}>
        <div className={styles.recordHdrs}>
          <span className={styles.position}>position</span>
          <span className={styles.name}>name</span>
          <span className={styles.challenge}>challenge</span>
          <span className={styles.answered}>answered</span>
          <span className={styles.correct}>correct</span>
          <span className={styles.wrong}>wrong</span>
          <span className={styles.date}>
            <button
              className={styles.dateBtn}
              onClick={() => setOrderByDate(!orderByDate)}
            >
              date
            </button>
          </span>
        </div>

        {/* ${val.date === recordDate && styles.current} */}

        {data?.map((val, ind) => (
          <div
            key={ind}
            className={`${styles.records} ${ind === 0 && styles.hdrRow} ${
              ind > 0 && ind % 2 && styles.altRow
            }  ${val.position === 1 && styles.champ} 
            ${val.position === position && styles.champ} 
            ${ind === 10 && styles.cutOff} ${ind > 9 && styles.cutOff10}`}
          >
            <span className={styles.position}>{val.position}</span>
            <span className={styles.cap}>{val.name}</span>
            <span className={styles.cap}>{val.challenge}</span>
            <span className={styles.answered}>{val.answered}</span>
            <span className={styles.correct}>{val.correct}</span>
            <span className={styles.wrong}>{val.wrong}</span>
            <span className={styles.date}>
              <FormatDate date={val.date} />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default React.memo(Records);
