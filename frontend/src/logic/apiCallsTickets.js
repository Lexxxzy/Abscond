import axios from "axios";
import { buyTicketError, buyTicketStart, buyTicketSuccess, cancelTicket, chooseTicket, findTicketError, findTicketStart, findTicketSuccess } from "../data/ticketSlice";
import { serverIp } from "./consts";

const server = axios.create({
  withCredentials: true,
});


export const getCities = async (city) => {
  try {
    const resp = await server.get(serverIp + '/tickets/cities', { params: { city: city } });
    const cities = resp.data.city;

    const citiesStringified = cities.map(function (item) {
      return item['city_title'] + ", " + item['city_code'];
    });

    return Promise.all(citiesStringified)

  } catch (err) {
    console.error("An error occured")
    return []
  }
}

export const getTickets = async (searchInfo, dispatchAction, navigate, type) => {
  dispatchAction(findTicketStart(searchInfo))
  navigate("/tickets");

  try {
    const resp = await server.get(serverIp + '/tickets/get', {
      params: {
        departureCity: searchInfo.flightFrom,
        arrivalCity: searchInfo.flightTo,
        departurelDate: searchInfo.timeFlightFrom,
        arrivalDate: searchInfo.timeFlightTo
      }
    });

    if (resp.data.error != null) {
      dispatchAction(findTicketError(resp.data.error))

      return false
    }

    const tickets = resp.data;
    const numberInArray = type === "Round" ? 0 : 1;

    dispatchAction(findTicketSuccess({ "tikets": tickets, "type": type, "position": numberInArray }))

    return true
  } catch (err) {

    console.error("An error occured")
  }
}

export const pickTicket = async (dispatchAction, navigate, item) => {
  try {
    const resp = await server.get(serverIp + '/tickets/get/boarding', { params: { flight_no: item.flight_id } });

    if (resp.data.error != null) {
      dispatchAction(findTicketError(resp.data.error))

      return false
    }

    const ticketId = resp.data["boarding"];

    dispatchAction(chooseTicket({ "ticket": item, "ticketId": ticketId }))
    navigate("/checkout");

    return true
  } catch (err) {

    console.error("An error occured")
  }

}

export const deleteTicket = async (ticketId, dispatchAction) => {
  try {
    const resp = await server.delete(serverIp + '/tickets/booking/cancelled', {
      headers: {
        'Access-Control-Allow-Credentials': true
      },
      params: {
        ticket_id: ticketId
      }
    })
    if (resp.data.error != null) {
      dispatchAction(findTicketError(resp.data.error))

      return false
    }

    dispatchAction(cancelTicket())

    return true
  } catch (err) {
    console.error("An error occured")
  }
}

export const buyTicket = async (ticket_id, flight_date, dispatchAction, passport, navigate, url_to) => {
  dispatchAction(buyTicketStart())
  try {

    const resp = await server.post(serverIp + '/tickets/buy', {
        "passport_id": passport.id,
        "issue_date": passport.issue_date,
        "name": passport.name,
        "surname": passport.surname,
        "gender": passport.gender,
        "ticket_id": ticket_id,
        "flight_date": flight_date
      })
      console.log(flight_date)
    if (resp.data.error != null) {
      dispatchAction(buyTicketError(resp.data.error))

      return false
    }
    
    dispatchAction(buyTicketSuccess(resp.data))
    navigate(url_to)

    return true
  } catch (err) {
    console.error("An error occured")
  }
}