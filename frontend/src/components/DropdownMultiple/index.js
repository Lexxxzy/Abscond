import React, { useState } from "react";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Dropdown.module.sass";
import Icon from "../Icon";

const DropdownMultiple = ({ className, value: values, setValue, options, empty, isDays }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = (value) => {
    if(!values.includes(value))
    {
      setValue(oldArray => [...oldArray, value]);
    } else {
      setValue(values.filter(item => item !== value));
    }
  };
  
  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div
        className={cn(styles.dropdown, { [styles.empty]: empty }, className, {
          [styles.active]: visible,
        })}
      >
        <div className={styles.head} onClick={() => setVisible(!visible)}>
        {values.map((x, index) => (
          <span key={index} className={styles.selection}>
            {isDays ? x.substring(0,3) : x} {index!==values.length-1 && ", "}
          </span>
          )
          )}
          <div className={styles.arrow}>
            <Icon name="arrow-bottom" size="10" />
          </div>
        </div>
        <div className={styles.body}>
          {options.map((x, index) => (
            <div 
              className={cn(styles.option, {
                [styles.selectioned]: values.includes(x),
              })}
              onClick={() => handleClick(x, index)}
              key={index}
            >
              {x}
            </div>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default DropdownMultiple;
