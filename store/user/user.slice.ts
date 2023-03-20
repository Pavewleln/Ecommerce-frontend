import {
    checkAuth,
    login,
    logout,
    register,
    update
} from "@/store/user/user.actions";
import { IInitialState } from "@/store/user/user.interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IInitialState = {
    user: null,
    isLoading: false
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // Регистрация
            .addCase(register.pending, state => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user = payload.user;
            })
            .addCase(register.rejected, state => {
                state.isLoading = false;
                state.user = null;
            })
            // Изменение профиля
            .addCase(update.pending, state => {
                state.isLoading = true;
            })
            .addCase(update.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user = payload.user;
            })
            .addCase(update.rejected, state => {
                state.isLoading = false;
            })
            // Вход
            .addCase(login.pending, state => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user = payload.user;
            })
            .addCase(login.rejected, state => {
                state.isLoading = false;
                state.user = null;
            })
            // Выход
            .addCase(logout.fulfilled, state => {
                state.isLoading = false;
                state.user = null;
            })
            // Проверка подлинности refresh и получение обновленных данных о пользователе
            .addCase(checkAuth.pending, state => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user = payload.user;
            })
            .addCase(checkAuth.rejected, state => {
                state.isLoading = false;
            });
    }
});
export const { reducer: userReducer, actions: UserActions } = UserSlice;
