import React from "react";
import cn from "classnames";
import styles from "./Counter.module.sass";
import Icon from "../Icon";

const Counter = ({ className, value, setValue, iconMinus, iconPlus }) => {
  return (
    <div className={cn(className, styles.counter)}>
      <button
        className={cn(styles.button, { [styles.disabled]: value === 0 })}
        onClick={() => setValue(value - 1)}
      >
        <Icon name={iconMinus} size="24" />
      </button>
      <div className={styles.number}>{value}</div>
      <button className={styles.button} onClick={() => setValue(value + 1)}>
        <Icon name={iconPlus} size="24" />
      </button>
    </div>
  );
};

export default Counter;
