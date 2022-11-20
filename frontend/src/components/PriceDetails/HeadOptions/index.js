import React from "react";
import cn from "classnames";
import styles from "./HeadOptions.module.sass";

const HeadOptions = ({ className, title, logo }) => {
  return (
    <div className={cn(className, styles.head)}>

      <div className={styles.title}>{title}</div>
      <div className={styles.author}>
        <div className={styles.logo}>
          <img src={logo} alt="Avia" />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.header}>Airline</div>
          <div className={styles.text}>Air New Zeland</div>
        </div>
      </div>
    </div>
  );
};

export default HeadOptions;
