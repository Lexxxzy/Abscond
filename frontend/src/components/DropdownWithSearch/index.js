import React, { useState } from "react";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Dropdown.module.sass";
import Icon from "../Icon";

const DropdownWithSearch = ({ className, value, setValue, options, empty, dropdownValue, setDropdownValue, onSearch, isString=false}) => {
  const [visible, setVisible] = useState(false);

  const handleClick = (value) => {
    setDropdownValue("")
    setValue(value);
    setVisible(false);
  };

  const onValueChanged = (value) => {
    setDropdownValue(value);
    onSearch();
    setVisible(true);
  }

  var isSearchStarted = !(dropdownValue===null || dropdownValue===undefined || dropdownValue==="");
  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
    <input className={styles.invis} value={dropdownValue} onChange={(e) => onValueChanged(e.target.value)}></input>
      <div
        className={cn(styles.dropdown, { [styles.empty]: empty }, className, {
          [styles.active]: visible,
        })}
      >
        
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          <div className={styles.selection}>
          {
            !isSearchStarted ? 
              isString ? value : value.airport_code + ', ' + value.city_title 
              : 
              dropdownValue
          }
          </div>
          <div className={styles.arrow}>
            <Icon name="arrow-bottom" size="10" />
          </div>
        </div>
        <div className={styles.body}>
          {options.map((x, index) => (
            <div
              className={cn(styles.option, {
                [styles.selectioned]: !isString ? x.airport_code === value.airport_code : x===value,
              })}
              onClick={() => handleClick(x, index)}
              key={index}
            >
            
              {!isString ? x.airport_code+', '+x.city_title : x}
            </div>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default DropdownWithSearch;
