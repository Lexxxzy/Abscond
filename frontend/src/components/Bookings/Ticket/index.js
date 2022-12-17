import React from 'react'
import cn from "classnames";
import Barcode from "react-jsbarcode";
import styles from "./Ticket.module.sass"
import moment from 'moment';

export default function BookingTicket({ flightInfo, index }) {

    return (
        <div className={styles.wrapper}>
            <h3>
                Route: {flightInfo.flight_id}
            </h3>
            <div className={styles.card}>
                <div className={styles.item_fifty}>
                    <div >
                        <h5>
                            {flightInfo.departure_airport}
                        </h5>
                        <span>
                            Departure airport
                        </span>
                    </div>
                    <div >
                        <h5>
                            {flightInfo.arrival_airport}
                        </h5>
                        <span>
                            Arrival airport
                        </span>
                    </div>
                </div>

            </div>

            <div className={cn(styles.card, styles.flightInfo)}>
                <div className={styles.item}>
                    <h5>
                        {flightInfo.terminal}
                    </h5>
                    <span>
                        Terminal
                    </span>
                </div>

                <div className={styles.item}>
                    <h5>
                        {flightInfo.gate}
                    </h5>
                    <span>
                        Gate
                    </span>
                </div>

                <div className={styles.item}>
                    <h5>
                        {flightInfo.seat}
                    </h5>
                    <span>
                        Seat
                    </span>
                </div>
            </div>


            <div className={styles.barcode}>
                <h5>Show the barcode at registration</h5>
                <Barcode value={flightInfo.barcodeid} options={{
                    width: 1,
                    height: 80,
                    background: "#141416",
                    lineColor: "#ffffff",
                    marginBottom: 40,
                }} />
            </div>
        </div>
    )
}
