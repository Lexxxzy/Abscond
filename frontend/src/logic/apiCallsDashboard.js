import axios from "axios";
import { managerLogInError, managerLogInSuccess, managerLogOut, setManagerLogedInStatus } from "../data/managerSlice";
import { logInError, logInSuccess } from "../data/userSlice";

const server = axios.create({
  withCredentials: true,
});

const serverIp = "http://127.0.0.1:5000/dashboard";

export const getAirports = async (setPending, setAirports, query, setAirport = null) => {
  try {
    setPending(true)
    const resp = await server.get(`${serverIp}/get-airports`, { params: { airport: query } });
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
    const resp = await server.get(`${serverIp}/get-airlines`, { params: { airline: query } });
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

export const registerManager = async(email, password, name, surname, airline, dispatch, dispatchAction) => {
  try {
    const resp = await server.post(`${serverIp}/manager-register`, {
      email, password, name, surname, airline
    });

    if (resp.data.error != null) {
      dispatchAction(managerLogInError(resp.data))
    }
    else {
      dispatch({ type: "INFO" });
    }

  } catch (error) {
    console.error({ "error": "An error occurred. Request again later" });
  
  }
}

export const loginManager = async(email,password,dispatchAction) => {
  try {
    const resp = await server.post(`${serverIp}/manager-login`, {
      email, password
    });

    if (resp.data.error != null) {
      dispatchAction(managerLogInError(resp.data))
    }
    else {
      dispatchAction(managerLogInSuccess(resp.data));
      window.location.href = "/airlines/dashboard"
    }

  } catch (error) {
    console.error({ "error": "An error occurred. Request again later" });
  
  }
}

export const isManagerLoggedIn = async (dispatchAction) => {
  try {
    const resp = await server.get(serverIp + "/@manager");

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
    await server.post(serverIp + "/manager-logout");
    dispatchAction(managerLogOut())
    window.location.href = "/";
  } catch {
    console.error("Some error occured");
  }

};

export const searchTickets = async (setTickets, search) => {
  try {
    const resp = await server.get(`${serverIp}/tickets`, { params: { query: search } });
    
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
