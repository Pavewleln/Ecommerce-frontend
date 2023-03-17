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
            return await AuthService.signUp(data)
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
            return await AuthService.update(data)
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
            return await AuthService.signIn(data)
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
    }
)
// Проверка подлинности refresh и получение обновленных данных о пользователе
export const checkAuth = createAsyncThunk<IAuthResponse>(
    'auth/check-auth',
    async (_, thunkApi) => {
        try {
            return await AuthService.getNewTokens()
        } catch (err) {
            if (errorCatch(err) === 'Вы не авторизованы') {
                thunkApi.dispatch(logout())
            }
            return thunkApi.rejectWithValue(err)
        }
    }
)