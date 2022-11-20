import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import Icon from "../Icon";

const Item = ({ className, item, row, car }) => {
  return (
    <Link
      className={cn(
        className,
        styles.card,
        { [styles.row]: row },
        { [styles.car]: car }
      )}
      to={item.url}
    >
      <div className={styles.preview}>
        <img srcSet={`${item.srcSet} 2x`} src={item.src} alt="Nature" />
        {item.categoryText && (
          <div
            className={cn(
              "category",
              { "category-blue": item.category === "blue" },
              styles.category
            )}
          >
            {item.categoryText}
          </div>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.line}>
          <div className={styles.title}>{item.title}</div>
          <div className={styles.price}>
            <div className={styles.old}>{item.priceOld}</div>
            <div className={styles.actual}>{item.priceActual}</div>
          </div>
        </div>
        <div className={styles.options}>
          {item.options.map((x, index) => (
            <div className={styles.option} key={index}>
              <Icon name={x.icon} size="16" />
              {x.title}
            </div>
          ))}
        </div>
        <div className={styles.foot}>
          {item.comment && (
            <div className={styles.comment}>
              <div className={styles.avatar}>
                <img src={item.avatar} alt="Avatar" />
              </div>
              <div className={styles.text}>{item.comment}</div>
            </div>
          )}
          <div className={styles.flex}>
            <div className={styles.cost}>{item.cost}</div>
            <div className={styles.rating}>
              <Icon name="star" size="12" />
              <span className={styles.number}>{item.rating}</span>
              <span className={styles.review}>({item.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Item;
