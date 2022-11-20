import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import ticketReducer from './ticketSlice'

export default configureStore(
    {
        reducer: {
            user: userReducer,
            ticket: ticketReducer
        },
    }
)