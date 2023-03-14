import {checkAuth, login, logout, register} from "@/store/user/user.actions";
import {IInitialState} from "@/store/user/user.interface";
import {createSlice} from "@reduxjs/toolkit";

const initialState: IInitialState = {
    /* Nextjs работает на сервере, поэтому если localStorage ищется раньше
    чем запустится сервер, то он localStorage будет "is not define".
    Поэтому нужно проверять, что window существует (НО МЫ НЕ СОХРАНЯЕМ ДАННЫЕ О ПОЛЬЗОВАТЕЛЕ В localStorage)*/
    // user: typeof window !== "undefined" && localStorage.getItem('user') ? JSON.parse
    // (localStorage.getItem('user') as string) : null,
    // user: {
    //     id: "string",
    //     email: "string",
    //     name: "string",
    //     surname: "string",
    //     avatarUrl: "string",
    //     phone: "string"
    // },
    user: null,
    isLoading: false
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
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
            .addCase(logout.fulfilled, state => {
                state.isLoading = false
                state.user = null
            })
            .addCase(checkAuth.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.user = payload.user
            })
    }
})
export const {reducer: userReducer, actions: UserActions} = UserSlice