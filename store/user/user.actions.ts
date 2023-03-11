import {createAsyncThunk} from "@reduxjs/toolkit";
import {IAuthResponse, ISignInResponse, ISignUpResponse} from "@/store/user/user.interface";
import {AuthService} from "@/services/auth/auth.service";
import {removeFromStorage} from "@/services/auth/auth.helper";
import {errorCatch} from "@/api/api.helper";
import {useRouter} from "next/router";

export const register = createAsyncThunk<IAuthResponse, ISignUpResponse>(
    'auth/register',
    async (data, thunkApi) => {
        try {
            const response = await AuthService.signUp(data)
            return response
        } catch (err) {
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
            return thunkApi.rejectWithValue(err)
        }
    }
)
export const logout = createAsyncThunk(
    'auth/logout',
    () => {
        const router = useRouter()
        removeFromStorage()
        router.push('/auth/signIn')
    }
)
export const checkAuth = createAsyncThunk<IAuthResponse>(
    'auth/check-auth',
    async (_, thunkApi) => {
        try {
            const {data} = await AuthService.getNewTokens()
            return data
        } catch (err) {
            if(errorCatch(err) === 'jwt expired') {
                thunkApi.dispatch(logout())
            }
            return thunkApi.rejectWithValue(err)
        }
    }
)