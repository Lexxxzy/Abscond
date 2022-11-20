import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import styles from "./PersonalInfo.module.sass";
import Icon from "../../../components/Icon";
import Dropdown from "../../../components/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, updateUserInfo } from "../../../logic/apiCallsUser";
import Snackbar, { SnackbarType } from "../../../components/Snackbar";

const optionsLocation = ["Russia"];
//const optionsSpeak = ["English", "Russian", "Chinese"];

const PersonalInfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {getUserInfo(dispatch);}, [])

  const [location, setLocation] = useState(optionsLocation[0]);
  const {error, pending, errorText}=useSelector(state=>state.user);
  //const [speak, setSpeak] = useState(optionsSpeak[0]);
  const {email, login, phoneNumber} = useSelector(state => state.user.userInfo);
  const [phone, setPhone] = useState("")
  const [new_login, setLogin] = useState("")
  const [newEmail, setNewEmail] = useState("")

  const handleKeyUp = (e) => {
    
      if(is_numeric(e.key) && phone.length < 11)
      {
        setPhone((prev) => prev+e.key)
      }
      if (e.key === "Backspace")
      {
        setPhone((prev) => prev.slice(0, -1))
      }

      var num = e.target.value.replace( /\D/g, '' ).split( /(?=.)/ ), i = num.length - 1;
      
      if ( 0 <= i ) num.unshift( '+' );
      if ( 1 <= i ) num.splice( 2, 0, ' ' );
      if ( 4 <= i ) num.splice( 6, 0, ' ' );
      if ( 7 <= i ) num.splice( 10, 0, '-' );
      if ( 9 <= i ) num.splice( 13, 0, '-' );
      e.target.value = num.join( '' );
  }

  function is_numeric(str) {
    return /^\d+$/.test(str);
  }

  const handleLogInInput = (e) => {
    setLogin(e.target.value)
  }


  const handleEmailInput = (e) => {
    setNewEmail(e.target.value)
  }

  const updateProfile = () => {
    updateUserInfo(dispatch, phone, new_login)
    snackbarRef.current.show();
  }

  const snackbarRef = useRef(null);

  return (
    <form className={styles.section}>
      <div className={styles.head}>
        <div className={cn("h2", styles.title)}>Personal info</div>
        {/*<Link
          className={cn("button-stroke button-small", styles.button)}
          to="/profile"
        >
          View profile
        </Link>*/}
      </div>
      <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.category}>Account info</div>
          <div className={styles.fieldset}>
            <div className={styles.row}>
              <div className={styles.col}>
                <div className={styles.label}>Login</div>
                <input
                  className={styles.input}
                  onChange={handleLogInInput}
                  name="display-name"
                  type="text"
                  maxLength={32}
                  placeholder={login===null ? "Enter login " : login}
                  required
                />
              </div>
              <div className={styles.col}>
                <div className={styles.label}>Phone number</div>
                <input
                  className={styles.input}
                  name="phone"
                  type="tel"
                  onKeyUp={handleKeyUp}
                  placeholder={phoneNumber===null ? "+7 985 000 00 00" : phoneNumber}
                  maxLength = {16}
                  required
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={cn(styles.col)}>
                <div className={styles.label}>E-mail</div>
                <input
                  className={styles.input}
                  label="email"
                  name="email"
                  type="email"
                  disabled
                  onChange={handleEmailInput}
                  placeholder={email}
                  required
                />
              </div>
              <div className={styles.col}>
                <div className={styles.label}>Residence</div>
                <Dropdown
                  className={styles.dropdown}
                  value={location}
                  disabled
                  setValue={setLocation}
                  options={optionsLocation}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className={styles.controls}>
        <button className={cn("button", styles.button)} type="button" onClick={updateProfile}>Update Profile</button>
        <button className={styles.clear}>
          <Icon name="close" size="16" />
          Reset fields
        </button>
      </div>
      {!pending && error ?      
        <Snackbar
          ref={snackbarRef}
          message="An error occured"
          type={SnackbarType.error}
        /> :
        <Snackbar
          ref={snackbarRef}
          message="Your data has been updated"
          type={SnackbarType.success}
        />
      }
    </form>
  );
};

export default PersonalInfo;
