import React from "react";
import cn from "classnames";
import styles from "./CheckoutComplete.module.sass";
import Control from "../../components/Control";
import CheckoutComplete from "../../components/CheckoutComplete";
import { useSelector } from "react-redux";


const breadcrumbs = [
  {
    title: "Tickets",
    url: "/tickets",
  },
  {
    title: "Payment",
    url: "/checkout",
  },
  {
    title: "Payment completed",
  },
];

const StaysCheckoutComplete = () => {
  const { chosenTicket, pending,moreInfo  } = useSelector((state) => state.ticket)

  const {barcodeId, passengerName, passengerPassport, seat, terminal, gate} = moreInfo["moreInfo"]
  const {flight_id, price, info, logo, dateFrom, dateTo, directions} = chosenTicket

  const items = [
    {
      "routeId": flight_id,
      price: "Ticket",
      "info": info,
      "logo": logo,
      "dateFrom": dateFrom,
      "dateTo": dateTo,
      directions: directions,
      moreInfo: 
        {
          passengerName: passengerName,
          passengerPassport: passengerPassport,
          terminal: terminal,
          gate: gate,
          seat: seat,
          barcodeId: barcodeId
        }
    },
    
  ];

  return (
    <div className={cn("section-mb80", styles.section)}>
      {pending===false && 
      <div className={cn("container", styles.container)}>
        <Control
          className={styles.control}
          urlHome={breadcrumbs[1].url}
          breadcrumbs={breadcrumbs}
        />
        
        <div className={styles.wrapper}>
              <CheckoutComplete
                className={styles.complete}
                title="Payment completed"
                items={items}
              />
          </div>
        </div>}
    </div>
  );
};

export default StaysCheckoutComplete;
