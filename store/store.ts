import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE
} from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { basketReducer } from "./basket/basket.slice";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./user/user.slice";

const persistConfig = {
    key: "basket",
    storage,
    whitelist: ["basket"]
};
// Все reducers
const rootReducer = combineReducers({
    user: userReducer,
    basket: basketReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Главный store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        }),
    // Подключение devTools
    devTools: process.env.NODE_ENV !== "production"
});

export const persistor = persistStore(store);

// Типизация главного store
export type RootState = ReturnType<typeof store.getState>;
