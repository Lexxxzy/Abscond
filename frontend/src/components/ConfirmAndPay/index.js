import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./ConfirmAndPay.module.sass";
import CreditCard from "./CreditCard";
import Icon from "../Icon";
import Dropdown from "../Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { getUserDocuments, getUserInfo } from "../../logic/apiCallsUser";
import PassportForm from "./passportForm/";

const nav = ["Credit card"];

const person_info = new Set([])
const optionsGender = ["Man", "Woman"]

const ConfirmAndPay = ({ className, guests, title, buttonUrl, dates }) => {
  const dispatch = useDispatch();
  const [genderOption, setGender] = useState(optionsGender[0]);
  const [passport_new, setPassport] = useState({
    "id": '',
    "issue_date": '',
    "name": '',
    "surname": '',
    "gender": 'M'
  });

  useEffect(() => { getUserDocuments(dispatch); getUserInfo(dispatch) }, [person_info])
  const { pending } = useSelector(state => state.user);
  const { passport, email } = useSelector(state => state.user.userInfo);
  person_info.add(email)
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [login, setLogin] = useState(Array.from(person_info)[0]);
  return (
    <div className={cn(className, styles.confirm)}>
      <div className={cn("h2", styles.title)}>Payment</div>
      <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.box}>
            <div className={styles.category}>{title}</div>
            <div className={styles.group}>
              <div className={styles.option}>
                <div className={styles.info}>{dates[1] === undefined ? 'Date' : 'Dates'}</div>
                <input className={styles.input} type="text" />
                <div className={styles.value}>{dates[1] === undefined ? dates[0] : `${dates[0].split(',')[0]} — ${dates[1]}`}</div>
                <button className={styles.edit}>
                  <Icon name="clock" size="24" />
                </button>
              </div>
              {guests && (
                <div className={styles.option}>
                  <div className={styles.info}>People</div>
                  <input className={styles.input} type="text" />
                  <div className={styles.value}>1 person</div>
                  <button className={styles.edit}>
                    <Icon name="user" size="24" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.top}>
              <div className={styles.category}>Pay with</div>
              <div className={styles.nav}>
                {nav.map((x, index) => (
                  <button
                    className={cn(styles.link, {
                      [styles.active]: index === activeIndex,
                    })}
                    key={index}
                    onClick={() => setActiveIndex(index)}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>Saved contact information</div>
              {!pending  && <Dropdown
                className={styles.dropdown}
                value={login}
                setValue={setLogin}
                options={Array.from(person_info)}
              />}
              <br/>
              {!pending &&
                <>
                {passport === null ? <PassportForm passport={passport_new} setPassport={setPassport}
                                                   genderOption={genderOption} setGender={setGender}/>
                                   : 
                                   <>
                                    <div className={styles.label}>Passport</div>
                                    <Dropdown
                                      className={styles.dropdown}
                                      value={passport.id}
                                      options={[passport.id]}
                                      />
                                    </>
                }
                </>
                }
            </div>
          </div>
        </div>
        <div className={styles.item}>
          {activeIndex === 0 && (
            <CreditCard className={styles.credit} buttonUrl={buttonUrl} passport={passport_new} genderOption={genderOption}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmAndPay;
