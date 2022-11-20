import React from "react";
import cn from "classnames";
import styles from "./PriceDetails.module.sass";
import HeadOptions from "./HeadOptions";
import Icon from "../Icon";


const PriceDetails = ({
  className,
  title,
  items,
  table,
  logo
}) => {
  return (
    <div className={cn(className, styles.price)}>
      <HeadOptions className={styles.head} title={title} logo={logo}/>
      <div
        className={cn(styles.description, {
          [styles.flex]: items.length > 1,
        })}
      >
        {items.map((x, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.icon}>
              <Icon name={x.icon} size="24" />
            </div>
            <div className={styles.box}>
              <div className={styles.category}>{x.category}</div>
              <div className={styles.subtitle}>{x.title}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.body}>
        <div className={styles.stage}>Price</div>
        <div className={styles.table}>
          {table.map((x, index) => (
            <div className={styles.row} key={index}>
              <div className={styles.cell}>{x.title} </div>
              <div className={styles.cell}>{(x.value).toString().includes("₽") ? x.value : `₽${x.value}`} </div>
            </div>
          ))}
          <div className={styles.row}>
          <div className={styles.cell}>Overall (rub.)</div>
           <div className={styles.cell}>{table.length === 3 ? table[0].value + table[1].value : table[0].value}</div>
          </div>
        </div>
      </div>
      <div className={styles.note}>
        <Icon name="coin" size="12" />
        Free cancellation during the day
      </div>
    </div>
  );
};

export default PriceDetails;
