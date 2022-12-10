import React from "react";
import cn from "classnames";
import styles from "./FlightDashboard.module.sass";
import Icon from "../../Icon";
import moment from "moment";

const FlightDashboard = ({ className, item }) => {
  return (
    <>
      <div className={cn(className, styles.flight)}>
        <div className={styles.wrap}>
          <div className={styles.item} >
            <div className={styles.details}>
              <div className={styles.box}>
                <div className={styles.title}>{moment(item.departure_time, "HH:mm:ss").format('H:mm')}</div>
                <div className={styles.time}>{item.city_from}, {item.departure_airport}</div>
              </div>
              <div className={styles.note}>Flight time: {moment(item.duration, "HH:mm:ss").format('H')}h {moment(item.duration, "HH:mm:ss").format('mm')}m</div>
              <div className={styles.boxright}>
                <div className={styles.title}>{moment(item.arrival_time, "HH:mm:ss").format('H:mm')}</div>
                <div className={styles.time}>{item.city_to}, {item.flight_to}</div>
              </div>
            </div>
          </div>

        </div>
        <div className={styles.control}>
          <div className={styles.info}>
            <Icon name="tick" size="20" />
            {item.info}

          </div>
          <div className={styles.info}>
            <Icon name="calendar" size="20" />

            {item.week_days.map((x, index) => (
              <span key={index}>
                {x}{index !== item.week_days.length - 1 && ', '}
              </span>
            ))}
          </div>
          <div className={styles.info}>
            <Icon name="stopwatch" size="20" />
            {item.week}
          </div>
          <div className={styles.info}>
            <Icon name="credit-card" size="20" />
            {item.price} rub.
          </div>
          <div className={styles.info}>
            <Icon name="route" size="20" />
            {item.flight_id}
          </div>
        </div>
      </div>

    </>
  );
};

export default FlightDashboard;
