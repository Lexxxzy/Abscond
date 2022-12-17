import React from "react";
import cn from "classnames";
import styles from "./FlightBooking.module.sass";
import Icon from "../../Icon";
import moment from "moment";

const FlightBooking = ({ className, item, snackbarRef, setTickets }) => {


    return (
        <>
            <div className={cn(className, styles.flight)} title="Click to see more..">
                <div className={styles.wrap}>
                    <div className={styles.item} >
                        <div className={styles.details}>
                            <div className={styles.box}>
                                <div className={styles.title}>{moment(item.departure_time, "HH:mm:ss").format('H:mm')}</div>
                                <div className={styles.time}>Airport from: {item.departure_airport}</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={styles.control}>
                    {/*<div className={styles.info}>
            <Icon name="tick" size="20" />
            {item.info}

          </div>*/}

                    <div className={styles.info}>
                        <Icon name="credit-card" size="20" />
                        {item.price} rub.
                    </div>
                    <div className={styles.info}>
                        <Icon name="route" size="20" />
                        {item.flight_id}
                    </div>
                    {item.flight_on !== null &&
                        <div className={styles.info}>
                            <Icon name="clock" size="20" />
                            {moment(item.flight_on).format('ddd, DD MMM')}
                        </div>}
                       
                </div>

            </div>

        </>
    );
};

export default FlightBooking;
