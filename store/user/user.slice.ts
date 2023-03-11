import {createSlice} from "@reduxjs/toolkit";
import {IInitialState} from "@/store/user/user.interface";
import {checkAuth, login, logout, register} from "@/store/user/user.actions";

const initialState: IInitialState = {
    /* Nextjs работает на сервере, поэтому если localStorage ищется раньше
    чем запустится сервер, то он localStorage будет "is not define".
    Поэтому нужно проверять, что window существует(строка 9) */
    user: typeof window !== "undefined" && localStorage.getItem('user') ? JSON.parse
    (localStorage.getItem('user') as string) : null,
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
                state.user = payload.user
            })
    }
})
export const userReducer = UserSlice.reducer