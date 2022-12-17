import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./SearchInput.module.sass";
import Icon from "../Icon";
import { useSelector } from "react-redux";

const SearchInput = ({ className, label, empty, onClickFunc,onInput,value, onChange,searchFunc, buttonType="button", ...props }) => {
  const { error } = useSelector((state) => state.user)
  const handleSearchOnKeyDown=(e) => {
    if (e.key === 'Enter') {
      searchFunc()
    }
  }
  return (
    <div
      className={cn(
        styles.field, styles.view,
        { [styles.empty]: empty },
        { [styles.error]: error },
        className
      )}
    >
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.wrap}>
        <input className={styles.input} {...props} 
        onChange={(e) => {onInput(e.target.value);searchFunc()}} 
        onKeyDown={(e) => handleSearchOnKeyDown(e)} 
        value={value}/>

          <button type={buttonType} className={styles.toggle} onClick={()=>{onClickFunc()}}>
            <Icon name="search" size="16" />
          </button>
        
      </div>
    </div>
  );
};

export default SearchInput;
