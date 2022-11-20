import React from "react";
import cn from "classnames";
import styles from "./Control.module.sass";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import Breadcrumbs from "../Breadcrumbs";

const Control = ({ className, urlHome, breadcrumbs }) => {
  return (
    <div className={cn(className, styles.control)}>
      <Link
        className={cn("button-stroke button-small", styles.button)}
        to={urlHome}
      >
        <Icon name="arrow-left" size="10" />
        <span>Back</span>
      </Link>
      <Breadcrumbs className={styles.breadcrumbs} items={breadcrumbs} />
    </div>
  );
};

export default Control;
