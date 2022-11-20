import React, { useState } from "react";
import cn from "classnames";
import styles from "./Option.module.sass";
import { Range, getTrackBackground } from "react-range";

const Option = ({ className, item }) => {
  const [values, setValues] = useState([6, 18]);

  const stepTime = 0.5;
  const minTime = 0;
  const maxTime = 24;

  const time = (value) => {
    return value % 1 === 0 ? value + ":00" : Math.round(value) - 1 + ":30";
  };

  return (
    <div className={cn(className, styles.section)}>
      <div className={styles.category}>{item.title}</div>
      <div className={styles.location}>{item.location}</div>
      <Range
        values={values}
        step={stepTime}
        min={minTime}
        max={maxTime}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "2px",
                width: "100%",
                borderRadius: "1px",
                background: getTrackBackground({
                  values,
                  colors: ["#B1B5C3", "#8E8CFF", "#B1B5C3"],
                  min: minTime,
                  max: maxTime,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "24px",
              width: "24px",
              borderRadius: "50%",
              backgroundColor: "#8E8CFF",
              border: "4px solid #FCFCFD",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
        )}
      />
      <div className={styles.scale}>
        <div className={styles.number}>Fri {time(values[0])}</div>
        <div className={styles.number}>{time(values[1])} PM</div>
      </div>
    </div>
  );
};

export default Option;
