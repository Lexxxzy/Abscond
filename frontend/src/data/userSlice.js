import { createSlice } from '@reduxjs/toolkit'

const userInitial = {
    isLogedIn: false,
    id: null,
    login: null,
    nickName: null,
    phoneNumber: null,
    email: null,
    citizen: null,
    spokenLanguage: null,
    passportId: null,
    foreignPassportId: null,
    wishlist: null,
    boughtTickets: null,
}

export const userSlice = createSlice(
    {
        name: "user",
        initialState: {
            userInfo: {
                isLogedIn: false,
                id: null,
                login: null,
                nickName: null,
                phoneNumber: null,
                email: null,
                citizen: null,
                spokenLanguage: null,
                passport: null,
                foreignPassport: null,
                wishlist: null,
                boughtTickets: null,
            },
            pending: null,
            error: null,
            errorText: null,
        },
        reducers: {
            logInStart: (state) => {
                state.pending = true;
            },
            logInNext: (state) => {
                state.error = false;
                state.pending = false;
            },
            logInSuccess: (state, action) => {
                state.pending = false;
                state.error = false;
                state.errorText = "";
                state.userInfo.isLogedIn = true;
                state.userInfo.email = action.payload.email;
            },
            logInError: (state, action) => {
                state.errorText = action.payload.error;
                state.pending = false;
                state.error = true;
            },
            logInCancelled: (state) => {
                state.errorText = null;
                state.pending = null;
                state.error = null;
                state.email = null;
            },

            logOut: (state) => {
                state.userInfo = userInitial;
            },

            setLogedInStatus: (state, action) => {
                state.userInfo.isLogedIn = action.payload;
            },
            setUserInfo: (state, action) => {
                state.userInfo.email = action.payload.email;
                state.userInfo.phoneNumber = action.payload.phone;
                state.userInfo.login = action.payload.login;
            },

            loadDocumentsStart: (state) => {
                state.pending = true;
            },
            loadDocumentsSuccess: (state, action) => {
                state.pending = false;
                state.userInfo.passport = action.payload.passport;
            },
            loadDocumentsError: (state, action) => {
                state.pending = false;
                state.error = true;
                state.errorText = action.payload.error;
            },

            updateInfoStart: (state) => {
                state.pending = true;
            },
            updateInfoSuccess: (state, action) => {
                state.userInfo.phoneNumber = action.payload.phone;
                state.userInfo.login = action.payload.login;
                state.pending = false;
            },
            updateInfoError: (state, action) => {
                state.pending = false;
                state.error = true;
                state.errorText = action.payload.error;
            },
        }
    }
)

export const { loadDocumentsStart, loadDocumentsSuccess, loadDocumentsError, 
                logInStart, logInSuccess, logInError, logOut, setLogedInStatus, 
                setUserInfo, logInNext, logInCancelled, updateInfoError, updateInfoSuccess,
                updateInfoStart} = userSlice.actions;
export default userSlice.reducer;