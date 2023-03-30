import React from 'react'
import cn from "classnames";
import Barcode from "react-jsbarcode";
import styles from "./Ticket.module.sass"
import moment from 'moment';

export default function Ticket({ flightInfo, index }) {
    const {moreInfo} = flightInfo;
    const {directions} = flightInfo;

    return (
        <div className={styles.wrapper}>
            <h3>
                Route: {flightInfo.routeId}
            </h3>
            <div className={styles.info}>
                <div className={cn(styles.card, styles.fifty)} >
                    <h5>Passenger</h5>
                    <span style={{lineHeight: "1.4"}}>{moreInfo.passengerName}</span>
                </div>

                <div className={cn(styles.card, styles.fifty)}>
                    <h5>Passport</h5>
                    <span>{moreInfo.passengerPassport}</span>
                </div>
            </div>
            
            {directions.map((x, i) =>
            <div className={styles.card} key={i}>
                <div className={styles.time}>
                    <div className={styles.date}>
                        <div>{i===0 ? flightInfo.dateFrom : flightInfo.dateTo}</div>
                        
                        <span>{moment(x.timeFlightFrom, "HH:mm:ss").format('HH:mm')}</span>
                    </div>

                    <div className={styles.duration}>
                        <span>{x.flightLength}</span>
                    </div>

                    <div className={styles.date} style={{textAlign: "right"}}>
                        <div>{i===0 ? flightInfo.dateFrom : flightInfo.dateTo}</div>
                        <span>{moment(x.timeFlightTo, "HH:mm:ss").format('HH:mm')}</span>
                    </div>
                </div>

                <object className={styles.pathway} type="image/svg+xml" data="/images/content/flight-line.svg" width="400">
                    flight-line
                </object>

                <div className={styles.city}>
                    <div className={styles.cityInfo}>
                        <h5>
                            {x.cityFrom}
                        </h5>
                        <span>
                            {x.airportIdFrom}
                        </span>
                    </div>

                    <div className={styles.cityInfo} style={{textAlign: "right"}}>
                        <h5>
                            {x.cityTo}
                        </h5>
                        <span>
                            {x.airportIdTo}
                        </span>
                    </div>
                </div>
            </div>)
            }


            <div className={cn(styles.card, styles.flightInfo)}>
                <div className={styles.item}>
                    <h5>
                        {moreInfo.terminal}
                    </h5>
                    <span>
                    Terminal
                    </span>
                </div>

                <div className={styles.item}>
                    <h5>
                        {moreInfo.gate}
                    </h5>
                    <span>
                        Gate
                    </span>
                </div>

                <div className={styles.item}>
                    <h5>
                        {moreInfo.seat}
                    </h5>
                    <span>
                        Seat
                    </span>
                </div>
            </div>


            <div className={styles.barcode}>
                <h5>Show the barcode at registration</h5>
                <Barcode value={moreInfo.barcodeId} options={{
                    width: 1,
                    height: 80,
                    background: "white",
                    lineColor: "#000000",
                    marginBottom: 40,
                }} />
            </div>
        </div>
    )
}
