import {IAuthResponse, ITokens } from "@/store/user/user.interface"
import Cookies from 'js-cookie'

// Взять данные из localStorage
export const getUserFromStorage = () => {
    return JSON.parse(localStorage.getItem('user') || '{}')
}
// получить токен
export const getAccessToken = () => {
    const accessToken = Cookies.get('accessToken')
    return accessToken || null
}
// сохранить токен в Cookie
export const saveTokensStorage = (data: ITokens) => {
    Cookies.set('accessToken', data.accessToken)
    Cookies.set('refreshToken', data.refreshToken)
}
// удалить все данные
export const removeFromStorage = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    localStorage.removeItem('user')
}
// сохранить данные о пользователе в localStorage
export const saveToStorage = (data: IAuthResponse) => {
    saveTokensStorage(data)
    localStorage.setItem('user', JSON.stringify(data.user))
}