import {checkAuth, login, logout, register, updateProfile} from "@/store/user/user.actions";
import {IInitialState} from "@/store/user/user.interface";
import {createSlice} from "@reduxjs/toolkit";

const initialState: IInitialState = {
    user: null,
    isLoading: false
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // Регистрация
            .addCase(register.pending, state => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.user = payload.user
            })
            .addCase(register.rejected, state => {
                state.isLoading = false
                state.user = null
            })
            // Изменение профиля
            .addCase(updateProfile.pending, state => {
                state.isLoading = true
            })
            .addCase(updateProfile.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.user = payload.user
            })
            .addCase(updateProfile.rejected, state => {
                state.isLoading = false
            })
            // Вход
            .addCase(login.pending, state => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.user = payload.user
            })
            .addCase(login.rejected, state => {
                state.isLoading = false
                state.user = null
            })
            // Выход
            .addCase(logout.fulfilled, state => {
                state.isLoading = false
                state.user = null
            })
            // Проверка подлинности refresh и получение обновленных данных о пользователе
            .addCase(checkAuth.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.user = payload.user
            })
    }
})
export const {reducer: userReducer, actions: UserActions} = UserSlice