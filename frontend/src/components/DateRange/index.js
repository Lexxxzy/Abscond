import React, { useState } from "react";
import cn from "classnames";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import styles from "./DateRange.module.sass";
import Icon from "../Icon";

const DateRange = ({
  className,
  icon,
  description,
  startDatePlaceholderText,
  endDatePlaceholderText,
  displayFormat,
  small,
  bodyDown,
  setStartDate,
  setEndDate,
  startDate,
  endDate
}) => {
  
  const [focusedInput, setFocusedInput] = useState(startDate);

  const orientation = window.matchMedia("(max-width: 400px)").matches
    ? "vertical"
    : "horizontal";

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
        <div className={styles.list}>
          <div className={styles.box}>
            <div className={styles.icon}>
              <Icon name={icon} size="24" />
            </div>
            {description && (
              <div className={styles.description}>{description}</div>
            )}
          </div>
          <div className={styles.box}>
            <div className={styles.icon}>
              <Icon name={icon} size="24" />
            </div>
            <div className={styles.description}>{description}</div>
          </div>
        </div>
        <DateRangePicker
          startDatePlaceholderText={startDatePlaceholderText}
          endDatePlaceholderText={endDatePlaceholderText}
          readOnly
          noBorder
          startDate={startDate}
          startDateId="your_unique_start_date_id"
          endDate={endDate}
          endDateId="your_unique_end_date_id"
          onDatesChange={({ startDate, endDate }) => {
            setStartDate(startDate);
            setEndDate(endDate);
          }}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
          displayFormat={displayFormat}
          orientation={orientation}
          
        />
      </div>
    </div>
  );
};

export default DateRange;
