import React, { useState, useEffect, memo } from "react";
import { Button } from "../../containers/Button";
import { Section } from "../../containers/Section";
import styles from "./Records.module.css";

function Records({ position, recordData }) {
  // console.log("Records");

  const [mathRecords, setMathRecords] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [orderByDate, setOrderByDate] = useState(false);
  let records = [...mathRecords];
  let totalRecords = records.length;
  let top10Results = [];

  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem(recordData)) || [];
    setMathRecords(storedRecords);
  }, [position, recordData]);

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
        {data?.map(
          (
            { position: pos, name, challenge, answered, correct, wrong, date },
            ind
          ) => (
            <div
              key={ind}
              className={`${styles.records} 
            ${ind === 0 ? styles.hdrRow : ""}            
            ${pos === 1 ? styles.champ : ""} 
            ${pos === position ? styles.current : ""} `}
            >
              <span className={styles.position}>{pos}</span>
              <span className={styles.name}>{name}</span>
              <span className={styles.challenge}>{challenge}</span>
              <span className={styles.answered}>{answered}</span>
              <span className={styles.correct}>{correct}</span>
              <span className={styles.wrong}>{wrong}</span>
              <span className={styles.date}>
                <FormatDate date={date} />
              </span>
            </div>
          )
        )}
      </div>
    </Section>
  );
}

export default memo(Records);
