import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./CheckoutComplete.module.sass";
import Flight from "../Flight";
import Modal from "../Modal";
import Ticket from "../Ticket";

const CheckoutComplete = ({ className, items }) => {
  const [visible, setVisible] = useState(false);
  const [ticketId, setTickerId] = useState(0);
  const onModalClose = () => {
    setVisible(false);
  }
  const onTicketShow = (index) => {
    setTickerId(index)
    setVisible(true)
  }
  return (
    <>
      <div className={cn(className, styles.complete)}>
        <div className={styles.head}>
          <div className={cn("h2", styles.title)}>{items.length > 1 ? "Tickets purchased!" : "Ticket purchased!"}</div>
          <div className={styles.info}>
            Congratulations, payment was successful!
          </div>

        </div>
        <div className={styles.line}>
        </div>
        <div className={styles.inner}>
          {items.map((x, index) => (

            <div key={index}>
              {items.length !== 1 ?
                <h3 className={styles.type}>{index === 0 ? "Departure" : "Return"}</h3> : null}
              <div onClick={() => onTicketShow(index)}>
                <Flight className={styles.flight} item={x} textButton="View ticket" onClickBuy={() => onTicketShow(index)}/>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.btns}>
          <Link className={cn("button-stroke", styles.button)} to="/#">
            Home
          </Link>
          <Link className={cn("button", styles.button)} to="/">
            My tickets
          </Link>
        </div>
      </div>
      <Modal visible={visible} onClose={onModalClose} >
     
        <Ticket flightInfo={items[ticketId]}/>
      </Modal>
    </>
  );
};

export default CheckoutComplete;
