import {IAuthResponse, ISignInResponse, ISignUpResponse, IUpdateResponse} from "@/store/user/user.interface";
import {getRefreshToken, saveTokensStorage} from "@/services/auth/auth.helper";
import {getContentType} from "@/api/api.helper";
import {instance} from "@/api/api.interceptors";
import axios from "axios";

export const AuthService = {
    // Вход
    async signIn(data: ISignInResponse) {
        const response = await instance<IAuthResponse>({
            url: 'auth/login',
            method: 'POST',
            data
        })
        if (response.data.accessToken) saveTokensStorage(response.data)
        return response.data
    },
    // Регистрация
    async signUp(data: ISignUpResponse) {
        const response = await instance<IAuthResponse>({
            url: 'auth/register',
            method: 'POST',
            data
        })
        if (response.data.accessToken) saveTokensStorage(response.data)
        return response.data
    },
    // Изменение профиля
    async update(data: IUpdateResponse) {
        const response = await instance<IAuthResponse>({
            url: 'auth/update',
            method: 'POST',
            data
        })
        if (response.data.accessToken) saveTokensStorage(response.data)
        return response.data
    },
    // Проверка подлинности refresh и получение обновленных данных о пользователе
    async getNewTokens() {
        const refreshToken = getRefreshToken()
        const response = await axios.post<string, { data: IAuthResponse }>(process.env.SERVER_URL + 'auth/refresh',
            {refreshToken},
            {
                headers: getContentType()
            }
        )
        if (response.data.accessToken) saveTokensStorage(response.data)
        return response.data
    },
    // Выход(при выходе мы удаляем refresh токен на сервере)
    async logout() {
        const response = await instance<void>({
            url: 'auth/logout',
            method: 'get'
        })
        return response.data
    }
}