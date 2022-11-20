import React, { useState } from "react";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Location.module.sass";
import Icon from "../Icon";
import { getCities } from "../../logic/apiCallsTickets";

const Location = ({
  className,
  icon,
  name,
  description,
  placeholder,
  small,
  bodyDown,
  onLocationChange,
  isTop
}) => {
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState([]);

  const handleChange = (name, value, key) => 
  {
    setVisible(true)
    if ((/^[\u0401\u0451\u0410-\u044fa-zA-Z]+$/.test(value) || key === "Backspace") && value.length!==0) {
      getCities(value).then((cities) => setItems(cities))
      onLocationChange(name, value)
    }
  }

  const setCity = (city) =>
  {
    document.querySelector(`input[name=${name}]`).value = city;
    onLocationChange(name, city)
    setVisible(false)
  }

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div
        className={cn(
          className,
          styles.location,
          { [styles.small]: small },
          { [styles.bodyDown]: bodyDown },
          { [styles.active]: visible }
        )}
      >
        <div className={styles.head}>
          <div className={styles.icon}>
            <Icon name={icon} size="24" />
          </div>
          <input
            className={styles.input}
            type="text"
            name={name}
            placeholder={placeholder}
            onChange={(e)=>handleChange(e.target.name,e.target.value,e.key)}
            autoComplete="off" 
            maxLength={64}
          />
          {description && (
            <div className={styles.description}>{description}</div>
          )}
          <button className={styles.clear} onClick={() => setVisible(false)}>
            <Icon name="close-circle" size="24" />
          </button>
        </div>
        <div className={isTop ? styles.bodytop : styles.bodybottom}>
          <div className={styles.list}>
            {items.map((x, index) => (
              <div className={styles.item} key={index} onClick={() => setCity(x)}>
                {x}
              </div>
            ))}
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Location;
