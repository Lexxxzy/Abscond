import React, { useEffect } from "react";
import { useNavigate, useLocation,useParams } from "react-router-dom";
import { clearAllBodyScrollLocks } from "body-scroll-lock";
import styles from "./Page.module.sass";
import Header from "../Header";
import Footer from "../Footer";
import { useSelector } from "react-redux";

const Page = ({
  separatorHeader,
  children,
  fooferHide,
  wide,
}) => {
  const { pathname } = useLocation();
  const isAuthorized = useSelector(state=>state.user.userInfo.isLogedIn);
  useEffect(() => {
    window.scrollTo(0, 0);
    clearAllBodyScrollLocks();
  }, [pathname]);

  return (
    <>
      <div className={styles.page}>
        <Header
          separatorHeader={separatorHeader}
          wide={wide}
          notAuthorized={!isAuthorized}
        />
        <div className={styles.inner}>{children}</div>
        {!fooferHide && <Footer />}
      </div>
    </>
  );
};

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
};

export default withRouter(Page);
