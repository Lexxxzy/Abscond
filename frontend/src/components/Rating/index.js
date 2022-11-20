import React from "react";
// import cn from "classnames";
import styles from "./Rating.module.sass";
import Rating from "react-rating";

const Form = ({ className, initialRating, readonly }) => {
  return (
    <Rating
      className={className}
      initialRating={initialRating}
      readonly={readonly}
      emptySymbol={
        <img
          src="/images/content/rating-star.svg"
          className={styles.star}
          alt=""
        />
      }
      fullSymbol={
        <img
          src="/images/content/rating-star-fill.svg"
          className={styles.star}
          alt=""
        />
      }
    />
  );
};

export default Form;
