export interface IUser {
    id: string,
    email: string,
    name: string,
    avatarUrl: string,
    phone: string
}
export interface IUserState {
    email: string,
    isAdmin: boolean
}

export interface ITokens {
    accessToken: string,
    refreshToken: string
}
export interface IInitialState {
    user: IUserState | null,
    isLoading: boolean
}
export interface IEmailPassword {
    email: string,
    password: string
}

export interface IAuthResponse extends ITokens {
    user: IUser
}