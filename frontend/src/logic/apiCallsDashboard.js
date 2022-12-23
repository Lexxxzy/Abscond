import axios from "axios";
import { managerLogInError, managerLogInSuccess, managerLogOut, setManagerError, setManagerLogedInStatus } from "../data/managerSlice";
import { logInError, logInSuccess } from "../data/userSlice";
import { serverIp } from "./consts";

const server = axios.create({
  withCredentials: true,
});

var dashboardServerIp = serverIp + '/dashboard';

export const getAirports = async (setPending, setAirports, query, setAirport = null) => {
  try {
    setPending(true)
    const resp = await server.get(`${dashboardServerIp}/get-airports`, { params: { airport: query } });
    if (resp.data.error != null) {
      console.error(resp.data.error)
      setPending(false)
    }
    else {
      setPending(false)
      setAirports(resp.data)
      setAirport !== null && setAirport(resp.data[0])
    }
  } catch (error) {
    setPending(false)
    console.error({ "error": "An error occurred. Request again later" });
    setAirports([])
  }
};


export const getAirlines = async (setPending, setAilines, query, selectAirline = null) => {
  try {
    setPending(true)
    const resp = await server.get(`${dashboardServerIp}/get-airlines`, { params: { airline: query } });
    if (resp.data.error != null) {
      console.error(resp.data.error)
      setPending(false)
    }
    else {
      setPending(false)
      setAilines(resp.data)
      selectAirline !== null && selectAirline(resp.data[0])
    }
  } catch (error) {
    setPending(false)
    console.error({ "error": "An error occurred. Request again later" });
    setAilines([])
  }
};

export const registerManager = async (email, password, name, surname, airline, dispatch, dispatchAction) => {
  try {
    const resp = await server.post(`${dashboardServerIp}/manager-register`, {
      email, password, name, surname, airline
    });

    if (resp.data.error != null) {
      dispatchAction(managerLogInError(resp.data))
    }
    else {
      dispatch({ type: "INFO" });

      window.location.href = "/airlines/dashboard";
    }

  } catch (error) {
    console.error({ "error": "An error occurred. Request again later" });

  }
}

export const loginManager = async (email, password, dispatchAction, snackbarRef) => {
  try {
    const resp = await server.post(`${dashboardServerIp}/manager-login`, {
      email, password
    });

    if (resp.data.error != null) {
      dispatchAction(managerLogInError(resp.data))
      snackbarRef.current.show();
    }
    else {
      dispatchAction(managerLogInSuccess(resp.data));
      dispatchAction(managerLogInError({'error': false}));
      window.location.href = "/airlines/dashboard"
      snackbarRef.current.show();
    }

  } catch (error) {
    console.error({ "error": "An error occurred. Request again later" });

  }
}

export const isManagerLoggedIn = async (dispatchAction) => {
  try {
    const resp = await server.get(dashboardServerIp + "/@manager");

    if (resp.data.error === "Unauthorized") {
      dispatchAction(managerLogOut())

    } else {
      dispatchAction(setManagerLogedInStatus(true))
    }
  } catch (error) {
    console.error("Some error occured")
  }

}

export const logoutManager = async (dispatchAction) => {

  try {
    await server.post(dashboardServerIp + "/manager-logout");
    dispatchAction(managerLogOut())
    window.location.href = "/airlines/login";
  } catch {
    console.error("Some error occured");
  }

};

export const searchTickets = async (setTickets, search) => {
  try {
    const resp = await server.get(`${dashboardServerIp}/tickets`, { params: { query: search } });

    if (resp.data.error != null) {
      console.error(resp.data.error)
    }
    else {
      setTickets(resp.data)
    }
  } catch {
    console.error("Some error occured");
  }
};

export const addTicket = async (ticketInfo, dispatch, setNewTicketId, snackbarRef) => {
  try {
    const resp = await server.post(`${dashboardServerIp}/tickets/add`, ticketInfo);

    if (resp.data.error != null) {
      dispatch(setManagerError(resp.data.error))
      console.error(resp.data.error)
      snackbarRef.current.show();
    }
    else {
      console.log(resp.data)
      setNewTicketId(resp.data[0]['_flightid'])
      snackbarRef.current.show();
    }
  } catch {
    console.error("Some error occured");
  }
};

export const deleteFlight = async (ticketId, snackbar, setTickets) => {
  try {
    const resp = await server.delete(`${dashboardServerIp}/flight/delete`, {
      headers: {
        'Access-Control-Allow-Credentials': true
      },
      params: {
        flight_id: ticketId
      }
    })

    if (resp.data.success == null) {
      console.error('An error occured, try again later')
      return false
    }

    snackbar.current.show()
    searchTickets(setTickets, '')
    return true
  } catch (err) {
    console.error("An error occured")
  }
}
