import {createAsyncThunk} from "@reduxjs/toolkit";
import {IAuthResponse, ISignInResponse, ISignUpResponse} from "@/store/user/user.interface";
import {AuthService} from "@/services/auth/auth.service";
import {errorCatch} from "@/api/api.helper";
import {useRouter} from "next/router";
import {removeFromStorage} from "@/services/auth/auth.helper";
import {toast} from "react-toastify";

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
export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await AuthService.logout()
        removeFromStorage()
        toast.success("Вы успешно вышли")
    }
)
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