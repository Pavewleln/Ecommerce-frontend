import { errorCatch, getContentType } from "@/api/api.helper";
import { getAccessToken } from "@/services/auth/auth.helper";
import axios from "axios";
import { AuthService } from "@/services/auth/auth.service";

export const instance = axios.create({
    baseURL: process.env.SERVER_URL,
    headers: getContentType()
});

instance.interceptors.request.use(config => {
    const accessToken = getAccessToken();
    if (config.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});
instance.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config;
        if (
            (error?.response?.status === 401 ||
                errorCatch(error) === "вы не авторизованы" ||
                errorCatch(error) === "jwt must be provided") &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            await AuthService.getNewTokens();
            try {
                return instance.request(originalRequest);
            } catch (err) {
                if (errorCatch(err) === "вы не авторизованы") {
                }
            }
        }
        throw error;
    }
);
