import React, { useState } from "react";
import cn from "classnames";
import styles from "./Catalog.module.sass";
import Control from "../../../components/Control";
import Dropdown from "../../../components/Dropdown";
import Flight from "../../../components/Flight";
import Filters from "./Filters";
import { useSelector } from "react-redux";

const breadcrumbs = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Tickets",
  },
];

const navigation = ["Cheap", "Best", "Fastest"];

//const statusOptions = ["Recommendations", "Popular", "Price"];
const sortingOptions = [];
navigation.map((x) => sortingOptions.push(x));

const Catalog = ({ items: searchedTickets, value }) => {
  //const [status, setStatus] = useState(statusOptions[0]);
  const [sorting, setSorting] = useState(sortingOptions[0]);

  const [visible, setVisible] = useState(false);

  const { pending } = useSelector((state) => state.ticket)

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <Control
          className={styles.control}
          urlHome="/"
          breadcrumbs={breadcrumbs}
        />
        <div className={styles.sorting}>
          <div className={styles.box}>
            
            <Filters
              className={cn(styles.filters, { [styles.active]: visible })}
            />
            {/*<Dropdown
              className={styles.dropdown}
              value={status}
              setValue={setStatus}
              options={statusOptions}
            />*/}

          </div>

          <div className={cn("mobile-show", styles.box)}>
            <Dropdown
              className={styles.dropdown}
              value={sorting}
              setValue={setSorting}
              options={sortingOptions}
            />
            <button
              className={cn("button-stroke", styles.button, {
                [styles.active]: visible,
              })}
              onClick={() => setVisible(!visible)}
            >
            Additional filters
            </button>

            
          </div>
          <div className={styles.nav}>
          {navigation.map((x, index) => (
            <button
              className={cn(styles.link, {
                [styles.active]: x === sorting,
              })}
              onClick={() => setSorting(x)}
              key={index}
            >
              {x}
            </button>
          ))}
        </div>

        </div>
        <div className={styles.wrapper}>
          <div
            className={cn(styles.filters, { [styles.active]: visible })}
           />
          <div className={styles.inner}>
            { pending === false && (
              searchedTickets.find((x) => x.type === value).items.length !== 0 ?

              searchedTickets.find((x) => x.type === value).items.map((x, index) => (
                  <Flight className={styles.flight} item={x} key={index} />
                ))

                : <div className={styles.notickets}>
                  <img width={"300px"} src="images/content/globa-sad.png" alt="No tickets found :("></img>
                  <br />

                  <br />
                  No tickets matching your query were found...
                </div>
            )
            }
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Catalog;
