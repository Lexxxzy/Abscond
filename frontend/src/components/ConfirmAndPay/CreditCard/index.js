import React, { useRef, useState } from "react";
import cn from "classnames";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CreditCard.module.sass";
import TextInput from "../../TextInput";
import Snackbar, { SnackbarType } from "../../Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { buyTicket } from "../../../logic/apiCallsTickets";
import moment from "moment";

const cards = [
  {
    image: "./images/content/visa.svg",
    alt: "Visa",
  },
  {
    image: "./images/content/master-card.svg",
    alt: "Master Card",
  },
];

const CreditCard = ({ className, buttonUrl, passport, genderOption }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pickedTicketId,searchInfo } = useSelector((state) => state.ticket)
  const [error,setError] = useState(null)

  const [card, setCard] = useState({
    "id": '',
    "holder": '',
    "expire": '',
    "cvc": ''
  });

  const snackbarRef = useRef(null);

  const checkAndBuy = ( ) => {
    passport.issue_date = passport.issue_date.replaceAll(".", "-");
    passport.id = passport.id.replace(" ", "");
    passport.gender = genderOption === "Man" ? 'M' : 'W';

    if(card.id.length < 18 || !card.holder.includes(" ") || card.holder.length < 4 || card.expire < 4 || card.cvc.length!==3)
    {
      setError(true);
      snackbarRef.current.show();
      return 1
    }
    const flight_date = moment(searchInfo.timeFlightFrom).format('MM.DD.YYYY')
    
    if (flight_date === "Invalid date") {
      return 1
    }

    buyTicket(pickedTicketId, flight_date, dispatch, passport, navigate, buttonUrl, setError)
    
    snackbarRef.current.show();
  }

  const onInputChange = e => {
    var { name, value } = e.target;

    setCard(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleKeyUpId = (e) => {
    setCard(prev => ({
      ...prev,
      "id": e.target.value
    }))

    if (e.key !== "Backspace") {
      var num = e.target.value.replace(/\D/g, '').split(/(?=.)/), i = num.length - 1;
      if (i >= 3) num.splice(4, 0, ' ');
      if (i >= 8) num.splice(9, 0, ' ');
      if (i >= 13) num.splice(14, 0, ' ');
      e.target.value = num.join('');
    }

  }

  const handleKeyUpDate = (e) => {
    setCard(prev => ({
      ...prev,
      "expire": e.target.value
    }))

    if (e.key !== "Backspace") {
      var num = e.target.value.replace(/\D/g, '').split(/(?=.)/), i = num.length - 1;
      if (i >= 1) num.splice(2, 0, '/');
      e.target.value = num.join('');
    }

  }

  return (
    <div className={cn(className, styles.confirm)}>
      <div className={styles.line}>
        <div className={styles.subtitle}>Card</div>
        <div className={styles.cards}>
          {cards.map((x, index) => (
            <div className={styles.card} key={index}>
              <img src={x.image} alt={x.alt} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.fieldset}>
        <TextInput
          className={styles.field}
          label="Card number"
          name="id"
          onKeyUp={handleKeyUpId}
          type="tel"
          placeholder="XXXX XXXX XXXX XXXX"
          required
          onChange={onInputChange}
          maxLength="19"
        />
        <TextInput
          className={styles.field}
          label="Cardholder name"
          name="holder"
          type="text"
          placeholder="JOHN SMITH"
          required
          onChange={onInputChange}
        />
        <div className={styles.row}>
          <TextInput
            className={styles.field}
            label="EXPIRY DATE"
            name="expire"
            type="tel"
            placeholder="MM / YY"
            maxLength="5"
            required
            onChange={onInputChange}
            onKeyUp={handleKeyUpDate}
          />
          <TextInput
            className={styles.field}
            label="CVC"
            name="cvc"
            type="password"
            placeholder="CVC"
            required
            inputMode="numeric" 
            minLength="3"
            maxLength="3"
            onChange={onInputChange}
          />
        </div>
      </div>
      <button className={cn("button", styles.button)} onClick={checkAndBuy}>
      Confirm and pay
      </button>

      {error ?
        <Snackbar
          ref={snackbarRef}
          message="Please, fill in all fields"
          type={SnackbarType.error}
        /> :
        <Snackbar
          ref={snackbarRef}
          message="Tickets purchased!"
          type={SnackbarType.success}
        />
      }
    </div>
  );
};

export default CreditCard;
