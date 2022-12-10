import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import ticketReducer from './ticketSlice'
import managerSlice from './managerSlice';

export default configureStore(
    {
        reducer: {
            user: userReducer,
            ticket: ticketReducer,
            manager: managerSlice
        },
    }
)