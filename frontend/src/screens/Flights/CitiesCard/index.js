import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./CitiesCard.module.sass";
import { Link } from "react-router-dom";

const CitiesCard = () => {
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

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
      <Link to="/directions">
        <div className={styles.card}>
            <div className={styles.head}>
                <span className={styles.legend__text}>Cities map  <span>🌍</span></span>
                <h2 className={styles.header__text}>Look where you can fly right now! </h2> 
                <button className={styles.button__text}>
                    Availible cities
                </button>
            </div>
            <div className={styles.card__image}>
                <img className={styles.image__front} src='images/content/globe-smile4.png' alt="Globe"></img>
                <img className={styles.image__back} src='images/content/globe-smile3.png' alt="Globe"></img>
            </div>
            
        </div>
        </Link>
      </div>
    </div>
  );
};

export default CitiesCard;
