import React, { useState } from "react";
import cn from "classnames";
import styles from "./TextInput.module.sass";
import Icon from "../Icon";
import { useSelector } from "react-redux";

const TextInput = ({ className, label, empty, view, onClickFunc, iconName="eye", buttonType="button", ...props }) => {

  const [isVisible, setVisible] = useState(false);
  const { error } = useSelector((state) => state.user)
  const [myProps, setMyValues] = useState(props);
 
  const changeVisibility = () => {
    setVisible(!isVisible);
    const typeValue = isVisible ? "text" : "password";
    setMyValues((prev) => ({...prev, type: typeValue}));
  };

  return (
    <div
      className={cn(
        styles.field,
        { [styles.empty]: empty },
        { [styles.view]: view },
        { [styles.error]: error },
        className
      )}
    >
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.wrap}>
        <input className={styles.input} {...myProps} />
        {view && (
          <button type={buttonType} className={styles.toggle} onClick={()=>{onClickFunc ? onClickFunc() :
                                                                                      changeVisibility()}}>
            <Icon name={iconName} size="24" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TextInput;
