import React, { useState } from "react";
import cn from "classnames";
import styles from "./Header.module.sass";
import { Link } from "react-router-dom";
import User from "./User";
import Modal from "../Modal";
import Login from "../Login";
import { useDispatch } from "react-redux";
import { logInCancelled } from "../../data/userSlice";

const items = [
  {
    menu: [
      {
        title: "My trips",
        icon: "home",
        url: "/bookings",
      },/*
      {
        title: "Wishlist",
        icon: "email",
        url: "/wishlists",
      },*/
    ],
  }
];

const Header = ({ separatorHeader, wide, notAuthorized }) => {
  const [visibleNav, setVisibleNav] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatchAction = useDispatch();

  const onModalClose = () => {
    dispatchAction(logInCancelled());
    setVisible(false);
  }
  return (
    <>
      <div
        className={cn(
          styles.header,
          { [styles.headerBorder]: separatorHeader },
          { [styles.wide]: wide }
        )}
      >
        <div className={cn("container", styles.container)}>
          <Link className={styles.logo} to="/">
            <img
              className={styles.pic}
              src="/images/logo-light.svg"
              alt="Abscond"
            />
          </Link>
          <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
          </div>
          {/*<Notification className={styles.notification} />*/}
          {notAuthorized ? (
            <div className={styles.wrap} onClick={() => setVisible(true)}>
            <button className={styles.login}>
              <svg width="16" height="16" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.49953 0.221238C5.48373 0.223857 5.46793 0.22649 5.452 0.229123L3.85773 0.493442C3.09513 0.619846 2.46213 0.724776 1.96373 0.872361C1.43847 1.02792 0.984267 1.25182 0.631934 1.66552C0.279601 2.07922 0.132267 2.56169 0.0643997 3.10266C-6.67498e-05 3.61592 2.84672e-10 4.25427 2.84672e-10 5.02331V8.97667C2.84672e-10 9.74573 -6.67498e-05 10.3841 0.0643997 10.8974C0.132267 11.4383 0.279601 11.9208 0.631934 12.3345C0.984267 12.7482 1.43847 12.9721 1.96373 13.1276C2.46213 13.2752 3.09513 13.3801 3.85773 13.5065L5.49953 13.7788C6.1796 13.8916 6.75913 13.9877 7.226 13.9989C7.72227 14.0108 8.21265 13.9323 8.62608 13.5839C9.03951 13.2355 9.19802 12.7673 9.26778 12.2783C9.3334 11.8184 9.33337 11.234 9.33333 10.5482V10.3595C9.33333 9.99328 9.03485 9.69632 8.66667 9.69632C8.29848 9.69632 8 9.99328 8 10.3595V10.5002C8 11.2472 7.9984 11.7364 7.94767 12.092C7.89953 12.4291 7.82233 12.5229 7.76427 12.5719C7.7062 12.6208 7.60047 12.6812 7.2582 12.673C6.89727 12.6643 6.412 12.5854 5.6712 12.4626L4.11867 12.2052C3.3036 12.0701 2.7534 11.9776 2.3442 11.8565C1.9528 11.7406 1.77093 11.62 1.64933 11.4772C1.52767 11.3344 1.43807 11.1361 1.38747 10.733C1.33453 10.3116 1.33333 9.75654 1.33333 8.93456V5.06542C1.33333 4.24349 1.33453 3.68842 1.38747 3.26698C1.43807 2.86391 1.52767 2.66565 1.64933 2.52281C1.77093 2.37997 1.9528 2.25944 2.3442 2.14353C2.7534 2.02234 3.3036 1.9299 4.11867 1.79477L5.6712 1.53738C6.412 1.41457 6.89727 1.33572 7.2582 1.32704C7.60047 1.31882 7.7062 1.37919 7.76427 1.42812C7.82233 1.47706 7.89953 1.57087 7.94767 1.90805C7.9984 2.26359 8 2.75273 8 3.49977V3.77172C8 4.13798 8.29848 4.43488 8.66667 4.43488C9.03485 4.43488 9.33333 4.13798 9.33333 3.77172V3.49977C9.33333 3.48374 9.33333 3.46775 9.33333 3.45182C9.33337 2.76604 9.3334 2.18155 9.26778 1.72167C9.19802 1.23274 9.03951 0.764506 8.62608 0.416125C8.21265 0.0677444 7.72227 -0.0107994 7.226 0.00112412C6.7592 0.0123447 6.1796 0.108462 5.49953 0.221238Z"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M6.89677 4.19513C7.13709 4.45532 7.13709 4.87716 6.89677 5.13736L6.10114 5.99876H11.3847C11.7246 5.99876 12.0001 6.29704 12.0001 6.66501C12.0001 7.03298 11.7246 7.33126 11.3847 7.33126H6.10114L6.89677 8.19265C7.13709 8.45282 7.13709 8.87469 6.89677 9.13486C6.65644 9.39504 6.2668 9.39504 6.02648 9.13486L4.18032 7.13611C3.94 6.87594 3.94 6.45407 4.18032 6.1939L6.02648 4.19513C6.2668 3.93495 6.65644 3.93495 6.89677 4.19513Z"/>
              </svg>
              <span className={styles.sign}>Sign in</span>
            </button>
            
            </div>
          ) : (
            <User className={styles.user} items={items} />
          )}
          {/*<button
            className={cn(styles.burger, { [styles.active]: visibleNav })}
            onClick={() => setVisibleNav(!visibleNav)}
          />*/}
        </div>
      </div>
      <Modal visible={visible} onClose={onModalClose}>
        <Login isFromTickets={false} isFromManagement={false}/>
    </Modal>
    </>
  );
};

export default Header;
