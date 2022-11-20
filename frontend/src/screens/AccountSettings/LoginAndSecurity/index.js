import React from "react";
import cn from "classnames";
import styles from "./LoginAndSecurity.module.sass";

const LoginAndSecurity = () => {
  return (
    <div className={styles.section}>
      <div className={cn("h2", styles.title)}>Security</div>
      <div className={styles.list}>
        <div className={styles.box}>
          <div className={styles.category}>Authorization</div>
          <div className={styles.item}>
            <div className={styles.details}>
              <div className={styles.label}>Password</div>
              <div className={styles.text}>Last updated 1 month ago</div>
            </div>
            <button className={cn("button-stroke button-small", styles.button)}>
            Update password
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default LoginAndSecurity;
