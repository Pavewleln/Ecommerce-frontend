import {IAuthResponse, ISignInResponse, ISignUpResponse, IUpdateResponse} from "@/store/user/user.interface";
import {removeFromStorage} from "@/services/auth/auth.helper";
import {AuthService} from "@/services/auth/auth.service";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {errorCatch} from "@/api/api.helper";
import {toast} from "react-toastify";

// Регистрация
export const register = createAsyncThunk<IAuthResponse, ISignUpResponse>(
    'auth/register',
    async (data, thunkApi) => {
        try {
            const response = await AuthService.signUp(data)
            return response
        } catch (err) {
            toast.error(errorCatch(err))
            return thunkApi.rejectWithValue(err)
        }
    }
)
// Изменение профиля
export const updateProfile = createAsyncThunk<IAuthResponse, IUpdateResponse>(
    'auth/update',
    async (data, thunkApi) => {
        try {
            const response = await AuthService.update(data)
            return response
        } catch (err) {
            toast.error(errorCatch(err))
            return thunkApi.rejectWithValue(err)
        }
    }
)
// Вход
export const login = createAsyncThunk<IAuthResponse, ISignInResponse>(
    'auth/login',
    async (data, thunkApi) => {
        try {
            const response = await AuthService.signIn(data)
            return response

        } catch (err) {
            toast.error(errorCatch(err))
            return thunkApi.rejectWithValue(err)
        }
    }
)
// Выход
export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await AuthService.logout()
        removeFromStorage()
        toast.success("Вы успешно вышли")
    }
)
// Проверка подлинности refresh и получение обновленных данных о пользователе
export const checkAuth = createAsyncThunk<IAuthResponse>(
    'auth/check-auth',
    async (_, thunkApi) => {
        try {
            const response = await AuthService.getNewTokens()
            return response
        } catch (err) {
            if (errorCatch(err) === 'jwt expired') {
                thunkApi.dispatch(logout())
            }
            return thunkApi.rejectWithValue(err)
        }
    }
)