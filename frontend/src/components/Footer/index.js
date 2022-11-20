import React from "react";
import cn from "classnames";
import styles from "./Footer.module.sass";
import { Link } from "react-router-dom";

const items = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Tickets",
    url: "/tickets",
  },
  {
    title: "Directions",
    url: "/directions",
  }
];

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={cn("container", styles.container)}>
        <div className={styles.row}>
          <div className={styles.col}>
            <Link className={styles.logo} to="/">
            <img
            className={styles.pic}
            src="/images/logo-light.svg"
            alt="Abscond"
          />
            </Link>
          </div>
          <div className={styles.col}>
            <div className={styles.menu}>
              {items.map((x, index) => (
                <Link className={styles.link} to={x.url} key={index}>
                  {x.title}
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.col}>
            
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            Copyright © 2022 LLC. All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
