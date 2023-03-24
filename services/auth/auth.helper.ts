import { IAuthResponse, ITokens, Tokens } from "@/store/user/user.interface";
import Cookies from "js-cookie";

// получить access токен
export const getAccessToken = () => {
    const accessToken = Cookies.get(Tokens.accessToken);
    return accessToken || null;
};
// получить refresh токен
export const getRefreshToken = () => {
    const refreshToken = Cookies.get(Tokens.refreshToken);
    return refreshToken || null;
};
// сохранить токен в Cookie
export const saveTokensStorage = (data: ITokens) => {
    Cookies.set(Tokens.accessToken, data.accessToken);
    Cookies.set(Tokens.refreshToken, data.refreshToken);
};
// удалить все данные
export const removeFromStorage = () => {
    Cookies.remove(Tokens.accessToken);
    Cookies.remove(Tokens.refreshToken);
};
