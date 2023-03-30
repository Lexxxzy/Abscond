import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Bookings.module.sass";
import Modal from "../Modal";
import FlightBooking from "./BookingFlight";
import BookingTicket from "./Ticket";
import { getOrders } from "../../logic/apiCallsUser";

const Bookings = () => {
  const [visible, setVisible] = useState(false);
  const [ticketId, setTickerId] = useState(0);
  const [bookings, setBookings] = useState([]);
  const onModalClose = () => {
    setVisible(false);
  }

  const onTicketShow = (index) => {
    setTickerId(index)
    setVisible(true)
  }

  useEffect(() => { getOrders(setBookings) }, []);
  
  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div>
          <h2 className={styles.header__bookings}>Your bookings </h2>
        </div>
        <br />

      </div>
      <div className={styles.flights}>
        {bookings.length !== 0 ? bookings.map((x, index) => (

          <div key={index} >
            <div onClick={() => onTicketShow(index)}>
              <FlightBooking className={styles.flight} item={x} textButton="View ticket" onClickBuy={() => onTicketShow(index)} />
            </div>
          </div>
        )) :
          <div className={styles.notickets}>
            <img width={"300px"} src="images/content/globa-sad.png" alt="No tickets found :("></img>
            <br />

            <br />
            You have no orders yet...
          </div>
        }
      </div>
      <Modal visible={visible} onClose={onModalClose} >
        <BookingTicket flightInfo={bookings[ticketId]} />
      </Modal>
    </div>
  );
};

export default Bookings;
