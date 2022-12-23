import React, { useState } from "react";
import cn from "classnames";
import styles from "./Main.module.sass";
import Panel from "../../../components/Panel";
import Location from "../../../components/Location";
import DateRange from "../../../components/DateRange";
import Guests from "../../../components/Guests";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTickets } from "../../../logic/apiCallsTickets";
import DateSingle from "../../../components/DateSingle";

const Main = ({ items, value, setValue }) => {

  const { flightFrom, flightTo, timeFlightFrom, timeFlightTo } = useSelector((state) => state.ticket.searchInfo)

  const [ticket, setTicket] = useState({
    departureCity: flightFrom ? flightFrom : "",
    arrivalCity: flightTo ? flightTo : "",
    timeFlightFrom: null,
    timeFlightTo: null,
  })

  const onInputChange = (name, value) => {

    setTicket(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const setStartDate = (startDate) => {
    setTicket(prev => ({
      ...prev,
      timeFlightFrom: startDate
    }));
  }

  const setEndDate = (endDate) => {
    setTicket(prev => ({
      ...prev,
      timeFlightTo: endDate
    }));

  }
  const [searchShake, setSearchShake] = useState()
  
  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearchTickets = () => {
    console.log(ticket.departureCity)
    if (value === "Round") {
      if (!ticket.departureCity || !ticket.arrivalCity ||
        !ticket.timeFlightFrom || !ticket.timeFlightTo) {
        setSearchShake(true)
        delay(800).then(() => setSearchShake(false));
        console.log("All fields must be filled")
        return 1
      }
    } else {
      if (!ticket.departureCity || !ticket.arrivalCity||
        !ticket.timeFlightFrom) {
        setSearchShake(true)
        delay(800).then(() => setSearchShake(false));
        return 1
      }
    }

    const searchInfo = {
      flightFrom: ticket.departureCity,
      flightTo: ticket.arrivalCity,
      timeFlightFrom: ticket.timeFlightFrom.format('DD MMM, YYYY'),
      timeFlightTo: value === "Round" ? ticket.timeFlightTo.format('DD MMM, YYYY') : null,
    }

    getTickets(searchInfo, dispatch, navigate, value)
  }

  return (
    <div className={cn("section-mb80", styles.section)}>
      <div className={styles.bg}>
        <img src="/images/content/bg-flight-1.jpg" alt="Flight" />
      </div>
      <div className={cn("container", styles.container)}>
        <Panel
          className={styles.panel}
          classBody={styles.body}
          classButtonSearch={cn(styles.search,
            searchShake===true ? styles.animation : ''
          )}
          onSearch={handleSearchTickets}
          onAnimationEnd={() => setSearchShake(false)}
        >


          <div className={styles.controls}>
            <div className={styles.nav}>
              <button
                className={cn(
                  "button-stroke button-small", {
                  [styles.active]: "Round" === value,
                },
                  styles.link
                )} onClick={() => setValue("Round")}
              >
                Round trip
              </button>
              <button className={cn("button-stroke button-small", styles.link, {
                [styles.active]: "OneWay" === value,
              })} onClick={() => setValue("OneWay")}>
                One way
              </button>
            </div>
            <Guests className={styles.guests} title="1 person" />
          </div>
          <div className={styles.row}>
            <Location
              className={styles.location}
              icon="marker"
              description="Departure city"
              placeholder={flightFrom !== null ? flightFrom : "From"}
              onLocationChange={onInputChange}
              name="departureCity"
              isTop={false}
            />
            <Location
              className={styles.location}
              icon="location"
              description="Arrival city"
              placeholder={flightTo !== null ? flightTo : "To"}
              onLocationChange={onInputChange}
              name="arrivalCity"
              isTop={false}
            />

            {value === "Round" ? <DateRange
              className={styles.date}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              startDate={ticket.timeFlightFrom}
              endDate={ticket.timeFlightTo}
              icon="calendar"
              description="Choose date"
              startDatePlaceholderText={timeFlightFrom !== null ? timeFlightFrom : "When"}
              endDatePlaceholderText={timeFlightTo !== undefined ? timeFlightTo : "Return"}
              displayFormat="MMM DD, YYYY"
            /> :
              <DateSingle
                className={styles.date}
                date={ticket.timeFlightFrom}
                setDate={setStartDate}
                icon="calendar"
                description="Choose date"
                placeholder={timeFlightFrom !== null ? timeFlightFrom : "When"}
                displayFormat="MMM DD, YYYY"
              />}
          </div>

        </Panel>
      </div>
    </div>
  );
};

export default Main;
