import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-dates/lib/css/_datepicker.css";
import "./styles/app.sass";
import cn from "classnames";
import Page from "./components/Page";
import Flights from "./screens/Flights";
import Tickets from "./screens/Tickets";
import Checkout from "./screens/Checkout";
import CheckoutComplete from "./screens/CheckoutComplete";
import AccountSettings from "./screens/AccountSettings";
import { useEffect } from "react";
import { isLoggedIn } from "./logic/apiCallsUser";
import { useDispatch, useSelector } from "react-redux";
import { NotFound } from "./screens/NotFound";
import Loader from "./components/Loader";
import Directions from "./screens/Directions";
import { LoginManager } from "./components/LoginManager";
import { Dashboard } from "./components/Dashboard";
import { isManagerLoggedIn } from "./logic/apiCallsDashboard";
import Bookings from "./components/Bookings";

function App() {
  const { managerIsLogedIn } = useSelector((state) => state.manager.managerInfo)
  const { isLogedIn } = useSelector((state) => state.user.userInfo)
  const { chosenTicket, pickedTicketId, isBought } = useSelector((state) => state.ticket)
  const { pending } = useSelector((state) => state.ticket)
  const dispatch = useDispatch();
  useEffect(() => { if (!isLogedIn) { isLoggedIn(dispatch); isManagerLoggedIn(dispatch) } }, []);
  
  function ShowTickets(props) {
    const pend = props.pend;
    if (pend === null) {
      return <Tickets />;
    } else {
      return pending === false ?
        <Tickets /> :
        <div style={{ height: "300px" }}>
          <Loader className={cn("center")} />
        </div>
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/"
          element={
            <Page>
              <Flights />
            </Page>
          }
        />
        <Route exact path="/tickets"
          element={
            <Page>
              <ShowTickets pend={pending} />
            </Page>
          }
        />

        <Route exact path="/directions"
          element={
            <Page>
              <Directions />
            </Page>
          }
        />

        <Route exact path="/airlines/login"
          element={
            <Page>
              <LoginManager />
            </Page>
          }
        />

        {
          managerIsLogedIn &&
          <Route exact path="/airlines/dashboard"
            element={
              <Page>
                <Dashboard />
              </Page>
            }
          />
        }

        {isLogedIn &&
          <>
            {chosenTicket != null &&
              <Route exact path="/checkout"
                element={
                  <Page separatorHeader>
                    <Checkout />
                  </Page>
                }
              />
            }

            {(pickedTicketId !== null && chosenTicket !== null && isBought === true) &&
              <Route exact path="/checkout-complete"
                element={
                  <Page separatorHeader>
                    <CheckoutComplete />
                  </Page>
                }
              />
            }

            {/*<
            Route exact path="/profile"
                  element={
                    <Page>
                      <ProfileUser />
                    </Page>
                  }
            />
            */}

            <Route exact path="/account-settings"
              element={
                <Page>
                  <AccountSettings />
                </Page>
              }
            />

            <Route exact path="/bookings"
            element={
              <Page>
                <Bookings />
              </Page>
            }
          />

            {/*<Route exact path="/wishlists" 
                  element={
                    <Page>
                      <Wishlists />
                    </Page>
                  } 
                />*/}
          </>}

        <Route path="/*" element={<Page><NotFound /></Page>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
