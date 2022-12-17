import { createSlice } from '@reduxjs/toolkit'

const ticketsInitial = [
    {
      type: "Round",
      items: [],
    },
    {
      type: "OneWay",
      items: [ ],
    },
];

export const ticketSlice = createSlice(
    {
        name: "ticket",
        initialState: {
            tickets: ticketsInitial,
            chosenTicket: null,
            pickedTicketId: null,
            isBought: false,
            searchType: "Round",
            moreInfo: null,
            searchInfo: {
              flightFrom: null,
              flightTo: null,
              timeFlightFrom: null,
              dateFrom: null
            },
            pending: null,
            error: null,
            errorText: null,
        },
        reducers: {
            findTicketStart: (state, action) => {
                state.pending = true;
                state.searchInfo = action.payload;
            },
            findTicketSuccess: (state, action) => {
                state.tickets = action.payload["tikets"];
                state.searchType = action.payload["type"];
                state.pending = false;
            },
            findTicketError: (state, action) => {
                state.errorText = action.payload;
                state.pending = false;
                state.error = true;
            },

            chooseTicket: (state,action) => {
              state.chosenTicket = action.payload["ticket"];
              state.pickedTicketId = action.payload["ticketId"];
            },
            cancelTicket: (state) => {
              state.isBought = false;
              state.pickedTicketId = null;
            },

            buyTicketStart: (state) => {
              state.pending = true;
            },
            buyTicketSuccess: (state, action) => {
                state.isBought = true;
                state.moreInfo = action.payload;
                state.pending = false;
            },
            buyTicketError: (state, action) => {
                state.errorText = action.payload;
                state.pending = false;
                state.error = true;
            },
        }
    }
)

export const { findTicketStart, findTicketSuccess, findTicketError, chooseTicket, cancelTicket, buyTicketStart, buyTicketSuccess, buyTicketError} = ticketSlice.actions;
export default ticketSlice.reducer;