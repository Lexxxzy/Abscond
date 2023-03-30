import React, { useState } from "react";
import cn from "classnames";
import styles from "./Filters.module.sass";
import { Range, getTrackBackground } from "react-range";


const Filters = ({ className }) => {
  const stepPrice = 50;
  const minPrice = 5000;
  const maxPrice = 300000;

  const [values, setValues] = useState([maxPrice]);

  return (
    <div className={cn(className, styles.filters)}>
      <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.label}>Price range</div>
          <Range
            values={values}
            step={stepPrice}
            min={minPrice}
            max={maxPrice}
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
                    height: "8px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                      values,
                      colors: ["#000000", "#B1B5C3"],
                      min: minPrice,
                      max: maxPrice,
                    }),
                    alignSelf: "center",
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "24px",
                  width: "24px",
                  borderRadius: "50%",
                  backgroundColor: "#000000",
                  border: "4px solid #000000",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-33px",
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontFamily: "Poppins",
                    padding: "4px 8px",
                    borderRadius: "8px",
                    backgroundColor: "#000000",
                  }}
                >
                  ₽{values[0].toFixed(0)}
                </div>
              </div>
            )}
          />
          <div className={styles.scale}>
            <div className={styles.number}>₽5000</div>
            <div className={styles.number}>₽300 000</div>
          </div>
        </div>
        {/*<div className={styles.item}>
          <div className={styles.label}>Time</div>
          <div className={styles.group}>
            {times.map((x, index) => (
              <Option className={styles.option} item={x} key={index} />
            ))}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>transferring</div>
          <div className={styles.variants}>
            {filters.map((x, index) => (
              <Checkbox
                className={styles.checkbox}
                content={x.content}
                note={`от ${x.note}`}
                value={selectedFilters.includes(x.id)}
                onChange={() => handleChange(x.id)}
                key={index}
              />
            ))}
          </div>
            </div>*/}
      </div>
      {/*<button className={styles.reset}>
        <Icon name="close-circle-fill" size="24" />
        Reset filter
          </button>*/}
    </div>
  );
};

export default Filters;
