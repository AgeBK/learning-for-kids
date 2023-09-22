import React, { useState, useEffect, memo } from "react";
import { Button } from "../../containers/Button";
import { Section } from "../../containers/Section";
import styles from "./Records.module.css";

function Records({ position }) {
  console.log("Records");

  const [mathRecords, setMathRecords] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [orderByDate, setOrderByDate] = useState(false);
  let records = [...mathRecords];
  let totalRecords = records.length;
  let top10Results = [];

  console.log(position);

  useEffect(() => {
    console.log("Records UE data");
    const records = JSON.parse(localStorage.getItem("learning-for-kids")) || [];
    console.log(records);
    setMathRecords(records);
  }, [position]);

  if (orderByDate) {
    records = records.sort((a, b) =>
      Number(new Date(a.date)) - Number(new Date(b.date)) < 0 ? 1 : -1
    );
  } else {
    records = records.sort((a, b) => (a.position - b.position < 0 ? -1 : 1));
  }

  top10Results = [...records].filter((_, ind) => ind < 10);
  let data = showAll ? records : top10Results;

  const FormatDate = ({ date }) => {
    const todayArr = Date().split(" ").slice(1, 4);
    const fmtTodayStr = `${todayArr[1]} ${todayArr[0]} ${todayArr[2]}`;
    const dtArr = date.split(",");
    const dtStr = `${dtArr[2]} ${dtArr[1]} ${dtArr[3]}`;

    return fmtTodayStr === dtStr ? (
      <div className={styles.today}>{dtStr}</div>
    ) : (
      dtStr
    );
  };

  return (
    <Section>
      <h3 className={styles.hdr}>Records</h3>
      <div className={styles.allTotal}>{<>Total: {totalRecords} </>}</div>
      {position && (
        <div className={styles.placed}>
          You placed <span className={styles.correct}>{position}</span>/
          {totalRecords}
        </div>
      )}
      <Button onClick={() => setShowAll(!showAll)} css={styles.btn}>
        {showAll ? "Top 10 " : "Show all"}
      </Button>
      <div className={styles.recordContainer}>
        <div className={styles.recordHdrs}>
          <span className={styles.position}>position</span>
          <span className={styles.name}>name</span>
          <span className={styles.challenge}>challenge</span>
          <span className={styles.answered}>answered</span>
          <span className={styles.correct}>correct</span>
          <span className={styles.wrong}>wrong</span>
          <span className={styles.date}>
            <Button
              css={orderByDate ? "recordDateBtnOff" : "recordDateBtn"}
              onClick={() => setOrderByDate(!orderByDate)}
            >
              date
            </Button>
          </span>
        </div>

        {data?.map((val, ind) => (
          <div
            key={ind}
            className={`${styles.records} 
            ${ind === 0 && styles.hdrRow}            
            ${val.position === 1 && styles.champ} 
            ${val.position === position && styles.current} 
            ${ind === 10 && styles.cutOff} `}
          >
            <span className={styles.position}>{val.position}</span>
            <span className={styles.name}>{val.name}</span>
            <span className={styles.challenge}>{val.challenge}</span>
            <span className={styles.answered}>{val.answered}</span>
            <span className={styles.correct}>{val.correct}</span>
            <span className={styles.wrong}>{val.wrong}</span>
            <span className={styles.date}>
              <FormatDate date={val.date} />
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default memo(Records);
