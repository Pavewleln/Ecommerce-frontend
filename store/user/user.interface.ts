// Что в себя включает пользователь
export interface IUser {
    _id: string,
    email: string,
    name: string,
    surname: string,
    avatarUrl: string,
    phone: string
}

// Типы для входа
export interface ISignInResponse {
    email: string,
    password: string
}

// Типы для регистрации
export interface ISignUpResponse {
    name: string,
    surname: string,
    email: string,
    password: string,
    phone: string
}

// Виды токена
export interface ITokens {
    accessToken: string,
    refreshToken: string
}

// Начальный state
export interface IInitialState {
    user: IUser | null,
    isLoading: boolean
}

// Запрос
export interface IAuthResponse extends ITokens {
    user: IUser
}
export enum Tokens {
    refreshToken = 'refresh-token',
    accessToken = 'access-token'
}