import { configureStore } from "@reduxjs/toolkit";
import { seatlyApi } from "./api";
import { authSlice } from "./authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        [seatlyApi.reducerPath]: seatlyApi.reducer
    },
    middleware: (getDefault) => getDefault().concat(seatlyApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
