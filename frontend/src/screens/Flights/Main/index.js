import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Main.module.sass";
import Panel from "../../../components/Panel";
import Location from "../../../components/Location";
import DateRange from "../../../components/DateRange";
import Guests from "../../../components/Guests";
import { getTickets } from "../../../logic/apiCallsTickets";
import { useDispatch } from "react-redux";
import DateSingle from "../../../components/DateSingle";
import { Earth } from "./earth";


const Main = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState("Round");
  const [searchShake, setSearchShake] = useState()
  const [ticket, setTicket] = useState({
    departureCity: "",
    arrivalCity: "",
    timeFlightFrom: null,
    timeFlightTo: null,
  })
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = width <= 768;
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

  const navigate = useNavigate();
  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  const handleSearchTickets = () => {
    if (type === "Round") {
      if (ticket.departureCity === null || ticket.arrivalCity === null ||
        ticket.timeFlightFrom === null || ticket.timeFlightTo === null) {
          setSearchShake(true)
          delay(800).then(() => setSearchShake(false));
          return 1
      }
    } else {
      if (ticket.departureCity === null || ticket.arrivalCity === null ||
        ticket.timeFlightFrom === null) {
          setSearchShake(true)
          delay(800).then(() => setSearchShake(false));
          return 1
      }
    }

    const searchInfo = {
      flightFrom: ticket.departureCity,
      flightTo: ticket.arrivalCity,
      timeFlightFrom: ticket.timeFlightFrom.format('DD MMM, YYYY'),
      timeFlightTo: type === "Round" ? ticket.timeFlightTo.format('DD MMM, YYYY') : null,
    }

    getTickets(searchInfo, dispatch, navigate, type)

  }
  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.preview}>
          <picture className={styles.preview__image}>
            <source
              media="(max-width: 767px)"
              srcSet="/images/content/back_mobile.svg"
            />
            <img src="/images/content/main-pic-3.jpg" alt="Main" />
          </picture>
          <div className={styles.wrap}>
            <h1 className={cn("hero", styles.title)}>The journey<br /> begins
                  <Earth/>
            </h1>
            <div className={cn("info", styles.info)}>
              Find and book the unforgettable experience <br /> that will last a lifetime!
            </div>
            <Link
              className={cn("button", styles.button, styles.find)}
              to="/tickets"
            >
              Find tickets
            </Link>
            {isMobile
              &&
              <div className={cn(styles.controls, styles.double__button)}>
                <button
                  className={cn(
                  {
                    [styles.active]: "Round" === type,
                  },
                    styles.button
                  )} onClick={() => setType("Round")}
                >
                  Round trip
                </button>
                <button className={cn(styles.button, {
                  [styles.active]: "OneWay" === type,
                })} onClick={() => setType("OneWay")}>
                  One way
                </button>
              </div> 
            }
          </div>
        </div>

        <Panel
          className={styles.panel}
          menu
          classBody={styles.body}
          classButtonSearch={cn(styles.search,
            searchShake===true ? styles.animation : ''
          )}
          onSearch={handleSearchTickets}
          onAnimationEnd={() => setSearchShake(false)}
        >
        {!isMobile &&
          <div className={styles.controls}>
            <button
              className={cn(
                "button-stroke button-small", {
                [styles.active]: "Round" === type,
              },
                styles.button
              )} onClick={() => setType("Round")}
            >
              Round trip
            </button>
            <button className={cn("button-stroke button-small", styles.button, {
              [styles.active]: "OneWay" === type,
            })} onClick={() => setType("OneWay")}>
              One way
            </button>
            {/*<Guests className={styles.guests} title="1 person" /> */}
          </div>}
          <div className={styles.row}>
            <Location
              className={styles.location}
              icon="marker"
              description="Departure city"
              placeholder="From"
              onLocationChange={onInputChange}
              name="departureCity"
              isTop={true}
            />
            <Location
              className={styles.location}
              icon="location"
              description="Arrival city"
              placeholder="To"
              onLocationChange={onInputChange}
              name="arrivalCity"
              isTop={true}
            />
            {type === "Round" ?
              <DateRange
                className={styles.date}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                startDate={ticket.timeFlightFrom}
                endDate={ticket.timeFlightTo}
                icon="calendar"
                description="Choose date"
                startDatePlaceholderText="When"
                endDatePlaceholderText="Return"
                displayFormat="MMM DD, YYYY"
              /> :
              <DateSingle
                className={styles.date}
                date={ticket.timeFlightFrom}
                setDate={setStartDate}
                icon="calendar"
                description="Choose date"
                placeholder="When"
                displayFormat="MMM DD, YYYY"
              />
            }
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default Main;
