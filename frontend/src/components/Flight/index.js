import React, { useState } from "react";
import cn from "classnames";
import styles from "./Flight.module.sass";
import Icon from "../Icon";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Login from "../Login";
import { logInCancelled } from "../../data/userSlice";
import { chooseTicket } from "../../data/ticketSlice";
import { pickTicket } from "../../logic/apiCallsTickets";

const Flight = ({ className, item, textButton="Buy", onClickBuy=null }) => {
  const { isLogedIn } = useSelector((state) => state.user.userInfo)
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onModalClose = () => {
    dispatch(logInCancelled());
    setVisible(false);
  }

  const buyTicket = () => {
    if (!isLogedIn)
    {
      setVisible(true)
      return false
    }
    pickTicket(dispatch, navigate, item)
  }
  
  return (
    <>
    <div className={cn(className, styles.flight)}>
      <div className={styles.wrap}>
        {item.directions.map((x, index) => (
          
          <div className={styles.item} key={index}>
            <div className={styles.details}>
              <div className={styles.box}>
                <div className={styles.title}>{moment(x.timeFlightFrom, "HH:mm:ss").format('H:mm')}</div>
                <div className={styles.time}>{x.cityFrom}</div>
                 {index === 0 ? <div className={styles.time}>{item.dateFrom}</div> : <div className={styles.time}>{item.dateTo}</div>}
              </div>
              <div className={styles.note}>Flight time: {moment(x.flightLength, "HH:mm:ss").format('H')}h {moment(x.flightLength, "HH:mm:ss").format('mm')}m</div>
              <div className={styles.boxright}>
                 <div className={styles.title}>{moment(x.timeFlightTo, "HH:mm:ss").format('H:mm')}</div>
                  <div className={styles.time}>{x.cityTo}</div>
                  {index === 0 ? <div className={styles.time}>{item.dateFrom}</div> : <div className={styles.time}>{item.dateTo}</div>}
              </div>
            </div>
            
          </div>
        ))}
      </div>
      <div className={styles.control}>
        <div className={styles.logo}>
          <img src={item.logo} alt="Logo" />
        </div>
        <div className={styles.info}>
          <Icon name="tick" size="20" />
          {item.info}
        </div>
        <button className={cn("button-stroke", styles.button)}>
          <span className={styles.price}>{item.price}</span>
          <span className={styles.more} onClick={onClickBuy===null ? () => buyTicket(item) : onClickBuy}>
            <span>{textButton}</span>
            <Icon name="arrow-next" size="16" />
          </span>
        </button>
      </div>
    </div>
    <Modal visible={visible} onClose={onModalClose}>
      <Login isFromTickets={true}/>
    </Modal>
  </>
  );
};

export default Flight;
