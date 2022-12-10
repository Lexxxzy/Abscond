import React, { Children, useState } from 'react'
import Dropdown from '../../../components/Dropdown'
import cn from "classnames";
import styles from "../AccountSettings.module.sass";
import Icon from '../../../components/Icon';

export const SideMenu = (props) => {
    const {items,options,activeTab,setActiveTab}=props
    const handleClick = (x) => {
        setActiveTab(x.title);
      };
  return (
    <>
        <Dropdown
        className={cn("tablet-show", styles.dropdown)}
        options={options}
        value={activeTab}
        setValue={setActiveTab}
    />
    <div className={styles.menu}>
        {items.map((x, index) => (
        <button
            className={cn(styles.link, {
            [styles.active]: x.title === activeTab,
            })}
            onClick={() => handleClick(x, index)}
            key={index}
        >
            <Icon name={x.icon} size="16" />
                {x.title}
            </button>
        ))}
        {props.children}
    </div>
    </>
  )
}
