import React, { useState } from 'react'
import { SideMenu } from '../../screens/AccountSettings/SideMenu'
import cn from "classnames";
import styles from "./Dashboard.module.sass";
import { AddTicket } from './AddTicket';
import { AvailibleTickets } from '../AvailibleTickets';
import { logoutManager } from '../../logic/apiCallsDashboard';
import { useDispatch } from 'react-redux';

const items = [
  {
    title: "Add ticket",
    icon: "plus-circle",
  },
  {
    title: "Availible tickets",
    icon: "monitor",
  },
  {
    title: "Company profile",
    icon: "user",
  },
];

export const Dashboard = () => {
  const options = [];
  items.map((x) => options.push(x.title));

  const [activeTab, setActiveTab] = useState(options[0]);
  const dispatch = useDispatch();
  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <SideMenu items={items} options={options} activeTab={activeTab} setActiveTab={setActiveTab} >
          <button className={cn(styles.link,styles.svg__margin)} onClick={() => logoutManager(dispatch)}>
            <svg width="16" height="16" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">

              <path d="M6.28518 0.252852C6.26712 0.255845 6.24906 0.258854 6.23086 0.261864L4.40883 0.563942C3.53729 0.708404 2.81386 0.828324 2.24426 0.996993C1.64397 1.17477 1.12488 1.43066 0.72221 1.90346C0.319544 2.37626 0.151162 2.92765 0.0735997 3.54591C-7.62854e-05 4.13249 3.25793e-10 4.86203 3.25793e-10 5.74093V10.2591C3.25793e-10 11.138 -7.62854e-05 11.8676 0.0735997 12.4542C0.151162 13.0724 0.319544 13.6238 0.72221 14.0966C1.12488 14.5694 1.64397 14.8253 2.24426 15.003C2.81386 15.1717 3.53729 15.2916 4.40883 15.436L6.28518 15.7472C7.0624 15.8761 7.72472 15.986 8.25829 15.9988C8.82545 16.0124 9.38589 15.9226 9.85838 15.5245C10.3309 15.1263 10.512 14.5912 10.5917 14.0324C10.6667 13.5068 10.6667 12.8389 10.6667 12.0551V11.8394C10.6667 11.4209 10.3255 11.0815 9.90477 11.0815C9.48398 11.0815 9.14286 11.4209 9.14286 11.8394V12.0002C9.14286 12.854 9.14103 13.413 9.08305 13.8194C9.02803 14.2047 8.93981 14.3119 8.87345 14.3679C8.80709 14.4238 8.68625 14.4928 8.29509 14.4834C7.88259 14.4735 7.328 14.3833 6.48137 14.243L4.70705 13.9488C3.77554 13.7944 3.14674 13.6887 2.67909 13.5503C2.23177 13.4178 2.02392 13.28 1.88495 13.1168C1.74591 12.9536 1.64351 12.727 1.58568 12.2663C1.52518 11.7847 1.52381 11.1503 1.52381 10.2109V5.78906C1.52381 4.84971 1.52518 4.21535 1.58568 3.7337C1.64351 3.27305 1.74591 3.04647 1.88495 2.88322C2.02392 2.71997 2.23177 2.58223 2.67909 2.44976C3.14674 2.31125 3.77554 2.20561 4.70705 2.05117L6.48137 1.75701C7.328 1.61666 7.88259 1.52655 8.29509 1.51663C8.68625 1.50723 8.80709 1.57623 8.87345 1.63215C8.93981 1.68808 9.02803 1.79529 9.08305 2.18064C9.14103 2.58697 9.14286 3.14599 9.14286 3.99975V4.31055C9.14286 4.72913 9.48398 5.06844 9.90477 5.06844C10.3255 5.06844 10.6667 4.72913 10.6667 4.31055V3.99975C10.6667 3.98143 10.6667 3.96315 10.6667 3.94495C10.6667 3.1612 10.6667 2.49321 10.5917 1.96763C10.512 1.40885 10.3309 0.87373 9.85838 0.47558C9.38589 0.0774309 8.82545 -0.0123334 8.25829 0.00129344C7.7248 0.014117 7.0624 0.123965 6.28518 0.252852Z" />
              <path d="M11.8324 10.8684C11.5577 10.5711 11.5577 10.089 11.8324 9.79158L12.7417 8.80713L6.70332 8.80713C6.31486 8.80713 6 8.46624 6 8.0457C6 7.62516 6.31486 7.28427 6.70332 7.28427L12.7417 7.28427L11.8324 6.29982C11.5577 6.00249 11.5577 5.52035 11.8324 5.22301C12.107 4.92566 12.5523 4.92566 12.827 5.22301L14.9369 7.5073C15.2115 7.80464 15.2115 8.28677 14.9369 8.58411L12.827 10.8684C12.5523 11.1658 12.107 11.1658 11.8324 10.8684Z" />

            </svg>
            <span className={styles.sign}>Sign out</span>
          </button>
        </SideMenu>

        <div className={styles.wrapper}>
          {activeTab === options[0] && <AddTicket />}
          {activeTab === options[1] && <AvailibleTickets />}

        </div>
      </div>
    </div>
  )
}
