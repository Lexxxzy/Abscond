import React, { useState } from "react";
import cn from "classnames";
import styles from "./DateSingle.module.sass";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import Icon from "../Icon";

const DateSingle = ({
  className,
  icon,
  description,
  placeholder,
  displayFormat,
  small,
  date,
  setDate,
  bodyDown,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={cn(
        className,
        { small: small },
        { bodyDown: bodyDown },
        { [styles.small]: small },
        styles.date
      )}
    >
      <div className={styles.head}>
        <div className={styles.box}>
          <div className={styles.icon}>
            <Icon name={icon} size="24" />
          </div>
          {description && (
            <div className={styles.description}>{description}</div>
          )}
        </div>
        <SingleDatePicker
          placeholder={placeholder}
          date={date}
          onDateChange={(date) => setDate(date)}
          focused={focused}
          onFocusChange={({ focused }) => setFocused(focused)}
          id="date-single"
          displayFormat={displayFormat}
          readOnly
          noBorder
          numberOfMonths={1}
        />
      </div>
    </div>
  );
};

export default DateSingle;
