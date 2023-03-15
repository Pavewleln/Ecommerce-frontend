import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./user/user.slice";
// Все reducers
const rootReducer = {
    user: userReducer
}
// Главный store
export const store = configureStore({
    reducer: rootReducer,
    // Подключение devTools
    devTools: process.env.NODE_ENV !== 'production'
})

// Типизация главного store
export type RootState = ReturnType<typeof store.getState>