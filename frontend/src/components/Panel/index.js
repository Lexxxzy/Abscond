import React from "react";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import styles from "./Panel.module.sass";
import Icon from "../Icon";

const navigation = [
  {
    title: "Buy tockets",
    url: "/tickets",
  }
];

const Panel = ({
  className,
  menu,
  classBody,
  children,
  onSearch,
  classButtonSearch,
}) => {
  return (
    <div className={cn(className, styles.panel)}>
      <div className={styles.background}></div>
      {menu && (
        <div className={styles.nav}>
          {navigation.map((x, index) => (
            <NavLink
              className={(navData) => navData.isActive ? styles.active : styles.link }
              to={x.url}
              key={index}
            >
              {x.title}
            </NavLink>
          ))}
        </div>
      )}
      <div className={cn(styles.body, classBody)}>
        {children}
        <button
          className={cn(classButtonSearch)}
          onClick={onSearch}
        >
          <Icon name="search" size="24" />
        </button>
      </div>
    </div>
  );
};

export default Panel;
