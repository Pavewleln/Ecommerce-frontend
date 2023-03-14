import {IAuthResponse, ISignInResponse, ISignUpResponse, Tokens} from "@/store/user/user.interface";
import {saveTokensStorage} from "@/services/auth/auth.helper";
import {getContentType} from "@/api/api.helper";
import {instance} from "@/api/api.interceptors";
import Cookies from "js-cookie"
import axios from "axios";

export const AuthService = {
    async signIn(data: ISignInResponse) {
        const response = await instance<IAuthResponse>({
            url: 'auth/login',
            method: 'POST',
            data
        })
        if (response.data.accessToken) saveTokensStorage(response.data)
        return response.data
    },
    async signUp(data: ISignUpResponse) {
        const response = await instance<IAuthResponse>({
            url: 'auth/register',
            method: 'POST',
            data
        })
        if (response.data.accessToken) saveTokensStorage(response.data)
        return response.data
    },
    async getNewTokens() {
        const refreshToken = Cookies.get(Tokens.refreshToken)
        const response = await axios.post<string, { data: IAuthResponse }>(process.env.SERVER_URL + 'auth/refresh',
            {refreshToken},
            {
                headers: getContentType()
            }
        )
        if (response.data.accessToken) saveTokensStorage(response.data)
        return response.data
    },
    async logout() {
        const response = await instance<void>({
            url: 'auth/logout',
            method: 'get'
        })
        return response.data
    }
}