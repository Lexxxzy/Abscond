import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./LoginAndSecurity.module.sass";
import Modal from "../../../components/Modal";
import TextInput from "../../../components/TextInput";
import { getLastUpdated, updateUserPassword } from "../../../logic/apiCallsUser";

const LoginAndSecurity = () => {
  const [lastUpdated, setLastUpdated] = useState();
  useEffect(() => { 
    getLastUpdated(setLastUpdated);
   }, []);

  const [visible, setVisible] = useState(false);
  const [pass, setPass] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [err, setErr] = useState({
    isErrorOccured: false,
    errText: ''
  });

  const onModalClose = () => {
    setVisible(false);
  }

  const onInputChange = e => {
    const { name, value } = e.target;
    setPass(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleUpdatePassword = () => {
    if(validatePasswords())
    {
      updateUserPassword(setErr,pass.oldPassword,pass.newPassword,setVisible)
      
    }
  }

  const validatePasswords = () => {
    const {oldPassword, newPassword, confirmNewPassword} = pass;

    if (oldPassword.length < 6 || newPassword < 6 || confirmNewPassword < 6)
    {
      setErr({
        isErrorOccured: true,
        errText: 'Password must be longer than 6 symbols'
      })

      return false

    } else if (newPassword!==confirmNewPassword)
    {
        setErr({
        isErrorOccured: true,
        errText: 'Passwords must match!'
      })
      return false
    } else if (newPassword === oldPassword)
    {
      setErr({
        isErrorOccured: true,
        errText: 'New password must differ from the old one'
      })
      return false
    }
    setErr({
      isErrorOccured: false,
      errText: ''
    })
    return true
  }
  return (
    <div className={styles.section}>
      <div className={cn("h2", styles.title)}>Security</div>
      <div className={styles.list}>
        <div className={styles.box}>
          <div className={styles.category}>Authorization</div>
          <div className={styles.item}>
            <div className={styles.details}>
              <div className={styles.label}>Password</div>
              <div className={styles.text}>Last updated: {lastUpdated}</div>
            </div>
            <button className={cn("button-stroke button-small", styles.button)} onClick={() => setVisible(true)}>
              Update password
            </button>
          </div>
        </div>

      </div>
      <Modal visible={visible} onClose={onModalClose}>
        <div className={styles.wrapper}>
          <TextInput
            className={cn(styles.field, styles.text__input)}
            name="oldPassword"
            type="password"
            placeholder="Old password"
            required
            view
            autoFocus
            onChange={onInputChange}
          />
          <br />
          <TextInput
            className={cn(styles.field, styles.text__input)}
            name="newPassword"
            type="password"
            placeholder="New password"
            required
            view
            onChange={onInputChange}
          />
          <br />
          <TextInput
            className={cn(styles.field, styles.text__input)}
            name="confirmNewPassword"
            type="password"
            placeholder="Confirm new password"
            required
            view
            onChange={onInputChange}
          />
          <br />
          {<div className={styles.error}>
            <span>
            {err.isErrorOccured && `Error: ${err.errText}`}
            </span>
            </div>}
          <button className={cn("button-stroke button-small", styles.button)} onClick={handleUpdatePassword}>
            Update password
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LoginAndSecurity;
