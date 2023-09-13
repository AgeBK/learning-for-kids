import React, { useState } from "react";
import styles from "./Records.module.css";

function Records({ props }) {
  console.log(props);
  const { results, userName, operation } = props;
  const [showAll, setShowAll] = useState(false);
  let top10Results = [];

  let data = JSON.parse(localStorage.getItem("learning-for-kids")) || [];
  const currentDate = Date().split(" ").slice(0, 5).toString();

  const sortRecords = (arr) => {
    return arr
      .sort((a, b) => (a.correct > b.correct ? -1 : 1))
      .map((val, ind) => {
        val.position = ind + 1;
        return val;
      }); // TODO: 1 liner for map??
  };

  const currentResults = [
    {
      date: currentDate,
      name: userName,
      challenge: operation,
      answered: results.length,
      correct: results.filter(({ answer, userAnswer }) => answer === userAnswer)
        .length,
      wrong: results.filter(({ answer, userAnswer }) => answer !== userAnswer)
        .length,
    },
  ];

  console.log(currentResults);

  const arr = sortRecords([...data, ...currentResults]);
  console.log(arr);

  const pos = arr.findIndex((val) => val.date === currentDate);
  console.log("Postion: " + pos);

  top10Results = arr.filter((_, ind) => ind < 10);
  console.log(top10Results);

  // const onCompleteMusic = new Audio(pos < 10 ? cheer : fail);
  // onCompleteMusic.play();

  localStorage.setItem("learning-for-kids", JSON.stringify(arr));
  // localStorage.setItem("learning-for-kids", JSON.stringify(mathRecords));

  data = showAll ? arr : top10Results;

  const sortByDate = () => {};

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
      <h2 className={styles.hdr}>Records</h2>
      <div className={styles.recordContainer}>
        <div className={styles.recordHdrs}>
          <span className={styles.position}>position</span>
          <span className={styles.name}>name</span>
          <span className={styles.challenge}>challenge</span>
          <span className={styles.answered}>answered</span>
          <span className={styles.correct}>correct</span>
          <span className={styles.wrong}>wrong</span>
          <span className={styles.date}>
            <button className={styles.dateBtn} onClick={sortByDate}>
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
