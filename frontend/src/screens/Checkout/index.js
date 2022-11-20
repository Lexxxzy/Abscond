import React from "react";
import cn from "classnames";
import styles from "./Checkout.module.sass";
import Control from "../../components/Control";
import ConfirmAndPay from "../../components/ConfirmAndPay";
import PriceDetails from "../../components/PriceDetails";
import { useDispatch, useSelector } from "react-redux";
import { deleteTicket } from "../../logic/apiCallsTickets";

const breadcrumbs = [
  {
    title: "Tickets",
    url: "/tickets",
  },
  {
    title: "Payment",
  },
];

const Checkout = () => {
  const dispatch = useDispatch();
  const { isLogedIn } = useSelector((state) => state.user.userInfo)
  const { chosenTicket,pickedTicketId } = useSelector((state) => state.ticket)
  const directions = chosenTicket.directions;

  window.onbeforeunload = function(){
    deleteTicket(pickedTicketId, dispatch)
  };

  const price = directions.length === 2 ? 
  [
    {
      title: "Ticket to",
      value: parseInt(chosenTicket.price.substring(1))/2,
    },
    {
      title: "Ticket back",
      value: parseInt(chosenTicket.price.substring(1))/2,
    },
    {
      title: "Personal discount",
      value: "0",
    },] :
  [
    {
      title: "Ticket to",
      value: chosenTicket.price,
    },
    {
      title: "Personal discount",
      value: "0",
    },];

  const items = directions.length === 2 ? [
      {
        title: chosenTicket.dateFrom,
        category: "From " + directions[0].flightFrom,
        icon: "calendar",
      },
      {
        title: chosenTicket.dateTo,
        category: "Returning from " + directions[0].flightTo,
        icon: "calendar",
      },
      {
        title: "1 person",
        category: "Passengers",
        icon: "user",
      }
    ] : [
      {
        title: chosenTicket.dateFrom,
        category: "From " + directions[0].flightFrom,
        icon: "calendar",
      },
      {
        title: "1 person",
        category: "Passengers",
        icon: "user",
      }
    ];
    
  return (
    <div className={cn("section-mb80", styles.section)}>
      <div className={cn("container", styles.container)}>
        <Control
          className={styles.control}
          urlHome="/tickets"
          breadcrumbs={breadcrumbs}
        />
        <div className={styles.wrapper}>
          <ConfirmAndPay
            className={styles.confirm}
            title="Tickets"
            dates={[chosenTicket.dateFrom, chosenTicket.dateTo]}
            buttonUrl="/checkout-complete"
            guests
          />
          <PriceDetails
            className={styles.price}
            title={`${directions[0].cityFrom} — ${directions[0].cityTo}`}
            items={items}
            table={price}
            logo={chosenTicket.logo}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
