import Cookies from "js-cookie"
import {IAuthResponse, ISignInResponse, ISignUpResponse} from "@/store/user/user.interface";
import axios from "axios";
import {getContentType} from "@/api/api.helper";
import {saveTokensStorage, saveToStorage} from "@/services/auth/auth.helper";
import {instance} from "@/api/api.interceptors";

export const AuthService = {
    async signIn(data: ISignInResponse) {
        const response = await instance<IAuthResponse>({
            url: '/auth/login',
            method: 'POST',
            data
        })
        if(response.data.accessToken) saveToStorage(response.data)
        return response.data
    },
    async signUp(data: ISignUpResponse) {
        const response = await instance<IAuthResponse>({
            url: '/auth/register',
            method: 'POST',
            data
        })
        if(response.data.accessToken) saveToStorage(response.data)
        return response.data
    },
    async getNewTokens() {
        const refreshToken = Cookies.get('refresh-token')
        const response = await axios.post<string, { data: IAuthResponse }>(process.env.SERVER_URL + '/auth/login/access-token',
            {refreshToken},
            {
                headers: getContentType()
            }
        )
        if (response.data.accessToken) saveTokensStorage(response.data)
        return response
    }
}