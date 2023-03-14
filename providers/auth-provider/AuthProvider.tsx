import {getAccessToken} from "@/services/auth/auth.helper";
import {FC, PropsWithChildren, useEffect} from "react";
import {Tokens} from "@/store/user/user.interface";
import {useActions} from "@/hooks/useActions";
import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import Cookies from "js-cookie";

const AuthProvider: FC<PropsWithChildren> = ({children}) => {
    const {user} = useAuth()
    const {checkAuth, logout} = useActions()
    const {pathname} = useRouter()
    const router = useRouter()
    useEffect(() => {
        const accessToken = getAccessToken()
        if (accessToken) checkAuth()
    }, [])

    useEffect(() => {
        const refreshToken = Cookies.get(Tokens.refreshToken)
        if (!refreshToken && user) {
            logout()
            router.push('/auth/signIn')
            toast.error("Нет доступа")
        }
        else if(!refreshToken && pathname !== "/auth/signIn" && pathname !== "/auth/signUp") {
            router.push('/auth/signIn')
        }
    }, [pathname])

    return <>{children}</>
}
export default AuthProvider