import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import { logoutUser } from "../../../logic/apiCallsUser"
import { useDispatch } from "react-redux";
const User = ({ className, items }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className, { [styles.active]: visible })}>
        <button className={cn(styles.head, styles.login)} onClick={() => setVisible(!visible)}>

              <Icon name="user"/>
              <span className={styles.sign}>Profile</span>

        </button>
        <div className={styles.body}>
          <div className={styles.group}>
            {items.map((item, index) => (
              <div className={styles.menu} key={index}>
                {item.menu.map((x, index) => (
                  <NavLink
                    className={styles.item}
                    to={x.url}
                    onClick={() => setVisible(!visible)}
                    key={index}
                  >
                    <div className={styles.icon}>
                      <Icon name={x.icon} size="24" />
                    </div>
                    <div className={styles.text}>{x.title}</div>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.btns}>
            <NavLink
              className={cn("button button-small", styles.button)}
              to="/account-settings"
              onClick={() => setVisible(!visible)}
            >
              Account
            </NavLink>
            <button className={cn("button-stroke button-small", styles.button)} onClick={() => logoutUser(dispatch)}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default User;
