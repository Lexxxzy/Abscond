import axios from "axios";
import { logInStart, logInError, logInSuccess, logOut, setLogedInStatus, setUserInfo, logInNext, loadDocumentsSuccess, loadDocumentsStart, loadDocumentsError, updateInfoStart, updateInfoError } from "../data/userSlice";

const server = axios.create({
  withCredentials: true,
});

const serverIp = "http://127.0.0.1:5000";

export const isLoggedIn = async (dispatchAction) => {
  try {
    const resp = await server.get(serverIp + "/@me");

    if (resp.data.error === "Unauthorized") {
      dispatchAction(logOut())

    } else {
      dispatchAction(setLogedInStatus(true))
    }
  } catch (error) {
    console.error("Some error occured")
  }

}

export const logoutUser = async (dispatchAction) => {

  try {
    await server.post(serverIp + "/logout");
    dispatchAction(logOut())
    window.location.href = "/";
  } catch {
    console.error("Some error occured");
  }

};

export const getUserInfo = async (dispatchAction) => {

  try {
    const resp = await server.get(serverIp + "/@me/info");
    const userInfo = {
      email: resp.data.email,
      phone: resp.data.phone,
      login: resp.data.login
    }
    dispatchAction(setUserInfo(userInfo))
  } catch {
    console.error("Some error occured");
  }

};

export const updateUserInfo = async (dispatchAction, newPhone, newlogin) => {
  dispatchAction(updateInfoStart())
  try {
    const resp = await server.patch(serverIp + "/@me/info/add", {
      "phone_number": newPhone,
      "login": newlogin
    });

    if (resp.data.error != null) {
      dispatchAction(updateInfoError({ "error": resp.data.error }));

      return false;
    }

    const userInfo = {
      phone: resp.data.phoneNumber,
      login: resp.data.login
    }

    dispatchAction(setUserInfo(userInfo))
  } catch {
    console.error("Some error occured");
  }

};

export const getUserDocuments = async (dispatchAction) => {
  dispatchAction(loadDocumentsStart());
  try {
    const resp = await server.get(serverIp + "/@me/documents");
    const userDocuments = {
      passport: resp.data.passport,
      //foreignPassport: resp.data.foreign_passport
    }

    dispatchAction(loadDocumentsSuccess(userDocuments))

  } catch (resp) {
    dispatchAction(loadDocumentsError("An error occurred"));
  }

};

export const setUserDocuments = async (passport, dispatchAction) => {
  dispatchAction(loadDocumentsStart());
  try {
    const resp = await server.post(serverIp + "/@me/passport/add",
      passport
    );

    if (resp.data.error != null) {
      dispatchAction(loadDocumentsError(resp.data));
    }
    else {
      dispatchAction(loadDocumentsSuccess(resp.data.passport))
    }

  } catch {
    dispatchAction(loadDocumentsError({ "error": "Something went wrong" }))
    console.error("Some error occured");
  }
}

export const checkEmail = async (email, dispatchAction, is_from_manager) => {
  dispatchAction(logInStart);
  try {
    const resp = await server.get(serverIp + "/check-user-mail", { params: { email: email, is_manager: is_from_manager } });

    if (resp.data.error != null) {
      dispatchAction(logInError({ "error": "Wrong E-mail" }));

      return false;
    }
    dispatchAction(logInNext());

    return true;
  } catch {
    dispatchAction(logInError({ "error": "User with this email already exists" }));

    return false;
  }

};

export const checkPassword = async (password, dispatchAction) => {
  dispatchAction(logInStart);
  try {
    const resp = await server.get(`${serverIp}/check-user-pass`, { params: { password: password } });

    if (resp.data.result !== 'Valid') {
      dispatchAction(logInError({ "error": resp.data.result }));
      return false;
    }

    dispatchAction(logInNext());
    return true;

  } catch {
    dispatchAction(logInError({ "error": "An error occurred" }));
    return true;
  }

};

export const logUserIn = async (email, password, dispatchAction, isFromTickets, navigate) => {
  try {
    const resp = await server.post(`${serverIp}/login`, {
      email,
      password,
    });
    if (resp.data.error != null) {
      dispatchAction(logInError(resp.data));
    }
    else {
      dispatchAction(logInSuccess(resp.data));
      window.location.href = "/"

    }


  } catch (error) {
    dispatchAction(logInError({ "error": "An error occurred. Request again later" }));
  }
};

export const registerUser = async (email, password, dispatchAction, isFromTickets, navigate, isFromManagement) => {
  try {
    const resp = await server.post(`${serverIp}/register`, {
      email,
      password,
    });

    if (resp.data.error != null) {
      dispatchAction(logInError(resp.data))
    }
    else {
      dispatchAction(logInSuccess(resp.data));

      window.location.href = "/airlines/dashboard";
    }

  } catch {
    dispatchAction(logInError({ "error": "Something went wrong" }))
    console.error("Some error occured");
  }
}

export default server