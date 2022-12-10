import { createSlice } from '@reduxjs/toolkit'

const managerInitial = {
    managerIsLogedIn: false,
    name: null,
    surname: null,
    email: null,
    airline: null,
}

export const managerSlice = createSlice(
    {
        name: "user",
        initialState: {
            managerInfo: {
                managerInitial
            },
            managerPending: null,
            managerError: null,
            managerErrorText: null,
        },
        reducers: {
            managerLogInStart: (state) => {
                state.managerPending = true;
            },
            managerLogInNext: (state) => {
                state.managerError = false;
                state.managerPending = false;
            },
            managerLogInSuccess: (state, action) => {
                state.managerPending = false;
                state.managerInfo.isLogedIn = true;
                state.managerError = false;
                state.managerErrorText = "";
                state.managerInfo.email = action.payload.email;
                state.managerInfo.airline = action.payload.airline;
            },
            managerLogInError: (state, action) => {
                state.managerErrorText = action.payload.error;
                state.managerPending = false;
                state.managerError = true;
            },
            managerLogInCancelled: (state) => {
                state.managerErrorText = null;
                state.managerPending = null;
                state.managerError = null;
                state.email = null;
            },

            managerLogOut: (state) => {
                state.managerInfo = managerInitial;
            },

            setManagerLogedInStatus: (state, action) => {
                state.managerInfo.managerIsLogedIn = action.payload;
            },
            
        }
    }
)

export const { managerLogInStart, managerLogInNext, managerLogInSuccess, managerLogInError, 
    managerLogInCancelled, managerLogOut, setManagerLogedInStatus} = managerSlice.actions;
export default managerSlice.reducer;