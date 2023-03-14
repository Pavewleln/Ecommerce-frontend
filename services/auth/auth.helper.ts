import {ITokens, Tokens} from "@/store/user/user.interface"
import Cookies from 'js-cookie'

// получить токен
export const getAccessToken = () => {
    const accessToken = Cookies.get(Tokens.accessToken)
    return accessToken || null
}
// сохранить токен в Cookie
export const saveTokensStorage = (data: ITokens) => {
    Cookies.set(Tokens.accessToken, data.accessToken)
    Cookies.set(Tokens.refreshToken, data.refreshToken)
}
// удалить все данные
export const removeFromStorage = () => {
    Cookies.remove(Tokens.accessToken)
    Cookies.remove(Tokens.refreshToken)
}